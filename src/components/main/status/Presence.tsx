import { FC } from 'react';
import styles from './Presence.module.scss'
import { WebSocketContext, useContext } from '../../../utils/context';
import { ApiRespond } from '../../../utils/types';
import { Spotify } from './activity/Spotify';
import { GameActivity } from './activity/Game';

export const Presence: FC = () => {

    const info = useContext(WebSocketContext) as unknown as ApiRespond
    const noActivity = info.activities.length === 1 && info.activities[0].type === 4 && !info.listening_to_spotify

    return (
        <div className={styles.presence}>
            {info.activities.find(x => x.type === 0) && (
                <GameActivity />
            )}
            {info.listening_to_spotify && (
                <Spotify />
            )}
            {noActivity && (
                <div className={styles.offline}>
                    <span>Well... there is no activity to show you {`>_<`}</span>
                </div>
            )}
            {info.discord_status === "offline" && (
                <div className={styles.offline}>
                    <span>Looks like {`i'm`} offline {`>_<`}</span>
                </div>
            )}
        </div>
    )
}

export default Presence;