import { FC, useEffect, useState } from "react"
import { NewTooltip } from "components/Tooltip"
import { Util } from "utils/Util"
import moment from "moment"
import { ApiRespond, Github } from "utils/types"
import { BgInfo } from "pages/index"

import HomeStyles from "styles/main/Home.module.scss"
import WatchStyles from "components/activity/Watch.module.scss"
import SpotifyStyles from "components/activity/Spotify.module.scss"
import DiscordStyles from "components/Discord.module.scss"
import GameStyles from "components/activity/Game.module.scss"

type TooltipsProps = {
    data: ApiRespond;
    bgInfo: BgInfo;
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

    let watchSmallText = data.activities.find(activity => activity.type === 3)?.assets?.small_text;

    let gameLargeText = data.activities.find(activity => activity.type === 0)?.assets?.large_text;

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
                {bgInfo.usingBackground === "bing" && (
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
            <NewTooltip
                anchorSelect={`.${WatchStyles.activitySmallImg}`}
                id="activitySmallImage"
                place="bottom"
            >
                {watchSmallText}
            </NewTooltip>
            <NewTooltip
                anchorSelect={`.${SpotifyStyles.spotifyLargeImg}`}
                id="activityLargeImage"
                place="bottom"
            >
                {data.spotify?.album}
            </NewTooltip>
            <NewTooltip
                anchorSelect={`.${WatchStyles.activityLargeImg}`}
                id="activityLargeImage"
                place="bottom"
            >
                {data.activities.find(activity => activity.type === 3)?.name}
            </NewTooltip>
            <NewTooltip
                anchorSelect={`.${GameStyles.activityLargeImg}`}
                id="activityLargeImage"
                place="bottom"
            >
                {gameLargeText}
            </NewTooltip>
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