/* eslint-disable @next/next/no-img-element */
import { FC, useEffect, useState } from 'react'
import styles from 'components/activity/Watch.module.scss'
import { ApiRespond } from 'utils/types';
import { useContext, WebSocketContext } from 'utils/lanyard';
import moment from 'moment';
import { Util } from 'utils/Util';
import PresenceStyles from 'components/Presence.module.scss';

type WatchActivity = {
    application_id: string;
    assets: {
        large_image: string;
        small_image: string;
        large_text?: string;
        small_text?: string;
    }
    buttons: string[];
    created_at: number;
    details: string;
    flags: number;
    id: string;
    name: string;
    platform: string;
    session_id: string;
    state: string;
    timestamps: {
        start: number;
        end?: number;
    }
    type: number;
}

export const WatchActivity: FC = () => {

    const info = useContext(WebSocketContext) as unknown as ApiRespond

    let activityStatus: WatchActivity = info.activities.find(x => x.type === 3);
    let largeIcon = activityStatus.assets.large_image &&
        `https://${activityStatus.assets.large_image.split("https/")[1]}`
    let largeText = activityStatus.assets.large_text
    let smallIcon = activityStatus.assets.small_image &&
        `https://${activityStatus.assets.small_image.split("https/")[1]}`
    //let small_icon = gamestatus?.assets?.small_image && Util.decideContent(gamestatus, 'small')
    let noicon = `https://cdn.discordapp.com/attachments/919634721628127232/999978421323042916/undefined_activity.png`
    //let small_text = gamestatus?.assets?.small_text ? `${gamestatus.assets.small_text}` : undefined;
    //let game_name = gamestatus?.name ? `${gamestatus.name}` : undefined;

    const [start, setStart] = useState<any>(null)
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
                let length = Util.toTimestamp(Math.floor(elapsedSec));

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
        <div className={`${styles.watchActivity} ${PresenceStyles.entryAnimation}`}>
            <div className={styles.header}>
                <span>WATCHING {activityStatus.name.toUpperCase()}</span>
            </div>
            <div className={styles.activityContainer}>
                <div className={styles.activityAssets}>
                    <div className={styles.activityLargeImg}>
                        {/* {largeText && (
                            <div className={`tooltip ${styles.activity_large_tooltip}`}>
                                <div className={`tooltip_arrow ${styles.activity_large_tooltip_arrow}`}></div>
                                <div className={`tooltip_text`}>{largeText}</div>
                            </div>
                        )} */}
                        <div>
                            {largeIcon ? (
                                <img src={largeIcon} height={100} width={100} />
                            ) : (
                                <img src={noicon} height={100} width={100} />
                            )}
                        </div>
                        <div className={styles.activitySmallImg}>
                            <img className={styles.activitySmallImgElement} src={smallIcon} height={30} width={30} />
                        </div>
                    </div>
                    {/* {small_text && (
                        <div className={styles.activity_img_tooltip}>
                            <div className={styles.activity_img_tooltip_arrow}></div>
                            <div>{small_text}</div>
                        </div>
                    )}
                    {small_icon && (
                        <img src={small_icon} className={styles.activity_small_img} height={30} width={30} alt={game_name} />
                    )} */}
                </div>
                <div className={styles.activityContent}>
                    <span className={styles.activityContentDetails}>{activityStatus.details}</span>
                    <span className={styles.activityContentState}>{activityStatus.state}</span>
                    {start ? <span className={styles.activityContentTimestamp}>{start} elapsed</span> : null}
                </div>
            </div>
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
    )
}