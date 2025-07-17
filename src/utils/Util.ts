import { FinalColor } from "extract-colors/lib/types/Color";
import { snowflake } from "./icons_svg";

export const gameIcons = {
    lol: "https://cdn.discordapp.com/app-icons/401518684763586560/2c1781b672e14e86b7bec677eee2fbde.png?size=160&keep_aspect_ratio=false"
}

export function isMobile(navigator: Navigator): boolean {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

type BoundingObject = {
    xCenter: number;
    yCenter: number;
}

type Season = "spring" | "summer" | "autumn" | "winter"
type SeasonContent = {
    seasonEmojis: string;
    renderParticle: boolean;
    seasonParticle: string;
}

const seasonalBackgrounds = {
    winter: [
        "/backgrounds/winter/0.png",
        "/backgrounds/winter/1.jpg",
        "/backgrounds/winter/2.jpg",
        "/backgrounds/winter/3.png",
        "/backgrounds/winter/4.png",
        "/backgrounds/winter/5.webp",
    ],
    spring: [
        "/backgrounds/spring/0.png",
        "/backgrounds/spring/1.png",
        "/backgrounds/spring/2.png",
        "/backgrounds/spring/3.png",
        "/backgrounds/spring/4.png",
        "/backgrounds/spring/5.jpg",
        "/backgrounds/spring/6.jpg",
        "/backgrounds/spring/7.jpg",
        "/backgrounds/spring/8.jpg",
        //"/backgrounds/spring/9_muted.mp4",
    ],
    summer: [
        // "/backgrounds/summer/0.png",
        // "/backgrounds/summer/1.png",
        // "/backgrounds/summer/3.png",
        // "/backgrounds/summer/4.png",
        // "/backgrounds/summer/5.png",
        "/backgrounds/summer/7.jpg",
        //"/backgrounds/summer/6.mp4",
    ],
    autumn: [
        "/backgrounds/38.jpg",
    ]
}

/** 
 * ! DEPRECATED
const backgrounds = [
    //"/backgrounds/0.png",
    "/backgrounds/1.jpg",
    "/backgrounds/2.png",
    "/backgrounds/3.png",
    "/backgrounds/4.png",
    "/backgrounds/5.jpg",
    "/backgrounds/6.png",
    "/backgrounds/7.png",
    "/backgrounds/8.jpg",
    "/backgrounds/9.jpg",
    "/backgrounds/10.jpg",
    "/backgrounds/11.png",
    "/backgrounds/12.png",
    "/backgrounds/15.png",
    "/backgrounds/16.png",
    "/backgrounds/17.png",
    //"/backgrounds/18.jpg",
    "/backgrounds/19.png",
    "/backgrounds/20.png",
    "/backgrounds/21.png",
    "/backgrounds/22.png",
    "/backgrounds/23.png",
    "/backgrounds/24.png",
    "/backgrounds/25.png",
    "/backgrounds/26.png",
    "/backgrounds/27.png",
    "/backgrounds/28.jpg",
    "/backgrounds/29.png",
    "/backgrounds/30.webp",
    "/backgrounds/31.jpg",
    "/backgrounds/32.png",
    "/backgrounds/33.webp",
    "/backgrounds/34.webp",
    "/backgrounds/35.webp",
    "/backgrounds/36.png",
    "/backgrounds/37.jpg"
]
*/

export const status_colors = {
    online: "#2eff2e, #007c00",
    idle: "#ffff2e, #7c7c00",
    dnd: "#ff002e, #7c0000",
    offline: "#575757, #1f1f1f",
};

export const loadingTexts = [
    "Wait, a little pookie...",
    "Loading, just for you",
    "Getting cute data from server",
    "Little Little, in to the middle!",
    "Who think that writing that boring \"Loading...\" text can helpful?",
    "And you don't seem to understand",
    "Check one, two, ah!",
    "I never seen a such a liar",
    "Sanırım Türkçe yazı yazmayı unutmuşum",
    "Tensaitekina aidoru sama",
    "Ichibanboshi wo yadoshiteiru",
    "Oh love me Mister!",
    "Lost in paradise!",
    "But you belong to me, ooh, you belong to me",
    "Eres mi mamacita, ¿qué tal, mi margarita?",
    "İfadeler seslerden daha seslidir ve Sago sessizlerin sesidir...",
    "The only flaw, you are flawless",
    "Psst, i see dead people",
    "We were too close to the stars ✨",
    "Falling just as hard",
    "That's that me, espresso ☕",
    "Look in my eyes, tell me your tale",
    "I like the way you kiss me",
    "A little context if you care to listen",
    "Oh baby, where are you now when i need you most?",
    "Baby, you're no good for me",
    "Diet mountain dew, baby, New York City",
    "Baby, put on heart shaped sunglasses 💖",
    "Scary? My God, you're divine",
    "I could sparkle up your eye ✨",
    "I wanna make you mine",
    "My kinda loveee",
    "I wanna be saveeeddd",
    "Beggin' on her knees to be popular",
    "I wanna take you away",
    "Do i wanna know?",
    "Happy nation, living in a happy nation",
    "Oh, is there someone else or not?",
    "'Cause I wanna be with you forever, forever",
    "Judas is the demon i cling to, i cling to",
    "I wanted you to know, that I am ready to go",
    "Make it to the high fashion",
    "İstisnalar kaideyi bozmaz",
    "Cheri, cheri lady, goin' throught a motion",
    "Baby, love me 'cause I'm playin' on the radio",
    "Sakladığın bir şeyler var",
    "Ellerini kaçır tamam ama gözlerinde ayrılıklar",
    "How deep is your love?",
    "I just wanna get high with my lover",
    "Acelen ne? Bekle firuze",
    "Her şeyin bedeli var güzelliğininde, bir gün gelir ödenir...",
    "Love really hurts without you",
    "Got a sweet Asian chick, she go lo mein"
];

export type BingImageResponse = {
    images: {
        startdate: string;
        fullstartdate: string;
        enddate: string;
        url: string;
        urlbase: string;
        copyright: string;
        copyrightlink: string;
        title: string;
        quiz: string;
        wp: boolean;
        hsh: string;
        drk: number;
        top: number;
        bot: number;
    }[];
}

export class Util {
    static hexToRgb(hex: string): { r: number; g: number; b: number } {
        // "#" karakterini kaldır ve küçük harfe çevir
        const cleanedHex = hex.replace(/^#/, '').toLowerCase();

        // 3 karakterli formu 6 karakterliye dönüştür (#abc -> #aabbcc)
        const fullHex = cleanedHex.length === 3
            ? cleanedHex.split('').map(c => c + c).join('')
            : cleanedHex;
        // Regex ile uygunluk kontrolü
        if (!/^([0-9a-f]{6})$/.test(fullHex)) return { r: 0, g: 0, b: 0 };


        const r = parseInt(fullHex.substring(0, 2), 16);
        const g = parseInt(fullHex.substring(2, 4), 16);
        const b = parseInt(fullHex.substring(4, 6), 16);

        return { r, g, b };
    }


    /**
     * This function is used to handle the text color based on the season.
     * It returns a boolean value indicating whether the text color should be white or black.
     */
    static handleTextColor(bgColor: FinalColor) {
        function getLuminance(r: number, g: number, b: number) {
            // sRGB -> Linear dönüşüm
            const a = [r, g, b].map(function (v) {
                v /= 255;
                return v <= 0.03928
                    ? v / 12.92
                    : Math.pow((v + 0.055) / 1.055, 2.4);
            });
            // Luminance hesaplama (ITU-R BT.709 standardı)
            return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
        }

        // rgb(r, g, b) formatını parçalayalım
        const luminance = getLuminance(bgColor.red, bgColor.green, bgColor.blue);

        // 0.5 eşik değeri, istenirse ayarlanabilir
        return luminance > 0.5 ? 'black' : 'white';
    }

    /**
     * This function is used to get the Bing image of the day.
     * It fetches the image from the Bing API and returns the image URL.
     */
    static async getTodaysBingImage(): Promise<BingImageResponse> {
        return fetch("https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US")
            .then((response) => response.json())
            .then((data) => {
                return {
                    images: data.images.map((image: any) => ({
                        startdate: image.startdate,
                        fullstartdate: image.fullstartdate,
                        enddate: image.enddate,
                        url: `https://www.bing.com${image.url}`,
                        urlbase: `https://www.bing.com${image.urlbase}`,
                        copyright: image.copyright,
                        copyrightlink: image.copyrightlink,
                        title: image.title,
                        quiz: `https://www.bing.com${image.quiz}`,
                        wp: image.wp,
                        hsh: image.hsh,
                        drk: image.drk,
                        top: image.top,
                        bot: image.bot
                    }))
                }
            })
    }

    /**
     * Random background from seasonal backgrounds
     */
    static getRandomSeasonalBackground() {
        let season = this.getSeasonName();
        let random = Math.floor(Math.random() * seasonalBackgrounds[season].length)
        return {
            src: seasonalBackgrounds[season][random],
            animated: seasonalBackgrounds[season][random].endsWith('.mp4')
        }

        // return {
        //     src: "/backgrounds/spring/9.mp4",
        //     animated: true
        // }
    }

    /**
     * Log message with lech's log style
     * @param message string
     */
    static log(message: string) {
        const styles = ['color: cyan'].join(';');
        const styles2 = ['color: white'].join(';');

        let chalkmessage = `%c[lechixy\'s log]%c ${message}`
        console.log(chalkmessage, styles, styles2);
    }

    static getRandomLoadingText() {
        let random = Math.floor(Math.random() * loadingTexts.length)
        return loadingTexts[random]
    }

    static youtubeQueryString(params: Record<string, string>): string {
        return Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            .join('&');
    }

    static youtubeThumbnail(videoId: string): string {
        return `https://img.youtube.com/vi/${videoId}/hq720.jpg`
    }

    static getSeasonName(): "spring" | "summer" | "autumn" | "winter" | Season {
        const now = new Date();
        const month = now.getMonth() + 1; // Months are 0-indexed, so add 1
        const day = now.getDate();

        if ((month === 3) || (month === 4) || (month === 5)) {
            return "spring";
        } else if ((month === 6) || (month === 7) || (month === 8)) {
            return "summer";
        } else if ((month === 9) || (month === 10) || (month === 11)) {
            return "autumn";
        } else {
            return "winter";
        }
    }
    static getSeasonContent(season: Season): SeasonContent {
        /**
         * Season default is Winter cause it's my fav <3
         */
        let particle: string = snowflake;
        let emojis: string = "❄️";
        let renderParticle = true;

        if (season == "spring") {
            particle = "🌸"
            emojis = "🌸"
            renderParticle = true;
        } else if (season == "summer") {
            emojis = "⛱️🌞"
            particle = ""
            renderParticle = false;
        } else if (season == "autumn") {
            particle = "🍂"
            emojis = "🍂"
            renderParticle = true;
        }

        return {
            renderParticle,
            seasonParticle: particle,
            seasonEmojis: emojis
        }
    }

    static getBoundingBox(element: HTMLElement) {
        const box: any = element.getBoundingClientRect()
        const ret: any = {}

        // Loops through all DomRect properties.
        // Cannot spread because they're not enumerable.
        for (const prop in box) {
            ret[prop] = box[prop]
        }

        ret.xCenter = (box.left + box.right) / 2
        ret.yCenter = (box.top + box.bottom) / 2

        return ret as BoundingObject
    }

    static getTime(): string {
        let now = new Date();
        let hour = now.getHours();
        let min = now.getMinutes();
        let sec = now.getSeconds();
        return `${this.formatTime(hour)}:${this.formatTime(min)}:${this.formatTime(sec)}`;
    }

    static decideContent(status: any, type: 'large' | 'small') {
        if (status.assets.large_image.startsWith('mp:external')) {
            return 'https://media.discordapp.net/' + status.assets.large_image.slice(3);
        } else {
            return `https://cdn.discordapp.com/app-assets/${status.application_id}/${status.assets?.large_image}.png`
        }
    }

    static layerContainer() {
        let container = document.querySelector('.layer-container');
        let layer = document.createElement('div');
        container?.appendChild(layer);

        return layer;
    }

    static websocketlog(message: string) {
        const styles = ['color: cyan'].join(';');
        const styles2 = ['color: white'].join(';');

        let chalkmessage = `%c[lechixy\'s websocket]%c ${message}`
        console.log(chalkmessage, styles, styles2);
    }

    static formatTime(time: number): string {
        if (time < 10) {
            return `0${time}`
        }
        return `${time}`
    }

    static toTimestamp(second: number): string {
        let times: string[] = [];

        if (second < 60) {
            return `0:${this.formatTime(second)}`
        } else {
            let hour = parseInt((second / 3600).toPrecision());
            if (hour !== 0) {
                times.push(this.formatTime(hour));
                second = second - (hour * 3600);
            }
            let min = parseInt((second / 60).toPrecision());
            let sec = second - (min * 60)
            times.length == 1 ? times.push(this.formatTime(min)) : times.push(min.toString())
            times.push(this.formatTime(sec));
            return times.join(':');
        }
    }

    /** 
    * ! DEPRECATED
    static getRandomBackground() {
        let random = Math.floor(Math.random() * backgrounds.length)
        return backgrounds[random]
    }
    */
}