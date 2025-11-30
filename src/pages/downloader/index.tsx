import styles from './Downloader.module.scss';
import { NextPage } from "next";
import { useState } from "react";
import Head from 'next/head';

const Downloader: NextPage = () => {
    const [url, setUrl] = useState<string>("");

    const handlePaste = async () => {
        const text = await navigator.clipboard.readText();
        setUrl(text);
    }
    const handleDownload = () => {
        if (!url.length) return;

        window.location.href = `/api/download?url=${encodeURIComponent(url)}`;
    };

    return (
        <div className={styles.main}>
            <Head>
                <title>Downloader</title>
            </Head>

            <div className={styles.container}>
                <div className={styles.infoContainer}>
                    <div className={styles.title}>Lech Downloader</div>
                </div>
                <div className={styles.downloadContainer}>
                    <div className={styles.inputSection}>
                        <input
                            type="text"
                            placeholder="Enter video URL..."
                            className={styles.input}
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyDown={(event) => {
                                if(event.key == "Enter"){
                                    handleDownload();
                                }
                            }}
                        />
                        <button
                            className={styles.pasteButton}
                            onClick={handlePaste}
                        >
                            <svg height="24px" viewBox="0 -960 960 960" width="24px" fill="currentcolor">
                                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h167q11-35 43-57.5t70-22.5q40 0 71.5 22.5T594-840h166q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560h-80v80q0 17-11.5 28.5T640-640H320q-17 0-28.5-11.5T280-680v-80h-80v560Zm280-560q17 0 28.5-11.5T520-800q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800q0 17 11.5 28.5T480-760Z" /></svg>
                        </button>
                    </div>

                    <button
                        className={styles.downloadButton}
                        onClick={handleDownload}
                    >
                        Download
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Downloader;