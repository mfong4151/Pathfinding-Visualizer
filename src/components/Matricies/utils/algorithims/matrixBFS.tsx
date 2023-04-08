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
        const x:number =  first.pos[0];
        const y:number =  first.pos[1];
        const pos: string = `${x},${y}`;
        
        
        if( this.visited.has(pos) || 
            x < 0 || x >= this.cols ||
            y< 0 || y >= this.rows || 
            this.matrix[y][x].val === 'w'
            )
    
            return false;
            
        return true;
    }
    
    public discardInvalidNode():number[]{
        const node: matrixItemObject = this.q.shift()!
        return node.pos
    }

    public next():number[]{
        if(this.q.length <= 0) return []
        
        const curr:matrixItemObject = this.q.shift()!;
        const {pos, prev} = curr;
        this.prev = pos;
        const y: number = pos[1];
        const x: number = pos[0];

        this.visited.add(`${x},${y}`)

        if(!this.isStart(curr.pos) && !(this.isEnd(curr.pos))) this.matrix[y][x] = curr;
        if (this.isEnd(pos)) this.endFound = true;

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

    public isEnd(node:number[]): boolean{

        if (node[0] === this.end[0] && node[1] === this.end[1]) return true;
        return false;
    }
    
    public preformFullAlgo():matrixItemObject[]{
        while (!this.isQueueEmpty()) {
            const curr:matrixItemObject = this.q.shift()!;
            const x: number = curr.pos[0];
            const y: number = curr.pos[1];
            const visitedPos: string = `${x},${y}`;
            if( this.visited.has(visitedPos) || x < 0 || x >= this.cols ||  y< 0 || y >= this.rows || this.matrix[y][x].val === 'w') continue
            

            this.visited.add(visitedPos)
            this.res.push(curr)
            
            
            if (this.isEnd(curr.pos)){
                this.matrix[y][x] = {val: 'e', prev:curr.prev}
                this.endFound = true;
                break;
            }
            if(!this.isStart(curr.pos)) 
                this.matrix[y][x] = {val: '', prev:curr.prev}
            
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

    //used for changing colors on past squares
    // public reanimatePastChanges(){

    // }
}

