import { matrixHeuristicSearch } from "./matrixHeuristicSearch";
import { matrixItemObject } from "../../../types/objects";
import Heap from "heap-js";


export class matrixBestFirstSearch extends matrixHeuristicSearch{

    constructor(start:number[], end:number[], matrix:matrixItemObject[][]){
        super(start, end, matrix)
        const first: matrixItemObject = {pos:this.start, prev: [-1, -1]}
        Heap.heappush(this.open, [this.calculateHeuristic(first), first])
    }

    public calculateHeuristic(node:matrixItemObject):number{
        const [x1, y1] = node.pos;
        const [x2, y2] = this.end;
        return Math.abs(y2 - y1) + Math.abs (x2 - x1)
    }

    public preformFullAlgo(): matrixItemObject[] {
        let curr: [number, matrixItemObject];

        curr = Heap.heappop(this.open)!

        
        



        return this.res;
    }
}