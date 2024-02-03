/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import styles from './Valentine.module.scss';

const phrases = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again?",
    "Pookie please",
    "Don't do this to me",
    "Nooo",
    "Don't click me again",
    "I said don't",
    "You are doing a mistake",
    "Just give me a chance",
    "I'll cuddle you all the time",
    "You are breaking my heart ;(",
    "I am gonna cry...",
    "I am crying rn 😭",
    "Don't leave me without you",
    "I am gonna kiss you even if you get sick",
    "I'll buy you presents and flowers",
    "I just wanna be yours 🩵",
    "I really want to be with you :(",
    "Promise i'll love you until forever",
    "I love you 3000 💖"
]

const Valentine: NextPage = () => {

    const [noCount, setNoCount] = useState(0);
    const [yesPressed, setYesPressed] = useState(false);
    let yesButtonSize = noCount * 20 + 16;

    function handleNo() {
        setNoCount(noCount + 1);
    }

    function getNoText() {
        return phrases[Math.min(noCount, phrases.length - 1)];
    }

    return (
        <>
            <Head>
                <title>Will you be my valentine?</title>
            </Head>
            <div className={styles.main}>
                {yesPressed ? (
                    <div className={styles.yesContainer}>
                        <img alt="Kissing bears" src="https://c.tenor.com/jjM8wEXXNqwAAAAd/tenor.gif" />
                        <span>{`Yeyyyy love you soo much (⁠◍⁠•⁠ᴗ⁠•⁠◍⁠)❤️⁠`}</span>
                    </div>
                ) : (
                    <>
                        <img className={styles.noImage} alt="Kissing bears" src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.webp" />
                        <div className={styles.noContainer}>
                            <span>Will you be my valentine?</span>
                            <div>
                                <button
                                    className={`${styles.button} ${styles.yesButton}`}
                                    style={{ fontSize: yesButtonSize }}
                                    onClick={() => setYesPressed(true)}
                                >{`Yess <3`}</button>
                                <button
                                    className={`${styles.button} ${styles.noButton}`}
                                    onClick={() => handleNo()}
                                >{getNoText()}</button>
                            </div>
                        </div>
                    </>

                )}
            </div>
        </>
    );
}

export default Valentine;