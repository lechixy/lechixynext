import { FC, useEffect, useState } from "react"
import { NewTooltip, PresenceTooltip } from "components/Tooltip"
import { Util } from "utils/Util"
import moment from "moment"
import { ApiRespond, Github } from "utils/types"
import type { BgInfo } from "pages/old"

import HomeStyles from "styles/main/Home.module.scss"
import DiscordStyles from "components/Discord.module.scss"

type TooltipsProps = {
    data: ApiRespond;
    bgInfo?: BgInfo;
}

const Tooltips: FC<TooltipsProps> = (props) => {
    let { data, bgInfo } = props;

    let statusText =
        data.discord_status === "online"
            ? "Online"
            : data.discord_status === "idle"
                ? "Idle"
                : data.discord_status === "dnd"
                    ? "Do not disturb"
                    : "Offline";

    let activeOn: string[] = [];
    if (data.active_on_discord_desktop) activeOn.push("Desktop");
    if (data.active_on_discord_web) activeOn.push("Web");
    if (data.active_on_discord_mobile) activeOn.push("Mobile");

    const [github, setGithub] = useState<Github | null>(null);

    async function getLastGithubCommit() {
        const res = await fetch(
            `https://api.github.com/repos/lechixy/lechixynext/commits?per_page=1`,
            {
                headers: {
                    "User-Agent": "lechixy.dev" // GitHub bunu ister
                }
            }
        );
        if (!res.ok) {
            console.error("Failed to fetch last commit date from GitHub API");
            return;
        }

        const data = await res.json();

        let githubRawData = {
            last_updated: data[0].commit.committer.date,
            last_commit_url: `https://github.com/lechixy/lechixynext/commits/main/`
        };
        setGithub(githubRawData);
        console.log("Last github commit:", githubRawData);
    }

    useEffect(() => {
        getLastGithubCommit();
    }, []);

    let seasonText = `${moment().format("MMMM")} • ${Util.getSeasonName().charAt(0).toUpperCase() + Util.getSeasonName().slice(1).toLowerCase()} of ${moment().format("YYYY")}`;
    let seasonText2 = `Last updated on ${moment(github?.last_updated).format("MMMM Do YYYY, h:mm a")}`;

    // Custom Status
    let customStatus = data.activities.find((x) => x.type === 4);
    let customStatusEmoji = customStatus?.emoji?.name;
    let customStatusDiscordEmoji = customStatus?.emoji?.id
        ? `https://cdn.discordapp.com/emojis/${customStatus?.emoji.id}${customStatus?.emoji.animated ? ".gif" : ".png"}`
        : null;

    return (
        <>
            <NewTooltip
                anchorSelect={`.${HomeStyles.backgroundInfo}`}
                id="bgInfo"
            >
                {bgInfo?.usingBackground === "bing" && (
                    <a href={bgInfo.bingImage.images[0].copyrightlink} target="_blank" rel="noreferrer">
                        <span>{`${bgInfo.bingImage.images[0].title} • ${moment(bgInfo.bingImage.images[0].startdate).format("MMMM Do YYYY")}`}</span>
                        <span>{bgInfo.bingImage.images[0].copyright}</span>
                    </a>
                )}
            </NewTooltip>
            <NewTooltip
                anchorSelect={`.${DiscordStyles.avatar_status}`}
                place="right"
                id="statusInfo"
            >
                {statusText === "Offline"
                    ? statusText
                    : `${statusText} on ${activeOn.join(", ")}`}
            </NewTooltip>
            <NewTooltip
                anchorSelect={`.${HomeStyles.bottomText}`}
                id="seasonInfo"
                place="top"
            >
                <div style={{ textAlign: "center" }}>
                    <span>{seasonText}</span>
                    {github && (
                        <>
                            <br />
                            <a href={github.last_commit_url} target="_blank" >
                                <span>{seasonText2}</span>
                            </a>
                        </>
                    )}
                </div>
            </NewTooltip>
            <PresenceTooltip />
            <NewTooltip
                anchorSelect={`.${DiscordStyles.customStatusDiscordEmoji}`}
                id="customStatusDiscordEmoji"
                place="bottom"
            >
                {customStatusEmoji}
            </NewTooltip>
        </>
    )
}

export default Tooltips;
