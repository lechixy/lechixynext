/* eslint-disable @next/next/no-img-element */
import styles from './DiscordPanel.module.scss';
import { FC } from 'react';
import Image from 'next/image'
import { Props } from '../../utils/types';
import { Status } from './status/Status';
import { DiscordButton } from './DiscordButton';

export const DiscordPanel: FC<Props> = ({ info }) => {

    let status_colors = {
        online: 'rgb(0, 255, 0)',
        idle: 'rgb(255, 255, 0)',
        dnd: 'rgb(255, 0, 0)',
        offline: 'rgb(87, 87, 87)',
    }
    let status_color = info.data.discord_status === 'online'
        ? status_colors.online : info.data.discord_status === 'idle'
            ? status_colors.idle : info.data.discord_status === 'dnd'
                ? status_colors.dnd : status_colors.offline;
    let status_text = info.data.discord_status === 'online'
        ? 'Online' : info.data.discord_status === 'idle'
            ? 'Idle' : info.data.discord_status === 'dnd'
                ? 'Do not disturb' : 'Offline';
    let avatar_url = `https://cdn.discordapp.com/avatars/${info.data.discord_user.id}/${info.data.discord_user.avatar}.png?size=256`
    let custom_status = info.data.activities.find(x => x.type === 4) ? `${info.data.activities.find(x => x.type === 4)?.state}` : null;


    return (
        <div className={styles.discord_panel}>
            <div className={styles.discord_content}>
                <div className={styles.discord_content_profile}>
                    <div className={styles.discord_avatar}>
                        {/* eslint-disable-next-line @next/next/no-img-element*/}
                        <div>
                            <img
                                src={avatar_url}
                                alt={`${info.data.discord_user.id}`}
                                className={styles.discord_avatar_img}
                                height={100}
                                width={100}
                            />
                            <span style={{ 'backgroundColor': `${status_color}` }} className={styles.discord_avatar_status} title={status_text}>
                            </span>
                        </div>
                        <div>
                            <a href={`https://discord.com/users/${info.data.discord_user.id}`} target="_blank" style={{ 'textDecoration': 'none' }} rel="noreferrer">
                                <DiscordButton info={
                                    { text: `View on Discord`, is_link: true }
                                } />
                            </a>
                        </div>
                    </div>
                    <div className={styles.discord_header}>
                        <span className={styles.discord_header_tag}>{info.data.discord_user.username}</span>
                        <span className={styles.discord_header_disc}>#{info.data.discord_user.discriminator}</span>
                        <span className={styles.discord_header_status}>{custom_status}</span>
                    </div>
                </div>
                <Status info={info} />
            </div>
        </div>

    )
}