import styles from './DiscordPanel.module.scss';
import { FC } from 'react';
import Image from 'next/image'
import { Props } from '../../utils/types';
import { Status } from './status/Status';

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
                <div className={styles.discord_content_profile}>
                    <div className={styles.discord_avatar}>
                        <img
                            src={avatar_url}
                            alt={`${info.data.discord_user.id}`}
                            className={styles.discord_avatar_img}
                            style={{ 'border': `2px solid ${status_color}`, 'boxShadow': `0px 0px 10px ${status_color}` }}
                        />
                    </div>
                    <div className={styles.discord_header}>
                        <span className={styles.discord_header_tag}>{info.data.discord_user.username}</span>
                        <span className={styles.discord_header_disc}>#{info.data.discord_user.discriminator}</span>
                    </div>
                </div>
                <div className={styles.discord_content_status}>
                    <Status status={info.data.activities[0]} />
                </div>
            </div>
        </div>

    )
}