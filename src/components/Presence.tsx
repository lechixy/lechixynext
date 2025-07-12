import { FC, useEffect, useState } from 'react';
import styles from 'components/Presence.module.scss';
import { WebSocketContext, useContext } from 'utils/lanyard';
import { ApiRespond } from 'utils/types';
import { Spotify } from 'components/activity/Spotify';
import { GameActivity } from 'components/activity/Game';
import { WatchActivity } from './activity/Watch';
import { AnimatePresence } from 'framer-motion';

export const Presence: FC = () => {

    const info = useContext(WebSocketContext) as unknown as ApiRespond

    const isListening = info.listening_to_spotify
    const isPlaying = info.activities.find(x => x.type === 0)
    const isWatching = info.activities.find(x => x.type === 3)
    const isOffline = info.discord_status === "offline"
    //We using this because we don't want Custom Status to be counted as an activity
    const numberOfActivities = info.activities.find(x => x.type === 4) ?
        info.activities.length - 1 : info.activities.length
    const atLeastTwoActivities = numberOfActivities >= 2
    const noActivity = !isPlaying && !isOffline && !isListening && !isWatching

    console.log("Presence", info);

    return (
        <div className={`${styles.presence} ${noActivity || isOffline ? styles.noActivity : ""}`}>
            {isListening && (
                <Spotify />
            )}
            {atLeastTwoActivities && (
                <div className={styles.blank} style={{ height: "10px" }}></div>
            )}
            {isPlaying && (
                <GameActivity />
            )}
            {numberOfActivities == 3 && (
                <div className={styles.blank} style={{ height: "10px" }}></div>
            )}
            {isWatching && (
                <WatchActivity />
            )}
            {atLeastTwoActivities && (
                <div className={styles.blank} style={{ height: "30px" }}></div>
            )}
            {noActivity && (
                <div className={styles.offline}>
                    <span>Well... looks like things are quiet for now.</span>
                </div>
            )}
            {isOffline && (
                <div className={styles.offline}>
                    <span>Currently offline... so nothing to see right now.</span>
                </div>
            )}
        </div>
    )
}

export default Presence;