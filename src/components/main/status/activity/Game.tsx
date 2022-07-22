/* eslint-disable @next/next/no-img-element */
import { FC, useEffect, useState } from 'react'
import styles from './Game.module.scss'
import { toTimestamp } from '../../../../utils/functions';
import { ApiRespond } from '../../../../utils/types';
import { useContext, WebSocketContext } from '../../../../utils/context';
import moment from 'moment';

export const GameActivity: FC = () => {

    const info = useContext(WebSocketContext) as unknown as ApiRespond

    let gamestatus = info.activities.find(x => x.type === 0);
    let large_icon = gamestatus?.assets?.large_image ? `https://cdn.discordapp.com/app-assets/${gamestatus?.application_id}/${gamestatus?.assets?.large_image}.png` : null
    let small_icon = gamestatus?.assets?.small_image ? `https://cdn.discordapp.com/app-assets/${gamestatus?.application_id}/${gamestatus?.assets?.small_image}.png` : null
    let noicon = `https://cdn.discordapp.com/attachments/919634721628127232/999978421323042916/undefined_activity.png`
    let large_text = gamestatus?.assets?.large_text ? `${gamestatus.assets.large_text}` : undefined;
    let small_text = gamestatus?.assets?.small_text ? `${gamestatus.assets.small_text}` : undefined;
    let game_name = gamestatus?.name ? `${gamestatus.name}` : undefined;

    const [start, setStart] = useState<any>(null)

    useEffect(() => {
        if (!gamestatus.timestamps) {
            setStart(null)
            return;
        }

        const interval = setInterval(() => {
            //Elapsed
            let elapsedMs = Date.now() - gamestatus!.timestamps?.start
            let elapsedSec = moment.duration(elapsedMs).asSeconds()

            //Elapsed timestamp
            let length = toTimestamp(Math.floor(elapsedSec));

            setStart(length)
        }, 500)

        return () => clearInterval(interval)
    }, [gamestatus]);

    return (
        <div className={styles.gamestatus}>
            <div className={styles.header}>
                <span title={`Playing a game`}>PLAYING A GAME</span>
            </div>
            <div className={styles.game_activity}>
                <div className={styles.activity_img}>
                    <div className={styles.activity_large}>
                        {large_text && (
                            <div className={styles.activity_img_tooltip}>
                                <div className={styles.activity_img_tooltip_arrow}></div>
                                <div>{large_text}</div>
                            </div>
                        )}
                        {large_icon ? (
                            <img src={large_icon} className={styles.activity_large_img} height={100} width={100} alt={game_name} />
                        ) : (
                            <img src={noicon} className={styles.activity_large_img} height={100} width={100} alt={game_name} />
                        )}
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
                    <span className={styles.activity_text_details} title={gamestatus?.details}>{gamestatus?.details}</span>
                    <span className={styles.activity_text_state} title={gamestatus?.state}>{gamestatus?.state}</span>
                    {start ? <span className={styles.activity_text_timestamp}>{start} elapsed</span> : null}
                </div>
            </div>
        </div>
    )
}