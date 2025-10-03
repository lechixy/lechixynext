/* eslint-disable @next/next/no-img-element */
import { FC, useEffect, useState } from 'react'
import styles from 'components/activity/Game.module.scss'
import { ApiRespond } from 'utils/types';
import { useContext, WebSocketContext } from 'utils/lanyard';
import moment from 'moment';
import { Util } from 'utils/Util';
import PresenceStyles from 'components/Presence.module.scss';

type GameActivity = {
    application_id: string;
    assets: {
        large_image: string;
        small_image: string;
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

export const GameActivity: FC<{ activity: GameActivity }> = ({ activity }) => {

    let activityStatus = activity;

    let large_icon = activityStatus?.assets?.large_image && Util.decideContent(activityStatus, 'large')
    let small_icon = activityStatus?.assets?.small_image && Util.decideContent(activityStatus, 'small')
    let noicon = `/images/activityNotFound.png`
    let game_name = activityStatus?.name ? `${activityStatus.name}` : undefined;

    const [start, setStart] = useState<any>(null)

    useEffect(() => {
        if (!activityStatus.timestamps) {
            setStart(null)
            return;
        }

        const interval = setInterval(() => {
            //Elapsed
            let elapsedMs = Date.now() - activityStatus!.timestamps?.start
            let elapsedSec = moment.duration(elapsedMs).asSeconds()

            //Elapsed timestamp
            let length = Util.toTimestamp(Math.floor(elapsedSec));

            setStart(length)
        }, 500)

        return () => clearInterval(interval)
    }, [activityStatus]);

    return (
        <div className={`${styles.gameActivity} ${PresenceStyles.entryAnimation}`}>
            <div className={styles.header}>
                <span title={`Playing a game`}>PLAYING {game_name?.toUpperCase()}</span>
            </div>
            <div className={styles.game_activity}>
                <div className={styles.activity_img}>
                    <div className={styles.activityLargeImg}>
                        <div>
                            {large_icon ? (
                                <img src={large_icon} height={100} width={100} alt={game_name} />
                            ) : (
                                <img src={noicon} height={100} width={100} alt={game_name} />
                            )}
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
                <div className={styles.activity_text}>
                    <span className={styles.activity_text_title} title={game_name}>{game_name}</span>
                    <span className={styles.activity_text_details} title={activityStatus?.details}>{activityStatus?.details}</span>
                    <span className={styles.activity_text_state} title={activityStatus?.state}>{activityStatus?.state}</span>
                    {start ? <span className={styles.activity_text_timestamp}>{start} elapsed</span> : null}
                </div>
            </div>
        </div>
    )
}