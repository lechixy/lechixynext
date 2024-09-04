import { createContext, useContext } from "react";
import { ApiRespond } from "./types";

const WebSocketContext = createContext<ApiRespond | null>(null)

export {
    WebSocketContext,
    useContext,
}