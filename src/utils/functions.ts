export function formatTime(time: number): string {
    if (time < 10) {
        return `0${time}`
    }
    return `${time}`
}

export function toTimestamp(second: number): string {
    if (second < 60) {
        return `00:${second}`
    } else {
        let min = parseInt((second / 60).toPrecision());
        console.log(min)
        let sec = second - (min * 60)
        console.log(sec)

        return `${formatTime(min)}:${formatTime(sec)}`
    }
}