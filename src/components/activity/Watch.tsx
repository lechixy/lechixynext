/* eslint-disable @next/next/no-img-element */
import { FC, useEffect, useState } from 'react'
import styles from 'components/activity/Watch.module.scss'
import { ApiRespond } from 'utils/types';
import moment from 'moment';
import { Util } from 'utils/Util';
import PresenceStyles from 'components/Presence.module.scss';
import { presenceTooltipAnchor } from 'components/Tooltip';
import { ActivityElapsed } from './ActivityElapsed';
import { ActivitySmallImage } from './ActivitySmallImage';

type WatchActivity = {
    application_id: string;
    assets?: {
        large_image?: string;
        small_image?: string;
        large_text?: string;
        small_text?: string;
    }
    buttons?: string[];
    created_at: number;
    details: string;
    flags?: number;
    id: string;
    name: string;
    platform?: string;
    session_id?: string;
    state: string;
    timestamps: {
        start: number;
        end?: number;
    }
    type: number;
}

export const WatchActivity: FC<{ info: ApiRespond }> = ({ info }) => {

    const activityStatus: WatchActivity = info.activities.find(x => x.type === 3);
    const largeIcon = Util.fixAsset(activityStatus, 'large');
    const smallIcon = Util.fixAsset(activityStatus, 'small');
    const [failedArtwork, setFailedArtwork] = useState<string | null>(null);
    const visibleArtwork = largeIcon === failedArtwork ? undefined : largeIcon;
    const largeLabel = activityStatus.assets?.large_text?.trim() || activityStatus.name;
    const smallLabel = activityStatus.assets?.small_text?.trim() || activityStatus.name;

    const [start, setStart] = useState<string | null>(null)
    let [percent, setPercent] = useState("0%")
    let [timestamps, setTimestamps] = useState({ current: "0:00", length: "1:00" })

    useEffect(() => {
        if (!activityStatus.timestamps) {
            setStart(null)
            return;
        }

        if (!activityStatus.timestamps.end) {
            setTimestamps({ current: "0:00", length: "0:00" })

            const interval = setInterval(() => {
                //Elapsed
                let elapsedMs = Date.now() - activityStatus.timestamps.start
                let elapsedSec = moment.duration(elapsedMs).asSeconds()

                //Elapsed timestamp
                let length = Util.toTimestamp(Math.max(0, Math.floor(elapsedSec)));

                setStart(length)
            }, 500)

            return () => clearInterval(interval)
        } else {
            setStart(null);

            const interval = setInterval(() => {
                if (!activityStatus.timestamps.end) return;

                // Track length
                let lengthMs = activityStatus.timestamps.end - activityStatus.timestamps.start
                let lengthSec = moment.duration(lengthMs).asSeconds()

                // Current position
                let currentMs = Date.now() - activityStatus.timestamps.start
                let currentSec = moment.duration(currentMs).asSeconds()

                // Percentage
                let percent = (currentSec / lengthSec) * 100

                //Timestamps
                let current = Util.toTimestamp(Math.floor(currentSec));
                let length = Util.toTimestamp(Math.floor(lengthSec));

                setPercent(`${percent}%`)
                setTimestamps({ current, length })
            }, 500);

            return () => {
                clearInterval(interval);
            }
        }

    }, [activityStatus]);

    return (
        <div className={`${styles.watchActivity} ${PresenceStyles.activityCard} ${PresenceStyles.entryAnimation}`}>
            {visibleArtwork && <img className={`${PresenceStyles.activityArtwork} ${PresenceStyles.artworkFade}`} src={visibleArtwork} alt="" />}
            <div className={styles.header}>
                <span>WATCHING {activityStatus.name.toUpperCase()}</span>
            </div>
            <div className={styles.activityContainer}>
                <div className={PresenceStyles.activityImages}>
                    <img className={PresenceStyles.activityImage} src={visibleArtwork ?? "/images/activityNotFound.png"}
                        alt={largeLabel} tabIndex={0}
                        onError={visibleArtwork ? () => setFailedArtwork(visibleArtwork) : undefined}
                        {...presenceTooltipAnchor(largeLabel)} />
                    {smallIcon && <ActivitySmallImage key={smallIcon} src={smallIcon} label={smallLabel} />}
                </div>
                <div className={styles.activityContent}>
                    <span className={styles.activityContentName}>{activityStatus.name}</span>
                    <span className={styles.activityContentDetails}>{activityStatus.details}</span>
                    <span className={styles.activityContentState}>{activityStatus.state}</span>
                    {start && <ActivityElapsed elapsed={start} />}
                    {timestamps.current == "0:00" && timestamps.length == "0:00" ? null : (
                        <div className={styles.activityBar}>
                            <span className={styles.activityTimestamp}>{timestamps.current}</span>
                            <div className={styles.activityStatusBarBg}>
                                <div style={{
                                    "width": `${percent}`,
                                    "background": `linear-gradient(45deg, white)`,
                                }} className={styles.activityStatusBar}>
                                </div>
                            </div>
                            <span className={styles.activityTimestamp}>{timestamps.length}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
