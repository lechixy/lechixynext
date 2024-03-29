import styles from 'components/DiscordButton.module.scss';
import { FC } from 'react';

type Props = {
    info: {
        text: string,
        is_link: boolean,
    },
}

export const DiscordButton: FC<Props> = ({ info }) => {
    return (
        <button className={styles.discord_button}>
            <div className={styles.discord_button_container}>
                <span className={styles.discord_button_container_text}>{info.text}</span>
                {
                    info.is_link ? (<svg className={styles.discord_button_container_svg} aria-hidden="false" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M10 5V3H5.375C4.06519 3 3 4.06519 3 5.375V18.625C3 19.936 4.06519 21 5.375 21H18.625C19.936 21 21 19.936 21 18.625V14H19V19H5V5H10Z"></path><path fill="currentColor" d="M21 2.99902H14V4.99902H17.586L9.29297 13.292L10.707 14.706L19 6.41302V9.99902H21V2.99902Z"></path></svg>) : null
                }
            </div>
        </button>
    )
}