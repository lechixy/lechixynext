/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { gameIcons, Util } from "utils/Util";
import PresenceStyles from "components/Presence.module.scss";
import { presenceTooltipAnchor } from "components/Tooltip";
import { ActivityElapsed } from "./ActivityElapsed";
import { ActivitySmallImage } from "./ActivitySmallImage";
import styles from "./Game.module.scss";

type GameActivity = {
    application_id?: string;
    assets?: { large_image?: string; large_text?: string; small_image?: string; small_text?: string };
    details?: string;
    name: string;
    state?: string;
    timestamps?: { start?: number };
};

export function GameActivity({ activity }: { activity: GameActivity }) {
    const richPresenceArtwork = Util.fixAsset(activity, "large");
    const smallArtwork = Util.fixAsset(activity, "small");
    const appIcon = activity.application_id ? gameIcons[activity.application_id] : undefined;
    const artwork = richPresenceArtwork ?? appIcon;
    const [failedArtwork, setFailedArtwork] = useState<string | null>(null);
    const visibleArtwork = artwork === failedArtwork ? undefined : artwork;
    const start = activity.timestamps?.start;
    const [now, setNow] = useState<number | null>(null);
    useEffect(() => {
        if (!start) return;

        const tick = () => setNow(Date.now());
        tick();
        const timer = window.setInterval(tick, 500);
        return () => window.clearInterval(timer);
    }, [start]);

    const elapsed = start && now !== null ? Util.toTimestamp(Math.max(0, Math.floor((now - start) / 1000))) : null;

    return (
        <div className={`${styles.gameActivity} ${PresenceStyles.activityCard} ${PresenceStyles.entryAnimation}`}>
            {visibleArtwork && <img className={`${PresenceStyles.activityArtwork} ${PresenceStyles.artworkFade}`} src={visibleArtwork} alt="" />}
            <div className={styles.header}>
                <span title="Playing">PLAYING</span>
            </div>
            <div className={styles.game_activity}>
                <div className={PresenceStyles.activityImages}>
                    <img className={PresenceStyles.activityImage}
                        src={visibleArtwork ?? "/images/activityNotFound.png"} alt={activity.name} tabIndex={0}
                        onError={visibleArtwork ? () => setFailedArtwork(visibleArtwork) : undefined}
                        {...presenceTooltipAnchor(activity.assets?.large_text?.trim() || activity.name)} />
                    {smallArtwork && <ActivitySmallImage key={smallArtwork} src={smallArtwork}
                        label={activity.assets?.small_text?.trim() || activity.name} />}
                </div>
                <div className={styles.activity_text}>
                    <span className={styles.activity_text_title} title={activity.name}>{activity.name}</span>
                    <span className={styles.activity_text_details} title={activity.details}>{activity.details}</span>
                    <span className={styles.activity_text_state} title={activity.state}>{activity.state}</span>
                    {elapsed && <ActivityElapsed elapsed={elapsed} />}
                </div>
            </div>
        </div>
    )
}
