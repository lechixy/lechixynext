/* eslint-disable @next/next/no-img-element */
import styles from './MovieItem.module.scss'
import { FC } from 'react';

type MovieItemProps = {
    movie: {
        title: string;
        image: string;
        status: string;
    }
}

export const MovieItem: FC<MovieItemProps> = ({ movie }) => {

    let moviestatus = movie.status === 'will_watch' ? '👍 Will Watch' :
        movie.status === 'watching' ? '✨ Watching' : '❤️ Watched';
    let statuscolor = movie.status === 'will_watch' ? '#ff9900' :
        movie.status === 'watching' ? '#2bff00' : '#ff0000'


    return (
        <div className={styles.list_item}>
            <div>
                <img src={movie.image} alt='Image' className={styles.list_item_image} />
            </div>
            <div className={styles.list_item_header}>
                <span>{movie.title}</span>
            </div>
            <div className={styles.list_item_status} style={{'backgroundColor': `${statuscolor}`}}>
                <span>{moviestatus}</span>
            </div>
        </div>
    )
}