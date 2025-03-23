import { HTMLAttributeAnchorTarget } from "react";

const socials: SocialType[] = [
    {
        value: 'sp',
        name: 'Spotify',
        url: 'https://open.spotify.com/user/31frempzaphgs26vlu4nn7tpagki/'
    },
    {
        value: 'github',
        name: 'GitHub',
        url: 'https://github.com/lechixy'
    },
    {
        value: 'ig',
        name: 'Instagram',
        url: 'https://www.instagram.com/lechixy/'
    },
    {
        value: 'steam',
        name: 'Steam',
        url: 'https://steamcommunity.com/id/lechixy/'
    },
    {
        value: 'gallery',
        name: 'Gallery',
        type: '_self',
        url: '/gallery'
    },
    {
        value: 'kick',
        name: 'Kick',
        url: 'https://kick.com/lechixy'
    },
    {
        value: 'tw',
        name: 'Twitch',
        url: 'https://twitch.tv/lechixy/'
    },
    {
        value: 'dc',
        name: 'Reaver',
        url: 'https://discord.gg/reaver'
    },
    {
        value: 'lechsbott',
        name: 'Add lechsbott',
        url: 'https://discord.com/oauth2/authorize?client_id=753906874729889853&permissions=8&scope=bot%20applications.commands'
    },
]

export type SocialValues = "ig" | "tw" | "steam" | "sp" | "github" | "lechsbott" | "gallery" | "dc" | "kick";


type SocialType = {
    value: SocialValues;
    name?: string;
    type?: HTMLAttributeAnchorTarget;
    url: string
}

export default socials;