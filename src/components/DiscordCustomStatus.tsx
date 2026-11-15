/* eslint-disable @next/next/no-img-element */
import styles from "styles/main/New.module.scss";
import type { ApiRespond } from "utils/types";
import { presenceTooltipAnchor } from "./Tooltip";

type CustomStatus = {
    state?: string;
    emoji?: { id?: string | null; name?: string; animated?: boolean };
};

export default function DiscordCustomStatus({ data }: { data: ApiRespond | null }) {
    const status: CustomStatus | undefined = data?.activities.find(activity => activity.type === 4);
    const text = status?.state?.trim();
    const emoji = status?.emoji;
    const emojiTooltip = presenceTooltipAnchor(emoji?.name);
    const emojiUrl = emoji?.id ? `https://cdn.discordapp.com/emojis/${emoji.id}.webp?size=64` : null;

    if (!text && !emojiUrl && !emoji?.name) return null;

    return (
        <p className={styles.customStatus} dir="auto">
            {emojiUrl ? (
                <picture className={styles.customStatusEmoji} tabIndex={emoji?.name ? 0 : undefined} {...emojiTooltip}>
                    {emoji?.animated && (
                        <source media="(prefers-reduced-motion: no-preference)" srcSet={`${emojiUrl}&animated=true`} />
                    )}
                    <img src={emojiUrl} alt={emoji?.name ?? ""} width={20} height={20} />
                </picture>
            ) : emoji?.name && (
                <span className={styles.customStatusEmoji} tabIndex={0} {...emojiTooltip}>{emoji.name}</span>
            )}
            {text && <span className={styles.customStatusText}>{text}</span>}
        </p>
    );
}
