import { pos } from "../../types/positions";

export interface Props{
    pos:pos;
    hasNode: boolean;
    canvasItemDim: { 
      width: number;
      height: number
    }
  }