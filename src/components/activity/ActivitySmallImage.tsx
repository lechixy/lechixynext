/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import styles from "components/Presence.module.scss";
import { presenceTooltipAnchor } from "components/Tooltip";

export function ActivitySmallImage({ src, label }: { src: string; label: string }) {
    const [failed, setFailed] = useState(false);
    if (failed) return null;

    return (
        <img className={styles.activitySmallImage} src={src} alt={label} tabIndex={0}
            onError={() => setFailed(true)} {...presenceTooltipAnchor(label)} />
    );
}
