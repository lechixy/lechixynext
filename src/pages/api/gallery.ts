import { gallery } from 'data/gallery';
import type { NextApiRequest, NextApiResponse } from 'next'
import { playlist_info } from 'play-dl';

export type GalleryResponse = {
    code: number;
    data: Gallery | null;
}

type YouTubeChannel = {
    artist: false;
    icons: YouTubeIcon[];
    id: string;
    name: string;
    subscribers: any;
    type: "channel";
    url: string;
    verified: boolean;
}

type YouTubeIcon = {
    width: number;
    height: number;
    url: string;
}

export type YouTubePl = {
    channel: YouTubeChannel;
    id: string;
    thumbnail: YouTubeIcon;
    title: string;
    url: string;
    videos: {
        channel: YouTubeChannel;
        chapters: any[];
        durationInSec: number;
        durationRaw: string;
        id: string;
        likes: number;
        live: false;
        music: any[];
        private: boolean;
        tags: any[];
        thumbnail: YouTubeIcon;
        title: string;
        url: string;
        views: number;
    }[];
}

type Gallery = {
    title: string;
    description: string;
    link: string;
    type: "ytplaylist";
    ytdata: YouTubePl | null;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<GalleryResponse>
) {

    let data: Gallery;

    let request = await playlist_info(gallery[0].link)
    if (!request) {
        return res.status(204).json({
            code: 204,
            data: null
        })
    }

    let sortedTitled = request
    let seperators = ["[", "「"]
        ; (await sortedTitled.all_videos()).forEach((vid) => {
            seperators.forEach(sep => {
                if (vid.title?.includes(sep)) {
                    vid.title = vid.title.split(sep)[0];
                }
            })
        })

    data = {
        title: gallery[0].title,
        description: gallery[0].description,
        link: gallery[0].description,
        type: "ytplaylist",
        ytdata: JSON.parse(JSON.stringify(sortedTitled))
    }

    res.status(200).json({
        code: 200,
        data: data
    })
}