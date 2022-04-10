import React, { useEffect } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import styles from '../../utils/styles/watchlist/Watchlist.module.scss'
import { MovieItem } from '../../components/watchlist/MovieItem';

const Watchlist: NextPage = () => {


    let animetextobject = [
        {
            image: `https://cdn.discordapp.com/attachments/962485725805314169/962502445160865802/demon_slayer.png`,
            title: `Demon Slayer`,
            status: `watching`
        },
        {
            image: `https://cdn.discordapp.com/attachments/962485725805314169/962501927839625257/a_cab23ddbbaae81fb82eaad24f44e91a9.gif`,
            title: `AWESOME GIF!!!!`,
            status: `will_watch`
        },
        {
            image: `https://cdn.discordapp.com/attachments/962485725805314169/962504551536148480/277414573_335052851934479_562692384654407419_n.jpg`,
            title: `marin`,
            status: `watched`
        }
    ]

    return (
        <div className={styles.main}>
            <Head>
                <title>lechixy | watchlist!</title>
            </Head>
            <div className={styles.list_header}>
                <h1>{`lechixy's watchlist`}</h1>
            </div>
            <div className={styles.list_container}>
                <div className={styles.list_array}>
                    {animetextobject.map(x => (
                        <MovieItem key={x.title} movie={x} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Watchlist;