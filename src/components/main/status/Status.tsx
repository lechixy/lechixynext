import { FC } from 'react';
import styles from './Status.module.scss'
import { Props } from '../../../utils/types';
import Image from 'next/image'
import Link from 'next/link'

export const Status: FC<Props> = ({ info }) => {

    let status = info.data.activities[0]
    if (info.data.listening_to_spotify === true) {

        let spotify = info.data.spotify
        let spotifyact = info.data.activities.find(x => x.type === 2)

        return (
            <div className={styles.type_2}>
                <div className={styles.type_2_header}>
                    <h3>LISTENING TO SPOTIFY</h3>
                </div>
                <div className={styles.type_2_spotify}>
                    <Image className={styles.type_2_spotify_img} src={spotify.album_art_url} alt={`${spotify.album}`} height={120} width={120} />
                    <div className={styles.type_2_spotify_text}>
                        <span className={styles.type_2_spotify_text_song}>
                            <Link href={`https://open.spotify.com/track/${spotify.track_id}`} passHref>
                                <span className={styles.underline}>{spotify.song}</span>
                            </Link>
                        </span>
                        <span className={styles.type_2_spotify_text_artist}>
                            by <span className={styles.underline}>{spotify.artist}</span>
                        </span>
                        <span className={styles.type_2_spotify_text_album}>
                            on <span className={styles.underline}>{spotify.album}</span>
                        </span>
                        <div>---------</div>
                        <div>
                            <span>start</span>
                            <span>end</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    //Custom Status
    if (status?.type === 4) {
        return (
            <div className={styles.type_4}>
                <span className={styles.type_4_head}>{status.name}</span>
                <span>{status.state}</span>
            </div>
        )
    } else {
        return (
            <div className={styles.offline}>
                <span>*No status probably doing anything*</span>
            </div>
        )
    }
}