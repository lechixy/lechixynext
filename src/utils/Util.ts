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
    "https://cdn.discordapp.com/attachments/999248792840831036/1026069300097851452/1.png",
    "https://cdn.discordapp.com/attachments/999248792840831036/1026069300529868800/2.png",
    "https://cdn.discordapp.com/attachments/999248792840831036/1026069300982861834/3.png",
    "https://cdn.discordapp.com/attachments/999248792840831036/1158030922327785542/1330314.png",
    "https://cdn.discordapp.com/attachments/999248792840831036/1158030922772385832/737474.png",
    "https://cdn.discordapp.com/attachments/999248792840831036/1158031512223105054/1331311.png",
    "https://cdn.discordapp.com/attachments/999248792840831036/1158031512718020729/1330761.png",
    "https://cdn.discordapp.com/attachments/999248792840831036/1158031513414283436/719179.png",
    "https://cdn.discordapp.com/attachments/999248792840831036/1026069301305819176/4.jpg",
    "https://cdn.discordapp.com/attachments/999248792840831036/1026071494314430504/16.jpg",
    "https://cdn.discordapp.com/attachments/999248792840831036/1026071494645796934/15.jpg",
    "https://cdn.discordapp.com/attachments/999248792840831036/1026071495115550750/14.jpg",
    "https://cdn.discordapp.com/attachments/999248792840831036/1026071495702749184/13.webp",
    "https://cdn.discordapp.com/attachments/999248792840831036/1026071496143163432/12.webp",
    "https://cdn.discordapp.com/attachments/999248792840831036/1026071496596140032/11.webp",
    "https://cdn.discordapp.com/attachments/999248792840831036/1026071496961036309/10.jpg",
    "https://cdn.discordapp.com/attachments/999248792840831036/1026071497279819797/9.jpg",
    "https://cdn.discordapp.com/attachments/999248792840831036/1026071497611161600/8.jpg",
    "https://cdn.discordapp.com/attachments/999248792840831036/1158029774124482640/1332406.png",
    "https://cdn.discordapp.com/attachments/999248792840831036/1158029774581665872/1332015.png",
    "https://cdn.discordapp.com/attachments/999248792840831036/1158029775210807306/1329412.png",
    "https://cdn.discordapp.com/attachments/999248792840831036/1158029775210807306/1329412.png",
    "https://cdn.discordapp.com/attachments/999248792840831036/1158029776091619368/1316292.jpeg",
    "https://cdn.discordapp.com/attachments/999248792840831036/1158029776460709989/677543.jpg",
    "https://cdn.discordapp.com/attachments/999248792840831036/1158030426691088404/1311965.jpg",
    "https://cdn.discordapp.com/attachments/999248792840831036/1158030427194392576/1332708.png",
    "https://cdn.discordapp.com/attachments/999248792840831036/1158030427555111001/1331860.png",
    "https://cdn.discordapp.com/attachments/999248792840831036/1026069301611991091/5.jpg",
    "https://cdn.discordapp.com/attachments/999248792840831036/1026071806932684810/20.png",
    "https://cdn.discordapp.com/attachments/999248792840831036/1026071807272439888/19.webp",
    "https://cdn.discordapp.com/attachments/999248792840831036/1026071807733800970/18.jpg",
    "https://cdn.discordapp.com/attachments/999248792840831036/1026071808019017768/17.webp",
    "https://cdn.discordapp.com/attachments/999248792840831036/1158030427987128431/1332018.png",
    "https://cdn.discordapp.com/attachments/999248792840831036/1158030428523986964/1319293.jpeg",
    "https://cdn.discordapp.com/attachments/999248792840831036/1158030428964401162/1331453.png",
    "https://cdn.discordapp.com/attachments/999248792840831036/1158033114761789570/1330682.jpg",
    "https://cdn.discordapp.com/attachments/999248792840831036/1158031514970370119/1330094.png",
    "https://cdn.discordapp.com/attachments/999248792840831036/1158031694520127549/314574.png",
    "https://cdn.discordapp.com/attachments/999248792840831036/1158031695077982278/1322308.jpeg",
    "https://cdn.discordapp.com/attachments/999248792840831036/1158031695556124733/1330234.png",
    "https://cdn.discordapp.com/attachments/999248792840831036/1158031696172695692/736461.png",
    "https://cdn.discordapp.com/attachments/999248792840831036/1158030920318713906/1329169.png",
    "https://cdn.discordapp.com/attachments/999248792840831036/1158030921669283930/1314408.png",
    "https://cdn.discordapp.com/attachments/999248792840831036/1158030921975476284/1331544.png",
    "https://cdn.discordapp.com/attachments/999248792840831036/1158031514072793159/1329621.png",
    "https://cdn.discordapp.com/attachments/999248792840831036/1158031514496405534/1329618.png",
    "https://cdn.discordapp.com/attachments/999248792840831036/1158031696713752586/283589238959249062.jpg",
    "https://cdn.discordapp.com/attachments/999248792840831036/1158031697229660190/28690249062890689024.png"
]

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
            times.push(this.formatTime(min), this.formatTime(sec));
    
    
            return times.join(':');
        }
    }

    static getRandomBackground(){
        let random = Math.floor(Math.random() * backgrounds.length)
        return backgrounds[random]
    }
}