import styles from './Spinner.module.scss';

export default function Spinner_2() {
    return (
        <div className={styles.lds_ellipsis}>
            <div></div><div></div><div></div><div></div>
        </div>
    )
}