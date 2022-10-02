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

type BoundingObject = {
    xCenter: number;
    yCenter: number;
}

export function getBoundingBox(element: any) {
    const box = element.getBoundingClientRect()
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