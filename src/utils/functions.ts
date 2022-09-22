export function formatTime(time: number): string {
    if (time < 10) {
        return `0${time}`
    }
    return `${time}`
}

export function toTimestamp(second: number): string {
    let times: string[] = [];

    if (second < 60) {
        return `0:${formatTime(second)}`
    } else {
        let hour = parseInt((second / 3600).toPrecision());
        if (hour !== 0) {
            times.push(formatTime(hour));
            second = second - (hour * 3600);
        }
        let min = parseInt((second / 60).toPrecision());
        let sec = second - (min * 60)
        times.push(formatTime(min), formatTime(sec));


        return times.join(':');
    }
}