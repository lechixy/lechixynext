import { createContext, useContext, Context } from "react";

const WebSocketContext = createContext(null)

export {
    WebSocketContext,
    useContext,
}