import { snowflake } from "./icons_svg";

type BoundingObject = {
    xCenter: number;
    yCenter: number;
}

type Season = "spring" | "summer" | "autumn" | "winter"
type SeasonContent = {
    seasonEmojis: string;
    seasonParticle: string;
}

const backgrounds = [
    "/backgrounds/0.png",
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
    "/backgrounds/18.jpg",
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
]

export const status_colors = {
    online: "#2eff2e, #007c00",
    idle: "#ffff2e, #7c7c00",
    dnd: "#ff002e, #7c0000",
    offline: "#575757, #1f1f1f",
};

export class Util {
    static getSeasonName(): Season {
        const now = new Date();
        const month = now.getMonth() + 1; // Months are 0-indexed, so add 1
        const day = now.getDate();

        if ((month === 3 && day >= 20) || (month === 4) || (month === 5)) {
            return "spring";
        } else if ((month === 6 && day >= 21) || (month === 7) || (month === 8)) {
            return "summer";
        } else if ((month === 9 && day >= 22) || (month === 10) || (month === 11)) {
            return "autumn";
        } else {
            return "winter";
        }
    }
    static getSeasonContent(season: Season): SeasonContent {
        let particle: string = snowflake;
        let emojis: string = "🍓❄️";

        if (season == "spring") {
            particle = "🌸"
            emojis = "🍓🌸"
        } else if (season == "summer") {
            emojis = "🍓🌞"
            particle = ""
        } else if (season == "autumn") {
            particle = "🍂"
            emojis = "🍓🍂"
        }

        return {
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

    static getRandomBackground(){
        let random = Math.floor(Math.random() * backgrounds.length)
        return backgrounds[random]
    }
}