import { pathObject } from "../../../types/classes";
import { matrixItemObject } from "../../../types/objects";
import { MatrixItterator } from "../../../utils/itterators";
import DIRS from "./dirs";




export class BFSItteratorMatrix extends MatrixItterator{
    public q: pathObject[]  

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
    
    public discardInvalidNode():void{
        this.q.shift()

    }

    public next():number[]{
        if(this.q.length <= 0) return []

        const {pos, prev} = this.q.shift()!;
        this.prev = pos;
        const y: number = pos[1];
        const x: number = pos[0];
        const cords: string = `${x},${y}`;
        this.visited.add(cords)
        

        //load the queue
        for (const [dx, dy] of DIRS) {
            const newPos = [x + dx, y + dy]
            this.q.push({pos: newPos, prev:pos} );
        }
        

        return pos;
    }

    public isEnd(node:number[]): boolean{

        if ( (this.q.length === 0) || node[0] === this.end[0] && node[1] === this.end[1]) return true;
        return false;
    }
    
    public preformFullAlgo():pathObject[]{
        while (this.q.length > 0) {
            const node:pathObject = this.q.shift()!;
            const x: number = node.pos[0];
            const y: number = node.pos[1];
            const visitedPos: string = `${x},${y}`;
            if( this.visited.has(visitedPos) || x < 0 || x >= this.cols ||  y< 0 || y >= this.rows || this.matrix[y][x].val === 'w'        ) continue
            
            this.visited.add(visitedPos)
            this.res.push(node)
            

            if (node.pos[0] === this.end[0]&& node.pos[1] === this.end[1]) break;
            
            for (const [dx, dy] of this.dirs) {
                this.q.push({pos:[x + dx, y + dy], prev: node.pos})
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

