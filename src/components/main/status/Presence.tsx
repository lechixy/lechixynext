import { FC } from 'react';
import styles from './Presence.module.scss'
import { WebSocketContext, useContext } from '../../../utils/lanyard';
import { ApiRespond } from '../../../utils/types';
import { Spotify } from './activity/Spotify';
import { GameActivity } from './activity/Game';

export const Presence: FC = () => {

    const info = useContext(WebSocketContext) as unknown as ApiRespond
    const activity = info.activities.find(x => x.type === 0)
    const isListening = info.listening_to_spotify
    const isOffline = info.discord_status === "offline"
    //We using "length < 2" because custom status counted as an activity
    const noActivity = info.activities.length < 2 && !isOffline

    return (
        <div className={styles.presence}>
            {activity && (
                <GameActivity />
            )}
            {isListening && (
                <Spotify />
            )}
            {noActivity && (
                <div className={styles.offline}>
                    <span>Well... there is no activity to show you</span>
                </div>
            )}
            {isOffline && (
                <div className={styles.offline}>
                    <span>Looks like {`i'm`} offline</span>
                </div>
            )}
        </div>
    )
}

export default Presence;