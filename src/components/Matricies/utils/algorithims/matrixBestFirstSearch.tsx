import { matrixHeuristicSearch, minHeapItem } from "./matrixHeuristicSearch";
import { matrixItemObject } from "../../../types/objects";
import Heap from "heap-js";
import DIRS from "./dirs";


export class BestFSItterMatrix extends matrixHeuristicSearch{

    constructor(start:number[], end:number[], matrix:matrixItemObject[][]){
        super(start, end, matrix)
        const first: matrixItemObject = {pos:this.start, prev: [-1, -1]}
        Heap.heappush(this.open, [this.manhattanHeuristic(first.pos), first])
    }

    public manhattanHeuristic(nodePos:number[]):number{
        const [x1, y1] = nodePos;
        const [x2, y2] = this.end;
        return Math.abs(y2 - y1) + Math.abs (x2 - x1)
    }

    public discardInvalidNode():number[]{

        return [-1, -1]
    }

    public next():number[]{
   
        return [-1, -1]
    }

    public preformFullAlgo(): matrixItemObject[] {
        
        while (this.open.length){
            
            const currPair: minHeapItem = this.open.pop()! //figure out how to type this later
            const curr = currPair[1]
            const {pos, prev} = curr
            const [x, y] = pos;

            if (this.outOfRangeOrVisited(x, y)) continue
            this.visited.add(`${x},${y}`)
            this.res.push(curr)
            
            this.evaluateEnd(curr)
            if (this.endFound){
                this.markEndPrev(curr, x, y)
                break;
            }

            for(const [dx, dy] of DIRS){
                const next:matrixItemObject = {pos:[x + dx, y + dy] , prev:pos} 
                this.open.push([this.manhattanHeuristic([x + dx, y + dy]), next])
    
            }
        }
       

        return this.res;
    }
}