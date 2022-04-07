import { FC, useEffect, useState } from 'react'
import Image from "next/image"
import styles from './Game.module.scss'
import { addZero } from '../../../../../utils/helper';

type Props = {
    info: ApiRespond;
};

type ApiRespond = {
    success: boolean;
    data: {
        spotify: {
            track_id: string
            timestamps: {
                start: number;
                end: number;
            };
            song: string;
            artist: string;
            album_art_url: string;
            album: string;
        };
        listening_to_spotify: boolean;
        discord_user: {
            username: string;
            public_flags: number;
            id: string;
            discriminator: string;
            avatar: string;
        }
        discord_status: string;
        activities: [GameActivityType];
        active_on_discord_web: boolean;
        active_on_discord_mobile: boolean;
        active_on_discord_desktop: boolean;
    }
}

type GameActivityType = {
    type: number;
    timestamps: {
        start: number;
    }
    state: string;
    session: string;
    name: string;
    id: string;
    details: string;
    created_at: number;
    buttons: [string];
    assets: {
        small_text: string;
        small_image: string;
        large_text: string;
        large_image: string;
    }
    application_id: string;
}

export const GameActivity: FC<Props> = ({ info }) => {

    let gamestatus = info.data.activities.find(x => x.type === 0);
    let gameicon = `https://cdn.discordapp.com/app-assets/${gamestatus?.application_id}/${gamestatus?.assets.large_image}.png`

    let gametime = Date.now() - gamestatus!.timestamps.start
    let gametimetimestamp = `${new Date(gametime).getMinutes()}:${addZero(new Date(gametime).getSeconds().toString())}`

    const [start, setStart] = useState(gametimetimestamp)

    useEffect(() => {
        const interval = setInterval(() => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            gametime = Date.now() - gamestatus!.timestamps.start
            // eslint-disable-next-line react-hooks/exhaustive-deps
            gametimetimestamp = `${new Date(gametime).getMinutes()}:${addZero(new Date(gametime).getSeconds().toString())}`

            setStart(gametimetimestamp)
        }, 1000)

        return () => clearInterval(interval)
    })

    return (
        <div className={styles.gamestatus}>
            <div className={styles.activity_image} title={gamestatus?.assets.large_text}>
                <Image src={gameicon} height={150} width={150} alt={gamestatus?.name} />
            </div>
            <div className={styles.activity_text}>
                <span className={styles.activity_text_title} title={gamestatus?.name}>{gamestatus?.name}</span>
                <span className={styles.activity_text_details} title={gamestatus?.details}>{gamestatus?.details}</span>
                <span className={styles.activity_text_state} title={gamestatus?.state}>{gamestatus?.state}</span>
                <span className={styles.activity_text_timestamp} title={start+' elapsed'}>{start} elapsed</span>
            </div>
        </div>
    )
}