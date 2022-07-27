import { createContext, useContext } from "react";

const WebSocketContext = createContext(null)

export {
    WebSocketContext,
    useContext,
}