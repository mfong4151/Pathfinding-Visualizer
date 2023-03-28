import { startStop } from "./positions";

export type matrixState = {
    matrix: string[][];
    setMatrix: React.Dispatch<React.SetStateAction<Array<any>>>;
}

export type  consoleContentState = {
    consoleContent: any[]
    setConsoleContent:React.Dispatch<React.SetStateAction<any[]>>;
}

export type startEndState = {
    startEndPos: startStop;
    setStartEndPos: React.Dispatch<React.SetStateAction<startStop>>
}