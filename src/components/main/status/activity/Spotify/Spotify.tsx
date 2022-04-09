import moment from 'moment';
import { FC, useState, useEffect } from 'react';
import styles from './Spotify.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { addZero } from '../../../../../utils/helper';
import spsvg from '../../../../../utils/spotify.svg';

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
                <Image src={spsvg} height={24} width={24} alt={`Spotify`} title={`Spotify`}></Image>
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
        </div>
    )
}