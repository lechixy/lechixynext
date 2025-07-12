/* eslint-disable @next/next/no-img-element */
import styles from "components/Discord.module.scss";
import { FC } from "react";
import { ApiRespond } from "utils/types";
import Presence from "components/Presence";
import { DiscordButton } from "components/DiscordButton";
import { useContext, WebSocketContext } from "utils/lanyard";
import { status_colors, Util } from "utils/Util";
import Spinner from "./Spinner";

type DiscordProps = {
    loadingText: string;
}

export const Discord: FC<DiscordProps> = ({ loadingText }) => {
    const info = useContext(WebSocketContext) as unknown as ApiRespond | null;

    if (!info) {
        return (
            <div className={styles.discord_body}>
                <div className={styles.discordLoading}>
                    <Spinner text={loadingText} />
                </div>
            </div>
        )
    } else {
        let status_color =
            info.discord_status === "online"
                ? status_colors.online
                : info.discord_status === "idle"
                    ? status_colors.idle
                    : info.discord_status === "dnd"
                        ? status_colors.dnd
                        : status_colors.offline;
        let avatarType = info.discord_user.avatar.startsWith("a_") ? ".gif" : ".png";
        let avatar_url = `https://cdn.discordapp.com/avatars/${info.discord_user.id}/${info.discord_user.avatar}${avatarType}?size=128`;
        
        // Custom Status
        let customStatus = info.activities.find((x) => x.type === 4);
        let customStatusEmoji = customStatus?.emoji?.name;
        let customStatusText = customStatus ? customStatus?.state : null;
        let customStatusDiscordEmoji = customStatus?.emoji?.id
            ? `https://cdn.discordapp.com/emojis/${customStatus?.emoji.id}${customStatus?.emoji.animated ? ".gif" : ".png"}`
            : null;

        return (
            <div className={styles.discord_body}>
                <div className={styles.discord_container}>
                    <div className={styles.discord_header_top}>
                        <div className={styles.avatar}>
                            <div>
                                <img src={avatar_url} alt={info.discord_user.id} />
                            </div>
                            {/* {ref={avatar_status}} */}
                            <div className={styles.avatar_status} style={{ background: `linear-gradient(135deg, ${status_color})` }}>
                            </div>
                        </div>
                        {/* <div className={styles.discord_button}>
                        <a href={`https://discord.com/users/${info.discord_user.id}`} target="_blank" style={{ 'textDecoration': 'none' }} rel="noreferrer">
                            <DiscordButton info={
                                { text: `Discord`, is_link: true }
                            } />
                        </a>
                    </div> */}
                    </div>
                    <div className={styles.discord_header_bottom}>
                        <div className={styles.user}>
                            <div className={styles.user_global_name}>{info.discord_user.global_name}</div>
                            <div className={styles.user_name}>{info.discord_user.username}</div>
                        </div>
                        {customStatus && (
                            <div className={styles.customStatus}>
                                {customStatusEmoji && (
                                    <div className={styles.customStatusEmoji}>{customStatusEmoji}</div>
                                )}
                                {customStatusDiscordEmoji && (
                                    <img
                                        className={styles.customStatusDiscordEmoji}
                                        src={customStatusDiscordEmoji}
                                        alt={customStatusEmoji}
                                    />
                                )}
                                {customStatusText && (
                                    <div className={styles.customStatusText}>{customStatusText}</div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className={styles.divider}></div>
                    <Presence />
                </div>
            </div>
        );
    }
};

export default Discord;
