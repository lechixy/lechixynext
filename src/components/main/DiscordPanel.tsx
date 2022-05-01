/* eslint-disable @next/next/no-img-element */
import styles from './DiscordPanel.module.scss';
import { FC } from 'react';
import { ApiRespond } from '../../utils/types';
import { Status } from './status/Status';
import { DiscordButton } from './DiscordButton';
import { useContext, WebSocketContext } from '../../utils/context';

export const DiscordPanel: FC = () => {

    const info = useContext(WebSocketContext) as unknown as ApiRespond

    let status_colors = {
        online: 'rgb(0, 255, 0)',
        idle: 'rgb(255, 255, 0)',
        dnd: 'rgb(255, 0, 0)',
        offline: 'rgb(87, 87, 87)',
    }
    let status_color = info.discord_status === 'online'
        ? status_colors.online : info.discord_status === 'idle'
            ? status_colors.idle : info.discord_status === 'dnd'
                ? status_colors.dnd : status_colors.offline;
    let status_text = info.discord_status === 'online'
        ? 'Online' : info.discord_status === 'idle'
            ? 'Idle' : info.discord_status === 'dnd'
                ? 'Do not disturb' : 'Offline';
    let avatar_url = `https://cdn.discordapp.com/avatars/${info.discord_user.id}/${info.discord_user.avatar}.png?size=256`
    let custom_status = info.activities.find(x => x.type === 4) ? `${info.activities.find(x => x.type === 4)?.state}` : null;


    return (
        <div className={styles.discord_panel}>
            <div className={styles.discord_content}>
                <div className={styles.discord_content_profile}>
                    <div className={styles.discord_avatar}>
                        {/* eslint-disable-next-line @next/next/no-img-element*/}
                        <div>
                            <img
                                src={avatar_url}
                                alt={`${info.discord_user.id}`}
                                className={styles.discord_avatar_img}
                                height={100}
                                width={100}
                            />
                            <div style={{ 'backgroundColor': `${status_color}` }} className={styles.discord_avatar_status}>
                                <div className={styles.discord_avatar_status_tooltip}>
                                    <div>{status_text}</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <a href={`https://discord.com/users/${info.discord_user.id}`} target="_blank" style={{ 'textDecoration': 'none' }} rel="noreferrer">
                                <DiscordButton info={
                                    { text: `View on Discord`, is_link: true }
                                } />
                            </a>
                        </div>
                    </div>
                    <div className={styles.discord_header}>
                        <span className={styles.discord_header_tag}>{info.discord_user.username}</span>
                        <span className={styles.discord_header_disc}>#{info.discord_user.discriminator}</span>
                        <span className={styles.discord_header_status}>{custom_status}</span>
                    </div>
                </div>
                <Status />
            </div>
        </div>

    )
}