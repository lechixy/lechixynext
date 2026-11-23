import { IoGameControllerOutline } from "react-icons/io5";
import styles from "components/Presence.module.scss";

export function ActivityElapsed({ elapsed }: { elapsed: string }) {
    return (
        <span className={styles.activityElapsed} aria-label={`${elapsed} elapsed`}>
            <IoGameControllerOutline aria-hidden="true" />
            {elapsed}
        </span>
    );
}
