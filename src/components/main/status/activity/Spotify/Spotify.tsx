/* eslint-disable @next/next/no-img-element */
import moment from 'moment';
import { FC, useState, useEffect } from 'react';
import styles from './Spotify.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { addZero } from '../../../../../utils/helper';
import spsvg from '../../../../../utils/spotify.svg';
import { SpotifyButton } from './SpotifyButton';

type Props = {
    info: ApiRespond;
};

type ApiRespond = {
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
        activities: [any];
        active_on_discord_web: boolean;
        active_on_discord_mobile: boolean;
        active_on_discord_desktop: boolean;
    }
}

export const Spotify: FC<Props> = ({ info }) => {

    let spotify = info.data.spotify
    let spotifyact = info.data.activities.find(x => x.type === 2)

    //Miliseconds
    let tracknow = Date.now() - spotify.timestamps.start
    let tracklength = spotify.timestamps.end - spotify.timestamps.start

    //Timestamps
    let tracknow_timestamp = `${new Date(tracknow).getMinutes()}:${addZero(new Date(tracknow).getSeconds().toString())}`
    let tracklength_timestamp = `${new Date(tracklength).getMinutes()}:${addZero(new Date(tracklength).getSeconds().toString())}`

    //Status bar values
    let nowAsSeconds = Math.round(moment.duration(tracknow).asSeconds())
    let lengthAsSeconds = Math.round(moment.duration(tracklength).asSeconds())
    let percent = (nowAsSeconds * 100) / lengthAsSeconds;

    //Live values
    let [start, setStart] = useState(tracknow_timestamp)

    useEffect(() => {
        const interval = setInterval(() => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            tracknow = Date.now() - spotify.timestamps.start
            // eslint-disable-next-line react-hooks/exhaustive-deps
            tracknow_timestamp = `${new Date(tracknow).getMinutes()}:${addZero(new Date(tracknow).getSeconds().toString())}`

            setStart(tracknow_timestamp)
        }, 1000)

        if (nowAsSeconds >= lengthAsSeconds) {
            setStart(tracknow_timestamp)
            clearInterval(interval);
            return
        }

        return () => clearInterval(interval)
    })


    return (
        <div className={styles.type_2}>
            <div className={styles.header}>
                <h3 title={`Listening to Spotify`}>LISTENING TO SPOTIFY</h3>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.34784 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2ZM16.5625 16.4375C16.3791 16.7161 16.0145 16.8107 15.7188 16.6562C13.375 15.2188 10.4062 14.9062 6.9375 15.6875C6.71979 15.7377 6.49182 15.668 6.33945 15.5046C6.18709 15.3412 6.13348 15.1089 6.19883 14.8952C6.26417 14.6816 6.43854 14.519 6.65625 14.4688C10.4688 13.5938 13.7188 13.9688 16.375 15.5938C16.5149 15.6781 16.6141 15.816 16.6495 15.9755C16.685 16.1349 16.6535 16.3019 16.5625 16.4375ZM17.8125 13.6875C17.7053 13.8622 17.5328 13.9869 17.3333 14.0338C17.1338 14.0807 16.9238 14.0461 16.75 13.9375C14.0625 12.2812 9.96875 11.8125 6.78125 12.7812C6.5133 12.8594 6.22401 12.7887 6.02236 12.5957C5.8207 12.4027 5.73731 12.1168 5.80361 11.8457C5.8699 11.5746 6.0758 11.3594 6.34375 11.2812C9.96875 10.1875 14.5 10.7188 17.5625 12.625C17.9134 12.8575 18.0229 13.3229 17.8125 13.6875ZM17.9062 10.875C14.6875 8.96875 9.375 8.78125 6.28125 9.71875C5.81691 9.79284 5.36952 9.5115 5.23513 9.0609C5.10074 8.61031 5.32093 8.12986 5.75 7.9375C9.28125 6.875 15.1562 7.0625 18.875 9.28125C19.0893 9.40709 19.2434 9.61436 19.3023 9.85577C19.3612 10.0972 19.3198 10.3521 19.1875 10.5625C18.9054 10.9822 18.3499 11.1177 17.9062 10.875Z"
                        fill="#1ED760" />
                </svg>
            </div>
            <div className={styles.spotify}>
                <div className={styles.spotify_img}>
                    <Image src={spotify.album_art_url} alt={`${spotify.album}`} height={140} width={140} title={`${spotify.album}`} />
                </div>
                <div className={styles.spotify_text}>
                    <span className={styles.spotify_text_song} title={`${spotify.song}`}>
                        <Link href={`https://open.spotify.com/track/${spotify.track_id}`} passHref>
                            <span className={styles.underline}>{spotify.song}</span>
                        </Link>
                    </span>
                    <span className={styles.spotify_text_artist} title={`by ${spotify.artist}`}>
                        by <Link href={`https://open.spotify.com/search/${encodeURIComponent(spotify.artist)}`} passHref>
                            <span className={styles.underline}>
                                {spotify.artist}
                            </span>
                        </Link>
                    </span>
                    <span className={styles.spotify_text_album} title={`on ${spotify.album}`}>
                        on <Link href={`https://open.spotify.com/search/${encodeURIComponent(spotify.album)}`} passHref>
                            <span className={styles.underline}>
                                {spotify.album}
                            </span>
                        </Link>
                    </span>
                    <div className={styles.spotify_statusbar_bg}>
                        <div style={{ 'width': `${percent}%` }} className={styles.spotify_statusbar}>
                        </div>
                    </div>
                    <div className={styles.spotify_timestamp_area}>
                        <span className={styles.spotify_timestamp} title={`${tracknow_timestamp}`} >{start}</span>
                        <span className={styles.spotify_timestamp} title={`${tracklength_timestamp}`} >{tracklength_timestamp}</span>
                    </div>
                </div>
            </div>
            <div>
                <SpotifyButton url={`spotify:track:{spotify.track_id}`} />
            </div>
        </div>
    )
}