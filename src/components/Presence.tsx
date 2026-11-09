import type { FC } from 'react';
import styles from 'components/Presence.module.scss';
import type { ApiRespond } from 'utils/types';
import { Spotify } from 'components/activity/Spotify';
import { GameActivity } from 'components/activity/Game';
import { WatchActivity } from './activity/Watch';
import StatusIndicator from 'components/StatusIndicator';

const statusLabels = new Map([
    ['online', 'Online'],
    ['idle', 'Idle'],
    ['dnd', 'Do not disturb'],
    ['offline', 'Offline'],
]);

export const Presence: FC<{ info: ApiRespond }> = ({ info }) => {

    const isListening = info.listening_to_spotify && Boolean(info.spotify)
    const playingActivities = info.activities.filter(x => x.type === 0)
    const isWatching = info.activities.find(x => x.type === 3)
    const status = info.discord_status
    const isOffline = status === 'offline'
    const hasActivity = isListening || playingActivities.length > 0 || Boolean(isWatching)

    if (!hasActivity) {
        const label = statusLabels.get(status);
        return (
            <div className={`${styles.presence} ${styles.noActivity}`}>
                <div className={styles.emptyState} role="status">
                    <div className={styles.emptyIcon} aria-hidden="true">
                        <StatusIndicator status={label ? status : 'offline'} />
                    </div>
                    <div>
                        <span className={styles.emptyLabel}>{label ?? 'Presence'}</span>
                        <p className={styles.emptyTitle}>{isOffline ? 'Currently offline' : 'Quiet for now'}</p>
                        <p className={styles.emptyDescription}>
                            {isOffline ? 'Live activity will appear here when I’m back.' : 'Music, games, and streams will appear here when shared.'}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const atLeastTwoActivities = info.activities.filter(activity => activity.type !== 4).length >= 2
    const hasSpotifyAndGame = isListening && playingActivities.length > 0

    return (
        <div className={styles.presence}>
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
        </div>
    )
}

export default Presence;
