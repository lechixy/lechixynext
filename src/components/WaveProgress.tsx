import React from 'react';
import styles from './WaveProgress.module.scss';

const WaveProgress = ({ progress = 50 }) => {
    return (
        <div className={styles[`progress-bar`]}>
            <div className={styles[`wave-container`]}>
                <div
                    className={`${styles[`wave`]} ${styles[`wave1`]}`}
                    style={{ width: `${progress}%` }}
                ></div>
                <div
                    className={`${styles[`wave`]} ${styles[`wave2`]}`}
                    style={{ width: `${progress}%` }}
                ></div>
                <div
                    className={`${styles[`wave`]} ${styles[`wave3`]}`}
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
};

export default WaveProgress;
