import { TextDecoder } from 'util';
import WebSocket from 'ws'

export let wsServerUrl = 'wss://api.lanyard.rest/socket';

export let ws = new WebSocket(wsServerUrl)
export let ab = new TextDecoder();
export let interval = 30000;
export let intervalObject: NodeJS.Timeout;


export function onConnect() {
    ws.on('open', function open() {
        console.log(`Connection established to ${wsServerUrl}`)

        initializeMessage();
    })

    
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