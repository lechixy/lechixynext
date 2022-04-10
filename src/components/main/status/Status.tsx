import { FC, useState } from 'react';
import styles from './Status.module.scss'
import { Props } from '../../../utils/types';
import { Spotify } from './activity/Spotify/Spotify';
import { GameActivity } from './activity/Game/Game';

export const Status: FC<Props> = ({ info }) => {

    //Game
    if (info.data.activities.find(x => x.type === 0)) {

        return (
            <GameActivity info={info}/>
        )
    }

    //Spotify
    if (info.data.listening_to_spotify === true) {
        return (
            <Spotify info={info} />
        )

    }

    return (
        <div className={styles.offline}>
            <span>Well, there is no activity to show you {`>_<`} </span>
        </div>
    )
}