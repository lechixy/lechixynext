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