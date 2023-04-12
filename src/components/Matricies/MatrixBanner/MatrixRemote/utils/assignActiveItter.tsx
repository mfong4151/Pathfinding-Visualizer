import { startStop } from "../../../../types/positions";
import { BFSItterMatrix } from "../../../utils/algorithims/matrixBFS";
import { DFSItterMatrix } from "../../../utils/algorithims/matrixDFS";
import { itterator } from "../../../../types/itterator";
import { matrixItemObject } from "../../../../types/objects";
import { BiBFSItterMatrix } from "../../../utils/algorithims/matrixBidirectionalBFS";
import { BestFSItterMatrix } from "../../../utils/algorithims/matrixBestFirstSearch";

const assignActiveItterator = (chosenAlgo:string, startEndPos: startStop, matrix: matrixItemObject[][]) =>{
    
    let itter: itterator
    const start: number[] = [startEndPos.start.x, startEndPos.start.y]
    const end: number[] = [startEndPos.end.x, startEndPos.end.y]

    switch(chosenAlgo) {
      case 'BFS':
        itter = new BFSItterMatrix(start, end, matrix);
        break
      case 'DFS':
        itter = new DFSItterMatrix(start, end, matrix);
        break
      case 'Best First Search':
        itter = new BestFSItterMatrix(start, end, matrix);
        break
      case 'Bidirectional BFS':
        itter = new BiBFSItterMatrix(start, end, matrix);
        break

      default:
        itter = null
        break
    }

    return itter
}

export default assignActiveItterator;