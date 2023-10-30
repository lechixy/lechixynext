import styles from 'styles/main/Home.module.scss';

export default function Spinner() {
    return (
        <div className={styles.discord_loading}>
            <div className={styles.discord_loading_spinner}>
                <div className={`${styles.spinner} ${styles.spinner_1}`} />
                <div className={`${styles.spinner} ${styles.spinner_2}`} />
                <div className={`${styles.spinner} ${styles.spinner_3}`} />
            </div>
            <p className={styles.discord_loading_text}>Loading</p>
        </div>
    )
}