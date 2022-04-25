import { createContext, useContext, Context } from "react";
import { Props } from '../utils/types';

const WebSocketContext = createContext(null)

export {
    WebSocketContext,
    useContext,
}