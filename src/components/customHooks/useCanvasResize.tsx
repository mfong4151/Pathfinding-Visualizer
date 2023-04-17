import React, { SetStateAction, useEffect } from 'react';
import { matrixItemObject } from '../types/objects';
import { calculateResize } from '../utils/resizeCanvas';
import { pos } from '../types/positions';
import { startStop } from '../types/positions';
import { transplantMatrix } from '../Matricies/MatrixBanner/MatrixRemote/utils/graphUtils';

const useCanvasResize = (pageRightDiv:HTMLDivElement, matrixDiv:HTMLDivElement, matrixDim:pos, 
        startEndPos: startStop, setMatrix: React.Dispatch<SetStateAction<matrixItemObject[][]>>, 
        setStartEndPos: React.Dispatch<SetStateAction<startStop>>, dependancies:any[]):void => {

  useEffect(() => {
    // const pageRightDiv = pageRightRef.current!;
    // const matrixDiv = matrixRef.current!;

    if (!pageRightDiv && !matrixDiv) return;

    const [rows, cols]: [number, number] = calculateResize(matrixDim, pageRightDiv, matrixDiv);
    const [newMatrix, newStartEnd]: [matrixItemObject[][], startStop] = transplantMatrix(rows, cols, startEndPos);

    setMatrix(newMatrix);
    setStartEndPos(newStartEnd);
  }, dependancies);
}

export default useCanvasResize;