import React from 'react';
import styles from 'styles/404/404.module.scss'
import Head from 'next/head'
import Link from 'next/link'

export default function ErrorPage_404() {

    return (
        <div className={styles.main}>
            <Head>
                <title>404 | Not found</title>
            </Head>
            <div className={styles.background}>
                <div className={styles.head}>404 | Not found</div>
                <div className={styles.subhead}>You are searching for a thing that is not exist {'>_<'}</div>
                <Link href='/' passHref className={styles.paragraph}>
                    <div >Return to main page</div>
                </Link>
            </div>
        </div>
    )
}