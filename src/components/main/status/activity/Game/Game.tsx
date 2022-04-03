import { FC } from 'react'
import Image from "next/image"
import styles from './Game.module.scss'

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
        activities: [any];
        active_on_discord_web: boolean;
        active_on_discord_mobile: boolean;
        active_on_discord_desktop: boolean;
    }
}

export const GameActivity: FC<Props> = ({ info }) => {

    console.log(info)

    let gamestatus = info.data.activities.find(x => x.type === 0)
    let gameicon = `https://cdn.discordapp.com/app-assets/${gamestatus.application_id}/${gamestatus.assets.large_image}.png`

    return (
        <div className={styles.gamestatus}>
            <div title={gamestatus.large_text}>
                <Image src={gameicon} height={120} width={120}></Image>
            </div>
            <div>
                <span className={styles.header}>{gamestatus?.name}</span>
                <span></span>
            </div>
        </div>
    )
}