export const gallery: GalleryCategory[] = [
    {
        title: "lech's favs 💖",
        description: "eres mi mamacita",
        type: "ytplaylist",
        id: "PL4M8BXP3yVwevtdlP4rvHVYHdB2JhTprB",
        link: "https://youtube.com/playlist?list=PL4M8BXP3yVwevtdlP4rvHVYHdB2JhTprB"
    }
]

export type GalleryCategory = {
    title: string;
    description: string;
    type: "ytplaylist";
    link: string;
    id: string;
    //items: VideoItem[];
}

// type VideoItem = {
//     title: string;
//     url: string;
//     videoId: string;
//     addedAt: number;
// }