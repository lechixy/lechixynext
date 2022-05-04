/* eslint-disable @next/next/no-img-element */
import { FC, useEffect, useState } from 'react'
import Image from "next/image"
import styles from './Game.module.scss'
import { addZero } from '../../../../../utils/helper';
import { ApiRespond } from '../../../../../utils/types';
import { useContext, WebSocketContext } from '../../../../../utils/context';

export const GameActivity: FC = () => {

    const info = useContext(WebSocketContext) as unknown as ApiRespond

    let gamestatus = info.activities.find(x => x.type === 0);
    let gameicon = `https://cdn.discordapp.com/app-assets/${gamestatus?.application_id}/${gamestatus?.assets?.large_image}.png`

    let gametime = Date.now() - gamestatus!.timestamps?.start
    let gametimetimestamp = `${new Date(gametime).getMinutes()}:${addZero(new Date(gametime).getSeconds().toString())}`

    const [start, setStart] = useState(gametimetimestamp)

    useEffect(() => {
        const interval = setInterval(() => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            gametime = Date.now() - gamestatus!.timestamps?.start
            // eslint-disable-next-line react-hooks/exhaustive-deps
            gametimetimestamp = `${new Date(gametime).getMinutes()}:${addZero(new Date(gametime).getSeconds().toString())}`

            setStart(gametimetimestamp)
        }, 1000)

        return () => clearInterval(interval)
    })

    let large_text = gamestatus?.assets?.large_text ? `${gamestatus.assets.large_text}` : undefined;
    let game_name = gamestatus?.name ? `${gamestatus.name}` : undefined;

    return (
        <div className={styles.gamestatus}>
            <div className={styles.activity_img} title={large_text}>
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
                {gametime ? <span className={styles.activity_text_timestamp} title={start + ' elapsed'}>{start} elapsed</span> : null}
            </div>
        </div>
    )
}