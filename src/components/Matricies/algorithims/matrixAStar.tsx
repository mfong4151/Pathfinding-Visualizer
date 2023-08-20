
import { matrixItemObject } from "../../../types/objects";
import Heap from "heap-js";
import {DIRS_EIGHT} from "./dirs";
import { MatrixItterator } from "./matrixItterator";

type starHeapItem = [number, number, number, matrixItemObject]

export class AStar extends MatrixItterator{
    public open: any;

    //G cost: distance from the start
    //H cost: distance from the 
    constructor(start:number[], end:number[], matrix:matrixItemObject[][]){
        super(start, end, matrix)
        const top: matrixItemObject = {pos:this.start, prev: [-1, -1]};
        this.open = new Heap<starHeapItem>(this.compareFH);
        const initG = 0; //Initial g cost will always be 0
        const initH = this.calculateH(this.end);
        const initF = initG + initH;
        Heap.heappush(this.open, [initF, initG, initH, top])
    }

    private calculateG(currPos:number[]):number{
        return this.pythagoreanHeuristic(currPos, this.start);
    }
    private calculateH(currPos:number[]):number{
        return this.pythagoreanHeuristic(currPos, this.end);
    }
    private calculateF(g: number, h: number):number{ 
        return g + h;
    }

    private pythagoreanHeuristic(currPos:number[], destPos:number[]):number{
        const [x1, y1] = currPos as [number, number];
        const [x2, y2] = destPos as [number, number];
        return Math.floor(Math.sqrt(Math.abs(x1 - x2) ** 2 +(Math.abs(y1 - y2))) * 10);
    }


    //Comparator function for chosing onne starHeap item over the other
    //If there are any issues, it'll probably be here
    private compareFH(a: starHeapItem, b:starHeapItem):number{
        const [aF, _aG, aH] = a;
        const [bF, _bG, bH] = a;
        return aF === bF ? aH - bH : aF - bF;
    }

    public preformFullAlgo(): matrixItemObject[] {
        let ctr = 0
        while (this.open.length){
            const node = this.open.pop()!
            const [_f, _g, _h, curr]= node;
            const {pos}: matrixItemObject = curr;
            const [x, y] = pos;
            

            if (this.outOfRangeOrVisited(x, y)) continue
            this.visited.add(`${x},${y}`)
            this.res.push(curr)
            
            this.evaluateEnd(curr)

            if (this.endFound){
                this.markEndPrev(curr, x, y)
                break;
            }
            

            for(const [dx, dy] of DIRS_EIGHT){
                const nextX:number = x + dx;
                const nextY: number = y + dy
                const nextCoords:matrixItemObject = {pos:[nextX, nextY] , prev:pos} 
                const nextG:number = this.calculateG([nextX, nextY])
                const nextH:number = this.calculateH([nextX, nextY])
                const nextF:number = this.calculateF(nextG, nextH)

                this.open.push([nextF,nextG, nextH, nextCoords])
    
            }
            
            console.log(this.open.heapArray, node)
            ctr ++
            if (ctr === 5)
            break
        }
       

        return this.res
    }

    
    public isContainerEmpty():boolean{
        return !(this.open.heapArray.length > 0)
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

    


        return [1,0];
    }

    // public showContainer():number[][]{
    //     const open:number[][] = [];

    //     for(const i of this.open) open.push(i[1].pos)
        
    //     return open
    // }
}