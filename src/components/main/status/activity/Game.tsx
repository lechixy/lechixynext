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
    let gameicon = `https://cdn.discordapp.com/app-assets/${gamestatus?.application_id}/${gamestatus?.assets?.large_image}.png`

    const [start, setStart] = useState("0")

    useEffect(() => {
        const interval = setInterval(() => {
            //Elapsed
            let elapsedMs = Date.now() - gamestatus!.timestamps?.start
            let elapsedSec = moment.duration(elapsedMs).asSeconds()

            //Elapsed timestamp
            let length = toTimestamp(Math.floor(elapsedSec));

            setStart(length)
        }, 1000)

        return () => clearInterval(interval)
    })

    let large_text = gamestatus?.assets?.large_text ? `${gamestatus.assets.large_text}` : undefined;
    let game_name = gamestatus?.name ? `${gamestatus.name}` : undefined;

    return (
        <div className={styles.gamestatus}>
            <div className={styles.header}>
                <span title={`Playing a game`}>PLAYING A GAME</span>
            </div>
            <div className={styles.game_activity}>
                <div className={styles.activity_img}>
                    {large_text && (
                        <div className={styles.activity_img_tooltip}>
                            <div className={styles.activity_img_tooltip_arrow}></div>
                            <div>{large_text}</div>
                        </div>
                    )}
                    <img src={gameicon} height={100} width={100} alt={game_name} />
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