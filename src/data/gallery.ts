export const gallery: GalleryCategory[] = [
    {
        title: "lech's favs 💖",
        description: "eres mi mamacita",
        items: [
            {
                title: "GLORY - The Eminence In Shadow😈",
                url: "https://www.youtube.com/watch?v=qRobfOWPk7o&ab_channel=VoiD",
                videoId: "qRobfOWPk7o",
                addedAt: 1725456351,
            },
            {
                title: "Mamacita🏝️💞 - Summer Anime Mix",
                url: "https://www.youtube.com/watch?v=jV8W2l7AOpo&ab_channel=Blubz",
                videoId: "jV8W2l7AOpo",
                addedAt: 1725456490,
            },
            {
                title: "Hakari X Koshitan🕺🔥 - TUCA DONKA",
                url: "https://www.youtube.com/watch?v=DkqnG-9cT-A&ab_channel=VoiD",
                videoId: "DkqnG-9cT-A",
                addedAt: 1725462212,
            },
            {
                title: "Alisa Kujou💞 - Lost Soul Russian",
                url: "https://www.youtube.com/watch?v=__qez9Hr06U&ab_channel=VoiD",
                videoId: "__qez9Hr06U",
                addedAt: 1725462555,
            },
        ]
    }
]

type GalleryCategory = {
    title: string;
    description: string;
    items: VideoItem[];
}

type VideoItem = {
    title: string;
    url: string;
    videoId: string;
    addedAt: number;
}