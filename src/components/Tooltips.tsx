import { FC } from "react"
import { NewTooltip } from "components/Tooltip"
import { Util } from "utils/Util"
import moment from "moment"
import { ApiRespond } from "utils/types"
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

    let watchSmallText = data.activities.find(activity => activity.type === 3)?.assets?.small_text;

    let gameLargeText = data.activities.find(activity => activity.type === 0)?.assets?.large_text;

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
                {Util.getSeasonName().charAt(0).toUpperCase() + Util.getSeasonName().slice(1).toLowerCase()}
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
        </>
    )
}

export default Tooltips;