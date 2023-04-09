import { canvasMatrixObject, canItemDims } from "../../../interface/types";


export const generateDefaultCanvas = (canvasWidth: number, canvasHeight: number, canvasItemDim: canItemDims  ) => {
    const res: canvasMatrixObject[][] = []
    let level: canvasMatrixObject[];
    for(let i: number = 0; i < canvasHeight/canvasItemDim.height; i++){
        level = []
        for(let j: number = 0; j < canvasWidth/canvasItemDim.width; j++) level.push({pos:{y:i, x:j}, hasNode: false,canvasItemDim})
        res.push(level)
    }

    return res;
}