import type { Project } from "./types";

export const PROJECTS_REVALIDATE_SECONDS = 15 * 60;

type PublicRepository = {
    node_id: string;
    name: string;
    full_name: string;
    html_url: string;
    description: string | null;
    stargazers_count: number;
    language: string | null;
    default_branch: string;
};

function readPinnedRepositories(html: string): string[] {
    // The public profile uses the same list for pins and popular repositories.
    const list = html.match(/<ol\b[^>]*\bclass="[^"]*\bjs-pinned-items-reorder-list\b[^"]*"[^>]*>([\s\S]*?)<\/ol>/i);
    if (!list || list.index === undefined) throw new Error("Could not find the pinned items on the GitHub profile.");

    const headingStart = html.lastIndexOf("<h2", list.index);
    const heading = html.slice(headingStart, list.index);
    if (/^<h2\b[^>]*>\s*Popular repositories(?=\s|<)/i.test(heading)) return [];

    const cards = Array.from(list[1].matchAll(/<li\b[^>]*\bclass="[^"]*\bjs-pinned-item-list-item\b[^"]*"[^>]*>([\s\S]*?)<\/li>/gi));
    if (!cards.length) throw new Error("Could not read the pinned items on the GitHub profile.");
    return cards.flatMap(([, card]) => {
        const repository = card.match(/<a\b(?=[^>]*\bPINNED_REPO\b)[^>]*\shref="\/([a-z\d-]+\/[\w.-]+)"/i)?.[1];
        if (repository) return [repository];
        if (/<a\b[^>]*\shref="https:\/\/gist\.github\.com\//i.test(card)) return [];

        throw new Error("Could not read a pinned item on the GitHub profile.");
    });
}

async function fetchPublicRepository(fullName: string, signal: AbortSignal): Promise<Project> {
    const response = await fetch(`https://api.github.com/repos/${fullName}`, {
        headers: {
            Accept: "application/vnd.github+json",
        },
        signal,
    });
    if (!response.ok) throw new Error(`GitHub repository request failed (${response.status}).`);
    const repository: PublicRepository = await response.json();

    const branch = repository.default_branch.split("/").map(encodeURIComponent).join("/");
    const bannerUrl = `https://raw.githubusercontent.com/${repository.full_name}/refs/heads/${branch}/.github/assets/banner.webp`;
    const banner = await fetch(bannerUrl, { method: "HEAD", signal });
    if (!banner.ok && banner.status !== 404) {
        throw new Error(`GitHub banner check failed (${banner.status}).`);
    }

    return {
        id: repository.node_id,
        name: repository.name,
        url: repository.html_url,
        description: repository.description,
        stargazerCount: repository.stargazers_count,
        language: repository.language,
        bannerUrl: banner.ok ? bannerUrl : null,
    };
}

async function fetchPinnedProjects(): Promise<Project[]> {
    const signal = AbortSignal.timeout(8000);
    const profile = await fetch("https://github.com/lechixy", {
        headers: { "Accept-Language": "en" },
        signal,
    });
    if (!profile.ok) throw new Error(`GitHub profile request failed (${profile.status}).`);

    const repositories = readPinnedRepositories(await profile.text());
    return Promise.all(repositories.map(repository => fetchPublicRepository(repository, signal)));
}

let cachedRequest: { expiresAt: number; projects: Promise<Project[]> } | undefined;

export function getPinnedProjects(): Promise<Project[]> {
    const now = Date.now();
    if (!cachedRequest || now >= cachedRequest.expiresAt) {
        // Share one request across concurrent renders, including a cooldown after failures.
        cachedRequest = {
            expiresAt: now + PROJECTS_REVALIDATE_SECONDS * 1000,
            projects: fetchPinnedProjects(),
        };
    }
    return cachedRequest.projects;
}
