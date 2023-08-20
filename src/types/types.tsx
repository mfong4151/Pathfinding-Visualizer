import { pos } from "./positions";

export type canvasMatrixObject = {
    pos: pos
    hasNode: boolean;
    canvasItemDim: {
        width: number,
        height: number
    }
}


export type canItemDims= {
    width: number,
    height: number
    
} 