// const aStar = (
//     start: Cell,
//     end: Cell,
//     matrix: number[][],
//     heuristic: Heuristic
//   ): Cell[] => {
//     const rows = matrix.length;
//     const cols = matrix[0].length;
//     const visited: boolean[][] = new Array(rows)
//       .fill(false)
//       .map(() => new Array(cols).fill(false));
//     const openSet: Node[] = [
//       {
//         row: start.row,
       
import { matrixHeuristicSearch, minHeapItem } from "./matrixHeuristicSearch";
import { matrixItemObject } from "../../../types/objects";
import Heap from "heap-js";
import DIRS from "./dirs";


export class AStar extends matrixHeuristicSearch{

    constructor(start:number[], end:number[], matrix:matrixItemObject[][]){
        super(start, end, matrix)
        const top: matrixItemObject = {pos:this.start, prev: [-1, -1]};
        Heap.heappush(this.open, [this.manhattanHeuristic(top.pos), top])
    }

    public manhattanHeuristic(nodePos:number[]):number{
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

        const currPair: minHeapItem = this.open.pop()!         
        const curr:matrixItemObject = currPair[1];
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
            const newPos:[number, number] = [x + dx, y + dy];
            const next: matrixItemObject = {pos: newPos, prev:pos} ;
            const cost = this.manhattanHeuristic(newPos);
            Heap.heappush(this.open, [cost, next])
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