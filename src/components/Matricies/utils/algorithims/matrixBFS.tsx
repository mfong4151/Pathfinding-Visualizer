import { matrixItemObject } from "../../../types/objects";
import { MatrixItterator } from "./matrixItterator";
import DIRS from "./dirs";




export class BFSItteratorMatrix extends MatrixItterator{
    public q: matrixItemObject[]  

    constructor(start:number[], end:number[], matrix:matrixItemObject[][] ){
        super(start,end, matrix)
        this.q = [{pos: start, prev: this.prev}];
    }


    public isValidNext():boolean{
        if (this.q.length < 0) return false;
        const first = this.q[0]
        if (this.outOfRangeOrVisited(first.pos[0], first.pos[1]) )return false;            
        return true;
    }
    
    public discardInvalidNode():number[]{
        const node: matrixItemObject = this.q.shift()!
        return node.pos
    }

    public next():number[]{
        if(this.q.length <= 0) return []
        
        const curr:matrixItemObject = this.q.shift()!;
        const {pos} = curr;
        this.prev = pos;
        const y: number = pos[1];
        const x: number = pos[0];

        this.visited.add(`${x},${y}`)

        this.assignValueToMatrix(curr, x, y)
        this.evaluateEnd(curr)

        //load the queue
        for (const [dx, dy] of DIRS) {
            const newPos = [x + dx, y + dy]
            this.q.push({pos: newPos, prev:pos} );
        }
        

        return pos;
    }

    public isQueueEmpty():boolean{
        return !(this.q.length > 0)
    }

  
    
    public preformFullAlgo():matrixItemObject[]{
        while (!this.isQueueEmpty()) {
            const curr:matrixItemObject = this.q.shift()!;
            const x: number = curr.pos[0];
            const y: number = curr.pos[1];

            if (this.outOfRangeOrVisited(x, y)) continue;
            
            //Keep track of visited spaces in set
            this.visited.add(`${x},${y}`);
            //push next item on to res
            this.res.push(curr);
            
            //Exit loop if we find the end
            
            if (this.isEnd(curr.pos)){
                this.matrix[y][x] = {val: 'e', prev:curr.prev}
                this.endFound = true;
                break;
            }

            if(!this.isStart(curr.pos))  this.matrix[y][x] = {val: '', prev:curr.prev}
            
            for (const [dx, dy] of this.dirs) {
                this.q.push({pos:[x + dx, y + dy], prev: curr.pos})
            }
        }

            return this.res;
    }

    public showContainer():number[][]{
        const q:number[][] = [];

        for(const i of this.q)q.push(i.pos)
        
        return q
    }

}

