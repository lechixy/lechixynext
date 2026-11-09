import type { FC } from 'react';
import styles from 'components/Presence.module.scss';
import { ApiRespond } from 'utils/types';
import { Spotify } from 'components/activity/Spotify';
import { GameActivity } from 'components/activity/Game';
import { WatchActivity } from './activity/Watch';

export const Presence: FC<{ info: ApiRespond }> = ({ info }) => {

    const isListening = info.listening_to_spotify && Boolean(info.spotify)
    const playingActivities = info.activities.filter(x => x.type === 0)
    const isWatching = info.activities.find(x => x.type === 3)
    const isOffline = info.discord_status === "offline"
    const atLeastTwoActivities = info.activities.filter(activity => activity.type !== 4).length >= 2
    const hasSpotifyAndGame = isListening && playingActivities.length > 0
    const noActivity = !playingActivities.length && !isOffline && !isListening && !isWatching

    return (
        <div className={`${styles.presence} ${noActivity || isOffline ? styles.noActivity : ""}`}>
            {isListening && <Spotify info={info} />}
            {(hasSpotifyAndGame || atLeastTwoActivities) && <div className={styles.blank} style={{ height: hasSpotifyAndGame ? 4 : 10 }} />}
            {playingActivities.map(activity => (
                <GameActivity key={activity.id} activity={activity} />
            ))}
            {atLeastTwoActivities && <div className={styles.blank} style={{ height: "10px" }} />}
            {isWatching && (
                <WatchActivity info={info} />
            )}
            {atLeastTwoActivities && <div className={styles.blank} style={{ height: "30px" }} />}
            {noActivity && (
                <div className={styles.offline}>
                    <span className={styles.offlineText}>Well... looks like things are quiet for now.</span>
                    <span className={styles.offlineGlow}>Well... looks like things are quiet for now.</span>
                </div>
            )}
            {isOffline && (
                <div className={styles.offline}>
                    <span className={styles.offlineText}>Currently offline... so nothing to see right now.</span>
                    <span className={styles.offlineGlow}>Currently offline... so nothing to see right now.</span>
                </div>
            )}
        </div>
    )
}

export default Presence;
