import styles from './Spinner.module.scss';

export default function Spinner({ text }: { text: string }) {
    return (
        <div className={styles.loader}>
            <div className={styles.lds_ellipsis}>
                <div></div><div></div><div></div><div></div>
            </div>
            <div className={styles.loadingText}>{text}</div>
        </div>
    )
}