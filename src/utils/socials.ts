const socials: SocialType[] = [
    {
        name: 'Instagram',
        url: 'https://www.instagram.com/lechixy/'
    },
    {
        name: 'Twitch',
        url: 'https://twitch.tv/lechixy/'
    },
    {
        name: 'Steam',
        url: 'https://steamcommunity.com/id/lechixy/'
    },
    {
        name: 'Spotify',
        url: 'https://open.spotify.com/user/31frempzaphgs26vlu4nn7tpagki/'
    },
    {
        name: 'GitHub',
        url: 'https://github.com/lechixy'
    },
    {
        name: 'lechsbott',
        url: 'https://discord.com/oauth2/authorize?client_id=753906874729889853&permissions=8&scope=bot%20applications.commands'
    }
]

type SocialType = {
    name: "Instagram" | "Twitch" | "Steam" | "Spotify" | "GitHub" | "lechsbott";
    url: string
}

export default socials;