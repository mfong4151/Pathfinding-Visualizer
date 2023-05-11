
import { matrixItemObject } from "../../../types/objects";
import Heap from "heap-js";
import DIRS from "./dirs";
import { MatrixItterator } from "./matrixItterator";

type starHeapItem = [number, number, number, matrixItemObject]

export class AStar extends MatrixItterator{
    public open: Heap<starHeapItem>;
 


    constructor(start:number[], end:number[], matrix:matrixItemObject[][]){
        super(start, end, matrix)
        const top: matrixItemObject = {pos:this.start, prev: [-1, -1]};
        this.open = new Heap();
        const initG = this.calculateG();
        const initH = this.calculateH();
        const initF = this.calculateF();
        Heap.heappush(this.open, [initF, initG, initH, top])
    }

    private calculateG(currPos:number[], endPos: number[]):number{
        return 0;
    }
    private calculateH(currPos:number[], endPos: number[]):number{
        return 0;
    }
    private calculateF(currPos:number[], endPos: number[]):number{
        return 0;
    }

    private pythagoreanHeuristic(nodePos:number[]):number{
        //gut this out for the pythagorean version
        const [x1, y1] = nodePos;
        const [x2, y2] = this.end;
        return Math.abs(y2 - y1) + Math.abs (x2 - x1)
    }


    public preformFullAlgo(): matrixItemObject[] {
        
       

        return this.res
    }

    
    public isValidNext():boolean {
        if (this.open.heapArray.length <= 0) return false;
        const top:matrixItemObject = this.open.top(1)[0][1];
        if (this.outOfRangeOrVisited(top.pos[0], top.pos[1])) return false;
        return true;
    }

    public discardInvalidNode():number[]{
        const node: matrixItemObject = this.open.top(1)[0][1];
        Heap.heappop(this.open);
        return node.pos
    }

    public next():number[]{
        if(this.open.length <= 0) return []

    

        if (this.endFound){
            this.markEndPrev(curr, x, y)
        }


        return pos;
    }

    public isContainerEmpty():boolean{
        return !(this.open.heapArray.length > 0)
    }

    public showContainer():number[][]{
        const open:number[][] = [];

        for(const i of this.open) open.push(i[1].pos)
        
        return open
    }
}