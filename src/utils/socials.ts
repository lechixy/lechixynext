import { HTMLAttributeAnchorTarget } from "react";

const socials: SocialType[] = [
    {
        value: `sp`,
        name: `Spotify`,
        url: `https://open.spotify.com/user/31frempzaphgs26vlu4nn7tpagki/`,
        details: `Maybe you want to listen to music with me?`,
        color: "rgba(0, 255, 68, 1)"
    },
    {
        value: `github`,
        name: `GitHub`,
        url: `https://github.com/lechixy`,
        details: `I code stuff, you can see my projects here.`,
        color: "rgba(0, 0, 0, 1)"
    },
    {
        value: `ig`,
        name: `Instagram`,
        url: `https://www.instagram.com/lechixy/`,
        color: "rgba(255, 0, 174, 1)"
    },
    {
        value: `steam`,
        name: `Steam`,
        url: `https://steamcommunity.com/id/lechixy/`,
        details: `I game a lot, you can see my Steam here.`,
        color: "rgba(0, 255, 255, 1)"
    },
    {
        value: `gallery`,
        name: `Gallery`,
        type: `_self`,
        url: `/gallery`,
        details: `Some edits that I liked.`,
        color: "rgba(255, 0, 89, 1)"
    },
    {
        value: `kick`,
        name: `Kick`,
        url: `https://kick.com/lechixy`,
        details: `I watch streams sometimes.`,
        color: "rgba(0, 231, 1, 1)"
    },
    {
        value: `tw`,
        name: `Twitch`,
        url: `https://twitch.tv/lechixy/`,
        details: `I watch streams sometimes.`,
        color: "rgba(225, 0, 255, 1)"
    },
    {
        value: `dc`,
        name: `Reaver`,
        url: `https://discord.gg/reaver`,
        color: "rgba(0, 255, 255, 1)"
    },
    {
        value: `lechsbott`,
        name: `Add lechsbott`,
        url: `https://discord.com/oauth2/authorize?client_id=753906874729889853&permissions=8&scope=bot%20applications.commands`,
        details: `You can add my bot to your server, it's a really good bot!`,
        color: "rgba(235, 231, 0, 1)"
    },
    {
        value: `code`,
        name: `Source Code`,
        url: `https://github.com/lechixy/lechixynext`,
        details: `Check out the source code of this page.`,
        color: "rgba(0, 255, 255, 1)"
    },
]

export type SocialValues = "ig" | "tw" | "steam" | "sp" | "github" | "lechsbott" | "gallery" | "dc" | "kick" | "code";


type SocialType = {
    value: SocialValues;
    name?: string;
    type?: HTMLAttributeAnchorTarget;
    details?: string;
    url: string;
    color: string;
}

export default socials;