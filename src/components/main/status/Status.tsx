import { FC } from 'react';
import styles from './Status.module.scss'

type StatusProp = {
    status: {
        type: number;
        state: string;
        name: string;
        id: string;
        created_at: number
    }
}

export const Status: FC<StatusProp> = ({ status }) => {

    if (status?.type === 4) {
        return (
            <div className={styles.type_4}>
                <span className={styles.type_4_head}>{status.name}</span>
                <span>{status.state}</span>
            </div>
        )
    } else {
        return (
            <span>No status probably doing anything</span>
        )
    }
}