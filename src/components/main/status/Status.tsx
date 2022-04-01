import { FC } from 'react';
import styles from './Status.module.scss'
import { Props } from '../../../utils/types';
import Image from 'next/image'
import Link from 'next/link'
import moment from 'moment';
import { addZero } from '../../../utils/helper';

export const Status: FC<Props> = ({ info }) => {

    let status = info.data.activities[0]

    //Spotify
    if (info.data.listening_to_spotify === true) {

        let spotify = info.data.spotify
        let spotifyact = info.data.activities.find(x => x.type === 2)
        let tracklengthms = spotify.timestamps.end - spotify.timestamps.start
        let tracknowms = Date.now() - spotify.timestamps.start

        let tracknow = `${moment.duration(tracknowms).minutes()}:${addZero(moment.duration(tracknowms).seconds().toString())}`
        let tracklength = `${moment.duration(tracklengthms).minutes()}:${addZero(moment.duration(tracklengthms).seconds().toString())}`

        return (
            <div className={styles.type_2}>
                <div className={styles.header}>
                    <h3>LISTENING TO SPOTIFY</h3>
                </div>
                <div className={styles.spotify}>
                    <Image className={styles.spotify_img} src={spotify.album_art_url} alt={`${spotify.album}`} height={120} width={120} />
                    <div className={styles.spotify_text}>
                        <span className={styles.spotify_text_song}>
                            <Link href={`https://open.spotify.com/track/${spotify.track_id}`} passHref>
                                <span className={styles.underline}>{spotify.song}</span>
                            </Link>
                        </span>
                        <span className={styles.spotify_text_artist}>
                            by <Link href={`https://open.spotify.com/search/${encodeURIComponent(spotify.artist)}`} passHref>
                                <span className={styles.underline}>
                                    {spotify.artist}
                                </span>
                            </Link>
                        </span>
                        <span className={styles.spotify_text_album}>
                            on <Link href={`https://open.spotify.com/search/${encodeURIComponent(spotify.album)}`} passHref>
                                <span className={styles.underline}>
                                    {spotify.album}
                                </span>
                            </Link>
                        </span>
                        <div className={styles.spotify_statusbar_bg}>
                            <div className={styles.spotify_statusbar}>
                            </div>
                        </div>
                        <div className={styles.spotify_timestamp_area}>
                            <span className={styles.spotify_timestamp}>{tracknow}</span>
                            <span className={styles.spotify_timestamp}>{tracklength}</span>
                        </div>

                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className={styles.offline}>
                <span>*No activities and doing anything*</span>
            </div>
        )
    }
}