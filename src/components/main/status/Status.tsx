import { FC, useState } from 'react';
import styles from './Status.module.scss'
import { WebSocketContext, useContext } from '../../../utils/context';
import { Spotify } from './activity/Spotify/Spotify';
import { GameActivity } from './activity/Game/Game';


export const Status: FC = () => {

    const { info } = useContext(WebSocketContext)

    //Game
    if (info.data.activities.find(x => x.type === 0)) {

        return (
            <GameActivity />
        )
    }

    //Spotify
    if (info.data.listening_to_spotify === true) {
        return (
            <Spotify />
        )

    }

    return (
        <div className={styles.offline}>
            <span>Well, there is no activity to show you {`>_<`} </span>
        </div>
    )
}