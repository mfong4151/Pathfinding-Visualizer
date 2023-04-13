import { matrixItemObject } from "../../../../types/objects";
import { DFSItterMatrix } from "../../../utils/algorithims/matrixDFS";
import { itterator } from "../../../../types/itterator";
import { BestFSItterMatrix } from "../../../utils/algorithims/matrixBestFirstSearch";
import { startStop } from "../../../../types/positions";

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

export const transplantMatrix = (numRows: number, numCols: number, startEndPos: startStop): [matrixItemObject[][], startStop] =>{
    
    const newMatrix = createNewMatrix(numRows, numCols)
    const newStartEnd:startStop = {...startEndPos}

    for(const pos of [newStartEnd.start, newStartEnd.end]){
        const replace:string = pos === newStartEnd.start ? 's': 'e'
        const x: number = pos.x;
        const y: number = pos.y;
        
        if(x < newMatrix[0].length || y < newMatrix.length){

            
        }else{
            newMatrix[y][x].val = replace
        }
        
        
       
        // if(newStartEnd.pos.x < newMatrix.length)

    }

    return [newMatrix, newStartEnd]
}


export const inShortestPathExclusions = (activeIttr:itterator):boolean =>(
    activeIttr instanceof DFSItterMatrix || activeIttr instanceof BestFSItterMatrix
 )

