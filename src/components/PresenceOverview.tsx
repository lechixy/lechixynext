import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import styles from "styles/main/New.module.scss";
import type { ApiRespond } from "utils/types";
import ShinyText from "./reactbits/ShinyText";

export default function PresenceOverview({ data }: { data: ApiRespond | null }) {
    const reduceMotion = useReducedMotion();
    const song = data?.listening_to_spotify ? data.spotify?.song : undefined;
    const game = data?.activities.find(activity => activity.type === 0);
    const hidden = { opacity: 0, y: reduceMotion ? 0 : 6 };
    const activityMotion = {
        initial: hidden,
        animate: { opacity: 1, y: 0 },
        exit: hidden,
        transition: { duration: reduceMotion ? 0 : 0.22 },
    };

    return (
        <div className={styles.presenceOverviewContainer}>
            <AnimatePresence>
                {song && (
                    <motion.a key="music" href="#presence" className={styles.presenceOverview}
                        aria-label={`Listening to ${song} on Spotify. View presence`} {...activityMotion}>
                        <svg className={styles.musicIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <rect x="2" y="8" width="3" height="12" rx="1.5" />
                            <rect x="8" y="3" width="3" height="17" rx="1.5" />
                            <rect x="14" y="6" width="3" height="14" rx="1.5" />
                            <rect x="20" y="11" width="3" height="9" rx="1.5" />
                        </svg>
                        <span className={styles.activityTitle} title={song}>
                            <ShinyText text={song} className={styles.shinyActivityTitle} speed={3} color="currentColor"
                                shineColor="var(--spotify-shimmer, #fff)" direction="left" disabled={Boolean(reduceMotion)} underline />
                        </span>
                    </motion.a>
                )}
                {game && (
                    <motion.a key="game" href="#presence" className={styles.presenceOverview}
                        aria-label={`Playing ${game.name}. View presence`} {...activityMotion}>
                        <svg className={styles.gameIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M7 6h10c2 0 3.5 1.4 4 3.4l1 4.7c.7 3.2-2.2 5-4.1 3.1L15.6 15H8.4l-2.3 2.2C4.2 19.1 1.3 17.3 2 14.1l1-4.7C3.5 7.4 5 6 7 6Z"
                                stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                            <path d="M5.5 10.5h5m-2.5-2.5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                            <circle cx="16" cy="9" r="1.15" fill="currentColor" />
                            <circle cx="18.5" cy="11.5" r="1.15" fill="currentColor" />
                        </svg>
                        <span className={styles.activityTitle} title={game.name}>{game.name}</span>
                    </motion.a>
                )}
            </AnimatePresence>
        </div>
    );
}
