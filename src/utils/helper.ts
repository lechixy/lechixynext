export function addZero(value: string){
    return parseInt(value) < 10 ? `0${value}` : value;
}