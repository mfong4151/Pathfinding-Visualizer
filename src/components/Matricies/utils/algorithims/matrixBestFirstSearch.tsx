import { matrixHeuristicSearch } from "./matrixHeuristicSearch";
import { matrixItemObject } from "../../../types/objects";
import Heap from "heap-js";
import DIRS from "./dirs";


export class MatrixBestFirstSearch extends matrixHeuristicSearch{

    constructor(start:number[], end:number[], matrix:matrixItemObject[][]){
        super(start, end, matrix)
        const first: matrixItemObject = {pos:this.start, prev: [-1, -1]}
        Heap.heappush(this.open, [this.calculateHeuristic(first.pos), first])
    }

    public calculateHeuristic(nodePos:number[]):number{
        const [x1, y1] = nodePos;
        const [x2, y2] = this.end;
        return Math.abs(y2 - y1) + Math.abs (x2 - x1)
    }

    public test():void{

        return 
    }

    public preformFullAlgo(): matrixItemObject[] {
        let currPair: [number, matrixItemObject];

        while (this.open.length){
            currPair = Heap.heappop(this.open)!
            const {pos, prev} = currPair[1]
            const [x, y] = pos;
            this.res.push(pos)
    
            for(const [dx, dy] of DIRS){
                
                const next:matrixItemObject = {pos:[x + dx, y + dy] , prev:pos} //need to calculate the object 
                Heap.heappush(this.open, [this.calculateHeuristic(pos), next])
    
            }
        }
       



        return this.res;
    }
}