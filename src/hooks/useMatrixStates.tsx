import React, {useState} from 'react'
import { matrixItemObject } from '../types/objects';
import { createNewMatrix } from '../components/MatrixRemote/utils/graphUtils';
import { pos, startStop } from '../types/positions';
import { StateSetter } from '../types/setState';

type matrixStates = {
   matrixDim: pos;
   setMatrixDim: StateSetter<pos>;
   matrix:matrixItemObject[][];
   setMatrix:StateSetter<matrixItemObject[][]>;
   startEndPos:startStop;
   setStartEndPos: StateSetter<startStop>;
}
const DEFAULT_MATRIX_Y:number = 30;
const DEFAULT_MATRIX_X:number = 30;
const DEFAULT_POS:number = -1;

const useMatrixStates = ():matrixStates => {
    
    const [matrixDim, setMatrixDim]  = useState<pos>({y: DEFAULT_MATRIX_Y, x: DEFAULT_MATRIX_X});
    const [matrix, setMatrix] = useState<matrixItemObject[][]>(createNewMatrix(matrixDim.y, matrixDim.x));
    const [startEndPos, setStartEndPos] = useState<startStop>({start:{y: DEFAULT_POS, x: DEFAULT_POS}, end: {y: DEFAULT_POS, x: DEFAULT_POS}})

    return {
        matrixDim, 
        setMatrixDim,
        matrix, 
        setMatrix,
        startEndPos, 
        setStartEndPos
    }
}

export default useMatrixStates
