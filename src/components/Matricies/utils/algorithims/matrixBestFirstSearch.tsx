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

    
    public isValidNext():boolean {
        if (this.open.heapArray.length <= 0) return false;
        const first = this.open.top(1)[0][1]
        if (this.outOfRangeOrVisited(first.pos[0], first.pos[1])) return false;
        return true;
    }

    public discardInvalidNode():number[]{
        const node: matrixItemObject = this.open.top(1)[0][1]
        Heap.heappop(this.open);
        return node.pos
    }

    public next():number[]{
        if(this.open.length <= 0) return []

        const currPair: minHeapItem = this.open.pop()!         
        const curr = currPair[1]
        const {pos} = curr;
        this.prev = pos;
        const y: number = pos[1];
        const x: number = pos[0];

        this.visited.add(`${x},${y}`)
        this.assignValueToMatrix(curr, x, y)
        this.evaluateEnd(curr)

        if (this.endFound){
            this.markEndPrev(curr, x, y)
        }

        //load the queue
        for (const [dx, dy] of DIRS) {
            const newPos = [x + dx, y + dy]
            const next: matrixItemObject = {pos: newPos, prev:pos} 
            const cost = this.manhattanHeuristic(newPos);
            Heap.heappush(this.open, [cost, next]);
        }
        

        return pos;
    }

    public isContainerEmpty():boolean{
        return !(this.open.heapArray.length > 0)
    }

    public showContainer():number[][]{
        const open:number[][] = [];

        for(const i of this.open)open.push(i[1].pos)
        
        return open
    }
}