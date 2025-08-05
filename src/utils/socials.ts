import { HTMLAttributeAnchorTarget } from "react";

const socials: SocialType[] = [
    {
        value: `sp`,
        name: `Spotify`,
        url: `https://open.spotify.com/user/31frempzaphgs26vlu4nn7tpagki/`,
        details: `Maybe you want to listen to music with me?`
    },
    {
        value: `github`,
        name: `GitHub`,
        url: `https://github.com/lechixy`,
        details: `I code stuff, you can see my projects here.`
    },
    {
        value: `ig`,
        name: `Instagram`,
        url: `https://www.instagram.com/lechixy/`
    },
    {
        value: `steam`,
        name: `Steam`,
        url: `https://steamcommunity.com/id/lechixy/`,
        details: `I game a lot, you can see my Steam here.`
    },
    {
        value: `gallery`,
        name: `Gallery`,
        type: `_self`,
        url: `/gallery`,
        details: `Some edits that I liked.`
    },
    {
        value: `kick`,
        name: `Kick`,
        url: `https://kick.com/lechixy`,
        details: `I watch streams sometimes.`
    },
    {
        value: `tw`,
        name: `Twitch`,
        url: `https://twitch.tv/lechixy/`,
        details: `I watch streams sometimes.`
    },
    {
        value: `dc`,
        name: `Reaver`,
        url: `https://discord.gg/reaver`
    },
    {
        value: `lechsbott`,
        name: `Add lechsbott`,
        url: `https://discord.com/oauth2/authorize?client_id=753906874729889853&permissions=8&scope=bot%20applications.commands`,
        details: `You can add my bot to your server, it's a really good bot!`
    },
    {
        value: `sourcecode`,
        name: `Source Code`,
        url: `https://github.com/lechixy/lechixynext`,
        details: `Check out the source code of this page.`
    },
]

export type SocialValues = "ig" | "tw" | "steam" | "sp" | "github" | "lechsbott" | "gallery" | "dc" | "kick" | "sourcecode";


type SocialType = {
    value: SocialValues;
    name?: string;
    type?: HTMLAttributeAnchorTarget;
    details?: string;
    url: string
}

export default socials;