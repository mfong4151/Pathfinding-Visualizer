import { matrixItemObject } from "../../types/objects";



export const createNewMatrix = (numRows :Number, numCols :Number) : matrixItemObject[][] =>{
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