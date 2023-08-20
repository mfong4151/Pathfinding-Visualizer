import { matrixItemObject } from "../../../../types/objects";
import { itterator } from "../../../../types/itterator";
import { DFSItterMatrix, BFSItterMatrix, BestFSItterMatrix, AStar} from "../../../Matricies/algorithims";
import { startStop } from "../../../../types/positions";


export const createNewMatrix = (numRows :number, numCols :number) : matrixItemObject[][] =>{
    const matrix = []
    let newRow;

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

    //God this is an annoying edge case:
    //If the user wants to be stinky then I just decide what they're gunna look at :P
    if(newMatrix.length < 3 || newMatrix[0].length < 3){
        const newMatrix = createNewMatrix(2, 2)
        newMatrix[0][0].val = 's'
        newMatrix[1][1].val = 'e'
        newStartEnd.start.x = 0;
        newStartEnd.start.y = 0;
        newStartEnd.end.x = 1;
        newStartEnd.end.y = 1;
        
        return [newMatrix, newStartEnd]
    }

    for( const pos of [newStartEnd.start, newStartEnd.end]){
        
        const replacement:string = pos === newStartEnd.start ? 's': 'e'
        const x: number = pos.x;
        const y: number = pos.y;
        if (x === -1 || y === -1) continue
        newMatrix[Math.min(newMatrix.length - 1, y)][Math.min(newMatrix[0].length - 1, x)].val = replacement
    }

    return [newMatrix, newStartEnd]
}


export const inShortestPathExclusions = (activeIttr:itterator):boolean =>(
    activeIttr instanceof DFSItterMatrix || activeIttr instanceof BestFSItterMatrix || activeIttr instanceof AStar
 )

