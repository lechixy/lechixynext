import { gallery } from 'data/gallery';
import type { NextApiRequest, NextApiResponse } from 'next'
import { playlist_info, YouTubeVideo } from 'play-dl';

export type GalleryResponse = {
    code: number;
    data: Gallery | null;
}

type YouTubeVideoExtended = YouTubeVideo & {
    isFirst: boolean;
    isLast: boolean;
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
        isLast: boolean;
        isFirst: boolean;
    }[];
}

export type Gallery = {
    title: string;
    description: string;
    link: string;
    id: string;
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

    data = {
        title: gallery[0].title,
        description: gallery[0].description,
        link: gallery[0].link,
        id: gallery[0].id,
        type: "ytplaylist",
        ytdata: JSON.parse(JSON.stringify(request))
    }

    res.status(200).json({
        code: 200,
        data: data
    })
}