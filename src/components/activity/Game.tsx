/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { gameIcons, Util } from "utils/Util";
import PresenceStyles from "components/Presence.module.scss";
import { presenceTooltipAnchor } from "components/Tooltip";
import styles from "./Game.module.scss";

type GameActivity = {
    application_id?: string;
    assets?: { large_image?: string; large_text?: string };
    details?: string;
    name: string;
    state?: string;
    timestamps?: { start?: number };
};

export function GameActivity({ activity }: { activity: GameActivity }) {
    const richPresenceArtwork = activity.assets?.large_image ? Util.fixAsset(activity, "large") : null;
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
                <span title="Playing a game">PLAYING {activity.name.toUpperCase()}</span>
            </div>
            <div className={styles.game_activity}>
                <div className={styles.activity_img}>
                    <div className={styles.activityLargeImg} tabIndex={0}
                        {...presenceTooltipAnchor(activity.assets?.large_text?.trim() || activity.name)}>
                        <div>
                            <img src={visibleArtwork ?? "/images/activityNotFound.png"} height={100} width={100}
                                alt={activity.name} onError={visibleArtwork ? () => setFailedArtwork(visibleArtwork) : undefined} />
                        </div>
                    </div>
                </div>
                <div className={styles.activity_text}>
                    <span className={styles.activity_text_title} title={activity.name}>{activity.name}</span>
                    <span className={styles.activity_text_details} title={activity.details}>{activity.details}</span>
                    <span className={styles.activity_text_state} title={activity.state}>{activity.state}</span>
                    {elapsed && <span className={styles.activity_text_timestamp}>{elapsed} elapsed</span>}
                </div>
            </div>
        </div>
    )
}
