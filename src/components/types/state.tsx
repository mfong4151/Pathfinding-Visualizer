import { consoleContent } from "./objects";
import { startStop } from "./positions";


// Universal states

export type isPlayingState = {
    isPlaying: boolean,
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
}


export type  consoleContentState = {
    consoleContent: consoleContent
    setConsoleContent:React.Dispatch<React.SetStateAction<consoleContent>>;
}

export type errorsState = {
    errors: string[]
    setErrors: React.Dispatch<React.SetStateAction<string[]>>
}


// Matrix state

export type matrixState = {
    matrix: string[][];
    setMatrix: React.Dispatch<React.SetStateAction<Array<any>>>;
}

export type startEndState = {
    startEndPos: startStop;
    setStartEndPos: React.Dispatch<React.SetStateAction<startStop>>
}

export type matrixNodeState = {
    matrixNodes: boolean,
    setMatrixNodes: React.Dispatch<React.SetStateAction<boolean>>
}

export type startEndPosState = {

    startEndPos: startStop,
    setStartEndPos:React.Dispatch<React.SetStateAction<startStop>>
}


