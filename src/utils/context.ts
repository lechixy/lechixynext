import { createContext, useContext, Context } from "react";
import { Props } from '../utils/types';

const WebSocketContext: Context<Props> = createContext()

export {
    WebSocketContext,
    useContext,
}