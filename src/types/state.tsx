import { SetStateAction } from "react";
import { consoleContent, matrixItemObject } from "./objects";
import { pos, startStop } from "./positions";
import { StateSetter } from "./setState";


// Universal states

export type isPlayingState = {
    isPlaying: boolean,
    setIsPlaying: StateSetter<boolean>
}


export type  consoleContentState = {
    consoleContent: consoleContent
    setConsoleContent:StateSetter<consoleContent>
}

export type errorsState = {
    errors: string[]
    setErrors: StateSetter<string[]>
}


// Matrix state

export type matrixStates = {
    matrixDim: pos
   setMatrixDim: StateSetter<pos>
   matrix:matrixItemObject[][];
   setMatrix:StateSetter<matrixItemObject[][]>
   startEndPos:startStop;
   setStartEndPos: StateSetter<startStop>

}

export type startEndState = {
    startEndPos: startStop;
    setStartEndPos: StateSetter<startStop>
}

export type matrixNodeState = {
    matrixNodes: boolean,
    setMatrixNodes: StateSetter<boolean>
}

export type startEndPosState = {

    startEndPos: startStop,
    setStartEndPos:StateSetter<startStop>
}


