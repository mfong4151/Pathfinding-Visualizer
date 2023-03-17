export const createNewMatrix = (numRows :Number, numCols :Number, filler: string = '') : Array<Array<string>> =>{
    const matrix = []
    let newRow;

    for(let i: number = 0; i < numRows; i++){
        newRow = []
        for(let j: number = 0; j < numCols; j++) newRow.push(filler)
        matrix.push(newRow)
    }
    return matrix;
}