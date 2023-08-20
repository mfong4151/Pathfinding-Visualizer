import { itterator } from "../../../../types/itterator";
import convertContainer from "./convertContainer";
import { BestFSItterMatrix, DFSItterMatrix, BFSItterMatrix, BiBFSItterMatrix } from "../../../Matricies/algorithims";
import { matrixItemObject } from "../../../../types/objects";

export const forwardConsoleMsgs = (activeIttr:itterator):string[]=> {
      
    const res:string[] =[];
    if (activeIttr instanceof BFSItterMatrix) res.push(`Queue: ${convertContainer(activeIttr.q)}`)
    else if (activeIttr instanceof DFSItterMatrix) res.push(`Stack: ${convertContainer(activeIttr.stack)}`)
    else if (activeIttr instanceof BestFSItterMatrix){
      const heapCopy:matrixItemObject[] = []
      for(const pair of [...activeIttr.open.heapArray]) heapCopy.push(pair[1])
      res.push(`Heap: ${convertContainer(heapCopy)}`)
      
    } 
    
    return res

  }