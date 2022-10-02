/* eslint-disable @next/next/no-img-element */
import styles from "./Discord.module.scss";
import { FC, useEffect, useRef } from "react";
import { ApiRespond } from "../../utils/types";
import Presence from "./status/Presence";
import { DiscordButton } from "./DiscordButton";
import { useContext, WebSocketContext } from "../../utils/lanyard";
import { layerContainer } from "../../utils";
import { getBoundingBox } from "../../utils/functions";

export const Discord: FC = () => {
    const info = useContext(WebSocketContext) as unknown as ApiRespond;

    let status_colors = {
        online: "rgb(0, 255, 0)",
        idle: "rgb(255, 255, 0)",
        dnd: "rgb(255, 0, 0)",
        offline: "rgb(87, 87, 87)",
    };
    let status_color =
        info.discord_status === "online"
            ? status_colors.online
            : info.discord_status === "idle"
                ? status_colors.idle
                : info.discord_status === "dnd"
                    ? status_colors.dnd
                    : status_colors.offline;
    let status_text =
        info.discord_status === "online"
            ? "Online"
            : info.discord_status === "idle"
                ? "Idle"
                : info.discord_status === "dnd"
                    ? "Do not disturb"
                    : "Offline";

    let active_on: string[] = [];
    if (info.active_on_discord_desktop) active_on.push("Desktop");
    if (info.active_on_discord_web) active_on.push("Web");
    if (info.active_on_discord_mobile) active_on.push("Mobile");
    let avatarType = info.discord_user.avatar.startsWith("a_") ? ".gif" : ".png";
    let avatar_url = `https://cdn.discordapp.com/avatars/${info.discord_user.id}/${info.discord_user.avatar}${avatarType}?size=128`;
    let custom_status = info.activities.find((x) => x.type === 4);
    let custom_status_text = custom_status ? custom_status?.state : null;
    let custom_status_emoji = custom_status?.emoji
        ? `https://cdn.discordapp.com/emojis/${custom_status?.emoji.id}${custom_status?.emoji.animated ? ".gif" : ".png"
        }`
        : null;
    
    // //Tooltip stuff
    // let avatar_status = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     let layer_container = document.querySelector(".layer_container")

    //     let avatar_element =  avatar_status.current
    //     let rect = getBoundingBox(avatar_element)

    //     let div = document.createElement("div")
    //     div.classList.add("tooltip")
    //     let text = document.createElement("div")
    //     text.classList.add("tooltip_text")
    //     text.innerText = "selam"

    //     div.append(text)

    //     div.style.top = `50px`
    //     div.style.left = `50px`
    //     div.style.opacity = `1`;
    //     div.style.visibility = "visible"

    //     layer_container?.append(div)

    //     console.log(rect)
    // })

    return (
        <div className={styles.discord_body}>
            <div className={styles.discord_container}>
                <div className={styles.discord_header_top}>
                    <div className={styles.avatar}>
                        <div>
                            <img src={avatar_url} alt={info.discord_user.id} />
                        </div>
                        {/* {ref={avatar_status}} */}
                        <div className={styles.avatar_status} style={{ background: status_color }}>
                            <div className={`tooltip ${styles.avatar_status_tooltip}`}>
                                <div className={`tooltip_arrow ${styles.avatar_status_tooltip_arrow}`}></div>
                                <div className={"tooltip_text"}>
                                    {status_text === "Offline"
                                        ? status_text
                                        : `${status_text} on ${active_on.join(", ")}`}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.discord_button}>
                        <a href={`https://discord.com/users/${info.discord_user.id}`} target="_blank" style={{ 'textDecoration': 'none' }} rel="noreferrer">
                            <DiscordButton info={
                                { text: `Discord`, is_link: true }
                            } />
                        </a>
                    </div>
                </div>
                <div className={styles.discord_header_bottom}>
                    <div className={styles.user}>
                        <div className={styles.user_name}>{info.discord_user.username}</div>
                        <div className={styles.user_discriminator}>#{info.discord_user.discriminator}</div>
                    </div>
                    {custom_status && (
                        <div className={styles.custom_status}>
                            {custom_status_emoji && (
                                <div className={styles.custom_status_emoji}>
                                    <img
                                        src={custom_status_emoji}
                                        alt={custom_status.emoji.id}
                                    />
                                    <div className={`tooltip ${styles.custom_status_emoji_tooltip}`}>
                                        <div className={`tooltip_arrow ${styles.custom_status_emoji_arrow}`}></div>
                                        <div className={"tooltip_text"}>{custom_status.emoji.name}</div>
                                    </div>
                                </div>
                            )}
                            {custom_status_text && (
                                <div className={styles.custom_status_text}>{custom_status_text}</div>
                            )}
                        </div>
                    )}
                </div>

                <div className={styles.divider}></div>
                <Presence />
            </div>
        </div>
    );
};

export default Discord;
