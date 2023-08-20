import React, { useEffect } from 'react';
import { matrixItemObject } from '../types/objects';
import { calculateResize } from '../utils/resizeCanvas';
import { pos } from '../types/positions';
import { startStop } from '../types/positions';
import { transplantMatrix } from '../components/MatrixBanner/MatrixRemote/utils/graphUtils';
import { setMatItemObjMatrix, setStartStop } from '../types/setState';


//Matrix refers to the matrix that is displayed on the page. This could be the canvas matrix, or for matricies the matrix itself.
const useCanvasResize = (pageRightDiv:HTMLDivElement, matrixDiv:HTMLDivElement, matrixDim:pos, 
        startEndPos: startStop, setMatrix: setMatItemObjMatrix, 
        setStartEndPos:setStartStop, dependancies:any[]= []):void => {
    
  useEffect(() => {


    if (!pageRightDiv && !matrixDiv) return;

    const [rows, cols]: [number, number] = calculateResize(matrixDim, pageRightDiv, matrixDiv);
    const [newMatrix, newStartEnd]: [matrixItemObject[][], startStop] = transplantMatrix(rows, cols, startEndPos);

    setMatrix(newMatrix);
    setStartEndPos(newStartEnd);
  }, dependancies);
}




export default useCanvasResize;
