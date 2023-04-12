import { matrixItemObject } from "../../../../types/objects";
import { DFSItterMatrix } from "../../../utils/algorithims/matrixDFS";
import { itterator } from "../../../../types/itterator";
import { BestFSItterMatrix } from "../../../utils/algorithims/matrixBestFirstSearch";

export const createNewMatrix = (numRows :number, numCols :number) : matrixItemObject[][] =>{
    const matrix = []
    let newRow;
    let id= 0;
    for(let i: number = 0; i < numRows; i++){
        newRow = []
        for(let j: number = 0; j < numCols; j++) {
            const newMatrixItemObject: matrixItemObject = {id:-1, val:'',  prev: [-2, -2] }
            newRow.push(newMatrixItemObject)
        }
        matrix.push(newRow)
    }
    return matrix;
}

export const inShortestPathExclusions = (activeIttr:itterator):boolean =>(
    activeIttr instanceof DFSItterMatrix || activeIttr instanceof BestFSItterMatrix
 )
