import React, { useEffect } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../utils/styles/watchlist/Watchlist.module.scss'

const Watchlist: NextPage = () => {
    return (
        <div className={styles.main}>
            <Head>
                <title>lechixy | watchlist!</title>
            </Head>
            <div className={styles.list_header}>
                <h1>{`lechixy's watchlist`}</h1>
            </div>
            <div className={styles.list_container}>
                <div className={styles.list_item}></div>
                <div className={styles.list_item}></div>
                <div className={styles.list_item}></div>
                <div className={styles.list_item}></div>
                <div className={styles.list_item}></div>
                <div className={styles.list_item}></div>
                <div className={styles.list_item}></div>
                <div className={styles.list_item}></div>
                <div className={styles.list_item}></div>
                <div className={styles.list_item}></div>
            </div>
        </div>
    );
}

export default Watchlist;