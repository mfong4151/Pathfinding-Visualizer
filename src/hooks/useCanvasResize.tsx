import React, { useEffect } from 'react';
import { matrixItemObject } from '../types/objects';
import { calculateResize } from '../utils/resizeCanvas';
import { pos } from '../types/positions';
import { startStop } from '../types/positions';
import { transplantMatrix } from '../components/MatrixRemote/utils/graphUtils';
import { StateSetter } from '../types/setState';


//Matrix refers to the matrix that is displayed on the page. This could be the canvas matrix, or for matricies the matrix itself.
const useCanvasResize = (matHolderDiv:HTMLDivElement, matrixDiv:HTMLDivElement, matrixDim:pos, 
        startEndPos: startStop, setMatrix: StateSetter<matrixItemObject[][]>, 
        setStartEndPos:StateSetter<startStop>, dependancies:any[]= []):void => {
    
  useEffect(() => {


    if ( !matrixDiv) return;

    const [rows, cols]: [number, number] = calculateResize(matrixDim, matrixDiv, matHolderDiv )
    const [newMatrix, newStartEnd]: [matrixItemObject[][], startStop] = transplantMatrix(rows, cols, startEndPos);

    setMatrix(newMatrix);
    setStartEndPos(newStartEnd);
  }, dependancies);
}




export default useCanvasResize;
