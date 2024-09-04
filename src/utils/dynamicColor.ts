import { useContext, createContext } from "react"
import { Util } from "./Util";

let season = Util.getSeasonName();
const DynamicColorContext = createContext<string>(`var(--${season})`)

export {
    DynamicColorContext,
    useContext
}