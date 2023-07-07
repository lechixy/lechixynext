export type Props = {
    info: ApiRespond;
};

export type ApiRespond = {
    spotify: {
        track_id: string
        timestamps: {
            start: number;
            end: number;
        };
        song: string;
        artist: string;
        album_art_url: string;
        album: string;
    };
    listening_to_spotify: boolean;
    discord_user: {
        avatar: string;
        avatar_decoration: string | null;
        bot: boolean;
        discriminator: string;
        display_name: string;
        global_name: string;
        id: string;
        public_flags: number;
        username: string;
    }
    discord_status: string;
    activities: [any];
    active_on_discord_web: boolean;
    active_on_discord_mobile: boolean;
    active_on_discord_desktop: boolean;
} & Object;

export type Season = "winter" | "autumn" | "spring" | "summer"