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
import YouTube, { YouTubeEvent, YouTubePlayer, YouTubeProps } from "react-youtube"

const Gallery: NextPage<any> = () => {

    const router = useRouter()
    const [player, setPlayer] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [galleryData, setGalleryData] = useState<YouTubePl | null>(null);
    const [youtubeApi, setYoutubeApi] = useState<YouTubePlayer | null>(null);

    useEffect(() => {
        if (router.query.category && router.query.item) {
            setPlayer(true);
        } else {
            setPlayer(false);
        }
    }, [router])

    useEffect(() => {
        let localApi = fetch("/api/gallery")
            .then((data) => data.json())
            .then((res: GalleryResponse) => {
                if (res.code == 200) {
                    let correctData = res.data?.ytdata
                    correctData!.videos[0].isFirst = true;
                    correctData!.videos[correctData!.videos.length - 1].isLast = true;

                    setGalleryData(res.data!.ytdata)
                    console.log(res.data!.ytdata)
                } else {
                    setGalleryData(null);
                }
            })
    }, [])

    const onStateChanged: YouTubeProps['onStateChange'] = (event) => {
        // // If a video selected from playlist button on YouTubePlayer load all playlist again
        // if (event.data == 5 && galleryData) {
        //     let videoIds = galleryData.videos.map(video => video.id);
        //     let currentMediaIndex = galleryData.videos.findIndex(video => video.id == currentMedia?.id)
        //     event.target.loadPlaylist(videoIds, currentMediaIndex);
        // }

        // If video id is not equal to current video id update it
        //console.log(event.target.playerInfo.videoData)
        if (event.target.playerInfo.videoData?.video_id) {
            router.replace(`/gallery?category=0&item=${event.target.playerInfo.videoData.video_id}`, undefined, { shallow: true })
            //router.push({query: {category: 0, item: event.target.playerInfo.videoData.video_id}}, undefined, { shallow: true });
        }
        console.log(event.data);
        // If video is playing
        if (event.data == 1) {
            setPlaying(true);
        } else {
            setPlaying(false);
        }
    }

    const onReady: YouTubeProps['onReady'] = (event) => {
        setYoutubeApi(event.target);
        // if (galleryData) {
        //     let videoIds = galleryData.videos.map(video => video.id);
        //     let currentMediaIndex = galleryData.videos.findIndex(video => video.id == currentMedia?.id)
        //     event.target.loadPlaylist(videoIds, currentMediaIndex);
        // }
    }

    let category = router.query.category as unknown as number;
    let item = router.query.item
    let currentCategory = gallery[category]
    let currentMedia = galleryData?.videos.find(video => video.id == item);
    let currentIndex = galleryData?.videos.findIndex(video => video.id == item);
    let previousVideo = galleryData?.videos[currentIndex! - 1] ?? galleryData?.videos[currentIndex!];
    let nextVideo = galleryData?.videos[currentIndex! + 1] ?? galleryData?.videos[currentIndex!];

    useEffect(() => {
        if (currentMedia) {
            document.title = `lechixy | ${currentMedia?.title}`;
        } else {
            document.title = `lechixy | gallery`;
        }
    }, [currentMedia])



    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={`${styles.navigation} ${playing ? styles.playing : ""}`}>
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
                                {currentMedia && (
                                    <YouTube className={styles.youtube} opts={{
                                        playerVars: {
                                            // https://developers.google.com/youtube/player_parameters
                                            autoplay: 1,
                                        },
                                    }} onReady={onReady} onStateChange={onStateChanged} videoId={currentMedia.id} title={currentMedia.title} />
                                )}
                                {/* <iframe
                                    src={`https://www.youtube.com/embed/${currentMedia?.id}`}
                                    title={currentMedia?.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
                                </iframe> */}
                            </div>
                            <div className={styles.about}>
                                <div className={`${styles.queue} ${styles.previousVideo} ${nextVideo?.isFirst ? "" : styles.videoAvailable}`} onClick={() => { youtubeApi?.loadVideoById(previousVideo!.id) }} >
                                    {previousVideo && (
                                        <>
                                            <div className={styles.queueContainer}>
                                                <div className={styles.queueTitle}>{previousVideo.isFirst ? "First" : "Previous"}</div>
                                                <div className={styles.queueVideoName}>{previousVideo.title}</div>
                                            </div>
                                            <div className={`${styles.gradient} ${styles.previousGradient}`} />
                                            <img src={previousVideo.thumbnail.url} alt={previousVideo.title} />
                                        </>
                                    )}
                                </div>
                                <div className={styles.videoInfo}>
                                    <div className={styles.title}>{currentMedia?.title}</div>
                                    <div>{`${currentMedia?.durationRaw} - ${currentMedia?.channel.name}`}</div>
                                </div>
                                <div className={`${styles.queue} ${styles.nextVideo} ${nextVideo?.isLast ? "" : styles.videoAvailable}`} onClick={() => { youtubeApi?.loadVideoById(nextVideo!.id) }} >
                                    {nextVideo && (
                                        <>
                                            <div className={styles.queueContainer}>
                                                <div className={styles.queueTitle}>{nextVideo.isLast ? "Last" : "Next"}</div>
                                                <div className={styles.queueVideoName}>{nextVideo.title}</div>
                                            </div>
                                            <div className={`${styles.gradient} ${styles.nextGradient}`} />
                                            <img src={nextVideo.thumbnail.url} alt={nextVideo.title} />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.categories}>
                            <div className={styles.blank} />
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
                                        <Spinner text="Loading playlist..." />
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