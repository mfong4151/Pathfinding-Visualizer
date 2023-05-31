import React, {useState} from 'react'
import { matrixItemObject } from '../types/objects';
import { createNewMatrix } from '../Matricies/MatrixBanner/MatrixRemote/utils/graphUtils';
import { pos, startStop } from '../types/positions';

type matrixStates = {

   matrixDim: pos
   setMatrixDim: React.Dispatch<React.SetStateAction<pos>>
   matrix:matrixItemObject[][];
   setMatrix:React.Dispatch<React.SetStateAction<matrixItemObject[][]>>
   startEndPos:startStop;
   setStartEndPos: React.Dispatch<React.SetStateAction<startStop>>;
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
