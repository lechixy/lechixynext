import Head from "next/head";
import styles from './Gallery.module.scss';
import { GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from "next";
import { Util } from "utils/Util";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { playlist_info, YouTubePlayList } from 'play-dl';
import { GalleryResponse, YouTubePl } from "pages/api/gallery";
import { gallery } from "data/gallery";
import Spinner from "components/Spinner";
import Spinner_2 from "components/Spinner_2";

const Gallery: NextPage<any> = () => {

    const router = useRouter()
    const [player, setPlayer] = useState(false);
    const [galleryData, setGalleryData] = useState<YouTubePl | null>(null);

    useEffect(() => {
        if (router.query.category && router.query.item) {
            setPlayer(true);
        } else {
            setPlayer(false);
        }
    }, [router])

    useEffect(() => {
        const videos = document.querySelector(`div.${styles.videos}`) as HTMLDivElement;
        if (videos) {
            videos.addEventListener("wheel", (ev) => handleScroll(ev));
        }

        function handleScroll(e: WheelEvent) {
            console.log("works")
            if (e.deltaY > 0) {
                videos.scrollLeft += 100;
                e.preventDefault();
            }
            else {
                videos.scrollLeft -= 100;
                e.preventDefault();
            }
        }

        return () => {
            if (videos) {
                videos.removeEventListener("wheel", (ev) => handleScroll(ev));
            }
        }
    }, [player])

    useEffect(() => {
        let localApi = fetch("/api/gallery")
            .then((data) => data.json())
            .then((res: GalleryResponse) => {
                if (res.code == 200) {
                    setGalleryData(res.data!.ytdata)
                } else {
                    setGalleryData(null);
                }
            })
    }, [])

    let category = router.query.category as unknown as number;
    let item = router.query.item
    let currentCategory = gallery[category]
    let currentMedia = galleryData?.videos.find(video => video.id == item)

    return (
        <div className={styles.main}>
            <Head>
                <title>lechixy | gallery</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.navigation}>
                    <Link href={currentMedia ? "/gallery" : "/"}>
                        <div className={styles.icon}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                                <path d="m313-440 196 196q12 12 11.5 28T508-188q-12 11-28 11.5T452-188L188-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l264-264q11-11 27.5-11t28.5 11q12 12 12 28.5T508-715L313-520h447q17 0 28.5 11.5T800-480q0 17-11.5 28.5T760-440H313Z" />
                            </svg>
                        </div>
                    </Link>
                    <div className={styles.title}>{currentMedia ? `${currentCategory.title} | ${currentMedia.title}` : `Gallery`}</div>
                </div>
                <div className={styles.gallery}>
                    {player ? (
                        <div className={styles.watch}>
                            <div className={styles.player}>
                                <iframe
                                    src={`https://www.youtube.com/embed/${currentMedia?.id}`}
                                    title={currentMedia?.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
                                </iframe>
                            </div>
                            <div className={styles.about}>
                                <div className={styles.title}>{currentMedia?.title}</div>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.categories}>
                            <div className={styles.category}>
                                <div className={styles.top}>
                                    <div className={styles.title}>{gallery[0].title}</div>
                                    <div className={styles.description}>{gallery[0].description}</div>
                                </div>
                                <div className={styles.videos}>
                                    {galleryData ? (
                                        galleryData.videos.reverse().map(video => {
                                            return (
                                                <Link href={`/gallery?category=0&item=${video.id}`} key={video.id}>
                                                    <div className={styles.video}>
                                                        <img draggable={false} src={Util.youtubeThumbnail(video.id)} alt={video.title} />
                                                        <div style={{
                                                            backgroundImage: `linear-gradient(hsla(0, 0%, 0%, 30%), hsla(0, 0%, 0%, 30%)), url(${Util.youtubeThumbnail(video.id)})`
                                                        }} className={styles.overlay}></div>
                                                        <div className={styles.content}>
                                                            <div className={styles.title}>{video.title}</div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            )
                                        })
                                    ) : (
                                        <Spinner_2 />
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};


export default Gallery;