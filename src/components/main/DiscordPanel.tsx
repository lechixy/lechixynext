import styles from './DiscordPanel.module.scss';
import { FC } from 'react';
import Image from 'next/image'
import { Props } from '../../utils/types';
import { Status } from './status/Status';
import Link from 'next/link'

export const DiscordPanel: FC<Props> = ({ info }) => {

    let status_colors = {
        online: 'rgb(0, 255, 0)',
        idle: 'rgb(255, 196, 0)',
        dnd: 'rgb(255, 0, 0)',
        offline: 'rgb(136, 136, 136)',
    }
    let status_color = info.data?.discord_status === 'online'
        ? status_colors.online : info.data?.discord_status === 'idle'
            ? status_colors.idle : info.data?.discord_status === 'dnd'
                ? status_colors.dnd : status_colors.offline;
    let avatar_url = `https://cdn.discordapp.com/avatars/${info.data.discord_user.id}/${info.data.discord_user.avatar}.png?size=256`

    return (
        <div className={styles.discord_panel}>

            <div className={styles.discord_content}>
                <Link href={`https://discord.com/users/${info.data.discord_user.id}`} passHref>
                    <div className={styles.discord_content_profile}>
                        <div className={styles.discord_avatar}>
                            {/* eslint-disable-next-line @next/next/no-img-element*/}
                            <Image
                                src={avatar_url}
                                alt={`${info.data.discord_user.id}`}
                                className={styles.discord_avatar_img}
                                height={100}
                                width={100}
                            />
                            <span style={{ 'backgroundColor': `${status_color}` }} className={styles.discord_avatar_status}>
                            </span>
                        </div>
                        <div className={styles.discord_header}>
                            <span className={styles.discord_header_tag}>{info.data.discord_user.username}</span>
                            <span className={styles.discord_header_disc}>#{info.data.discord_user.discriminator}</span>
                        </div>
                    </div>
                </Link>
                <Status info={info} />
            </div>
        </div>

    )
}