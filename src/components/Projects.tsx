import { useEffect, useRef, useState, type CSSProperties } from "react";
import { FaStar } from "react-icons/fa";
import styles from "styles/main/New.module.scss";
import type { Project } from "utils/types";
import { Util } from "utils/Util";

function ProjectBanner({ src }: { src: string }) {
    const [loaded, setLoaded] = useState(false);

    return (
        <img
            src={src}
            alt=""
            className={styles.projectBanner}
            hidden={!loaded}
            onLoad={() => setLoaded(true)}
            ref={image => {
                if (!loaded && image?.complete && image.naturalWidth > 0) {
                    setLoaded(true);
                }
            }}
        />
    );
}

export default function Projects({ projects }: { projects: Project[] | null }) {
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const grid = gridRef.current;
        if (!grid || typeof ResizeObserver === "undefined") return;

        const gap = parseFloat(getComputedStyle(grid).columnGap);
        const observer = new ResizeObserver(entries => {
            for (const { target, borderBoxSize } of entries) {
                const height = borderBoxSize?.[0]?.blockSize ?? target.getBoundingClientRect().height;
                target.parentElement?.style.setProperty("--project-rows", String(Math.ceil(height + gap)));
            }
            grid.dataset.packed = "true";
        });
        grid.querySelectorAll(`.${styles.projectCard}`).forEach(card => observer.observe(card, { box: "border-box" }));

        return () => {
            observer.disconnect();
            delete grid.dataset.packed;
        };
    }, [projects]);

    return (
        <section className={`${styles.section} ${styles.projectsSection}`} id="projects">
            <h1 className="text-4xl font-bold text-white">Projects</h1>
            {projects?.length ? (
                <div className={styles.projectsContent} ref={gridRef}>
                    {projects.map(project => (
                        <div key={project.id}>
                            <a className={`${styles.projectCard} ${styles.cardSurface} ${styles.scrollReveal}`} href={project.url} target="_blank" rel="noreferrer">
                                <h2 className="text-2xl font-bold">{project.name}</h2>
                                {project.description && <p className="text-gray-400">{project.description}</p>}
                                <div className={styles.projectDetails}>
                                    {project.language && (
                                        <p className={styles.projectLanguage} style={{
                                            "--language-color": Util.getLanguageColor(project.language),
                                        } as CSSProperties}>
                                            {project.language}
                                        </p>
                                    )}
                                    <div className={styles.projectStargazers}>
                                        <FaStar className="text-yellow-500" />
                                        <p>{project.stargazerCount}</p>
                                    </div>
                                </div>
                                {project.bannerUrl && <ProjectBanner key={project.bannerUrl} src={project.bannerUrl} />}
                            </a>
                        </div>
                    ))}
                </div>
            ) : (
                <p className={styles.projectsMessage}>
                    {projects ? "No pinned repositories yet." : "Pinned projects are temporarily unavailable."}
                </p>
            )}
        </section>
    );
}
