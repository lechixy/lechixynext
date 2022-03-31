export type Props = {
    info: Respond;
};

type Respond = {
    success: boolean;
    data: {
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
            username: string;
            public_flags: number;
            id: string;
            discriminator: string;
            avatar: string;
        }
        discord_status: string;
        activities: [
            {
                type: number;
                state: string;
                name: string;
                id: string;
                created_at: number;
            }
        ];
        active_on_discord_web: boolean;
        active_on_discord_mobile: boolean;
        active_on_discord_desktop: boolean;
    }
}