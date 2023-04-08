import React, {useState} from 'react'
import { matrixItemObject } from '../../types/objects';
import { createNewMatrix } from '../MatrixBanner/Remote/utils/graphUtils';
import { pos, startStop } from '../../types/positions';

type matrixStates = {

   matrixDim: pos
   setMatrixDim: React.Dispatch<React.SetStateAction<pos>>
   matrix:matrixItemObject[][];
   setMatrix:React.Dispatch<React.SetStateAction<matrixItemObject[][]>>
   startEndPos:startStop;
   setStartEndPos: React.Dispatch<React.SetStateAction<startStop>>;
}

const useMatrixStates = ():matrixStates => {
    
    const [matrixDim, setMatrixDim]  = useState<pos>({y: 30, x: 30});
    const [matrix, setMatrix] = useState<matrixItemObject[][]>(createNewMatrix(matrixDim.y, matrixDim.x));
    const [startEndPos, setStartEndPos] = useState<startStop>({start:{y: -1, x: -1}, end: {y: -1, x: -1}})

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
