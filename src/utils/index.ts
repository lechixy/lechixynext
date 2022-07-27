export function formatTime(time: number): string {
    if (time < 10) {
        return `0${time}`
    }
    return `${time}`
}

export function getTime(): string {
    let now = new Date();
    let hour = now.getHours();
    let min = now.getMinutes();
    let sec = now.getSeconds();
    return `${formatTime(hour)}:${formatTime(min)}:${formatTime(sec)}`;
}

export function decideContent(status: any, type: 'large' | 'small') {
    if (status.assets.large_image.startsWith('mp:external')) {
        return 'https://media.discordapp.net/' + status.assets.large_image.slice(3);
    } else {
        return `https://cdn.discordapp.com/app-assets/${status.application_id}/${status.assets?.large_image}.png`
    }
}

export function layerContainer() {
    let container = document.querySelector('.layer-container');
    let layer = document.createElement('div');
    container?.appendChild(layer);

    return layer;
}