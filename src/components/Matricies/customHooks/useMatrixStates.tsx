import React, {useState} from 'react'
import { matrixItemObject } from '../../types/objects';
import { createNewMatrix } from '../MatrixBanner/Remote/utils/graphUtils';
import { pos, startStop } from '../../types/positions';

type matrixStates = {
   matrixNodes:boolean;
   setMatrixNodes: React.Dispatch<React.SetStateAction<boolean>>;
   matrixDim: pos
   setMatrixDim: React.Dispatch<React.SetStateAction<pos>>
   matrix:matrixItemObject[][];
   setMatrix:React.Dispatch<React.SetStateAction<matrixItemObject[][]>>
   startEndPos:startStop;
   setStartEndPos: React.Dispatch<React.SetStateAction<startStop>>;
}

const useMatrixStates = ():matrixStates => {
    
    const [matrixNodes, setMatrixNodes] = useState<boolean>(true); //true === matrix, false === nodes
    const [matrixDim, setMatrixDim]  = useState<pos>({y: 20, x: 20});
    const [matrix, setMatrix] = useState<matrixItemObject[][]>(createNewMatrix(matrixDim.y, matrixDim.x));
    const [startEndPos, setStartEndPos] = useState<startStop>({start:{y: -1, x: -1}, end: {y: -1, x: -1}})

    return {
        matrixNodes, 
        setMatrixNodes,
        matrixDim, 
        setMatrixDim,
        matrix, 
        setMatrix,
        startEndPos, 
        setStartEndPos
    }
}

export default useMatrixStates
