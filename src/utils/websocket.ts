import WebSocket from 'ws';
import { TextDecoder } from 'util';

let wsServerUrl = 'wss://api.lanyard.rest/socket';

let ws = new WebSocket(wsServerUrl)
let ab = new TextDecoder();
let interval = 30000;
let intervalObject: NodeJS.Timeout;


function connect() {
    ws.on('open', function open() {
        console.log(`Connection established to ${wsServerUrl}`)

        ws.on('close', function close() {
            ws.removeAllListeners();
            clearInterval(intervalObject);
            connect();
        })

        initializeMessage();
    })

    ws.on('message', function message(data: any) {
        if (typeof data !== 'string') {
            data = ab.decode(data);
        }
        let parsed = JSON.parse(data);
        convertInfo(parsed);
        return parsed;
    })
}

let data: Object;

//Function for reconnecting to ws server again
export function sendInfoToClient() {
    connect();
    return data === undefined ? null : data;
}


function convertInfo(info: any) {
    if(info.op === 0){
        data = info.d
    }
}

function send(message: any) {
    return ws.send(JSON.stringify(message));
}

function initializeMessage() {
    let msg = {
        op: 2,
        d: {
            // subscribe_to_ids should be an array of user IDs you want to subscribe to presences from
            // if Lanyard doesn't monitor an ID specified, it won't be included in INIT_STATE
            subscribe_to_id: "391511241786654721"
        }
    }

    send(msg)
    intervalObject = setInterval(() => {
        console.log('Sending heartbeat_interval')
        let msg = {
            op: 3
        }
        send(msg)
    }, interval);
}