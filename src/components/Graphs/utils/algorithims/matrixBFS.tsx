import { pathObject } from "../../../types/classes";
import { matrixItemObject } from "../../../types/objects";
import { MatrixItterator } from "../../../utils/itterators";
import DIRS from "./dirs";




export class BFSItteratorMatrix extends MatrixItterator{
    public q: pathObject[]  

    constructor(start:number[], end:number[], matrix:matrixItemObject[][] ){
        super(start,end, matrix)
        this.q = [{node: start, prev: this.prev}];
    }


    public isValidNext():boolean{
        if (this.q.length < 0) return false;
        const first = this.q[0]
        const x:number =  first.node[0];
        const y:number =  first.node[1];
        const pos: string = `${x},${y}`;
        
        
        if( this.visited.has(pos) || 
            x < 0 || x >= this.cols ||
            y< 0 || y >= this.rows || 
            this.matrix[y][x] === 'w'
            )
    
            return false;
            
        return true;
    }
    
    public discardInvalidNode():void{
        this.q.shift()

    }

    public next():number[]{
        if(this.q.length <= 0) return []

        const {node, prev} = this.q.shift()!;
        this.prev = node;
        const y: number = node[1];
        const x: number = node[0];
        const cords: string = `${x},${y}`;
        this.visited.add(cords)


        //load the queue
        for (const [dx, dy] of DIRS) {
            const newPos = [x + dx, y + dy]
            this.q.push({node: newPos, prev:node} );
        }
        

        return node;
    }

    public isEnd(node:number[] = [-1, -1]): boolean{


        if ( (this.q.length === 0) || node[0] === this.end[0] && node[1] === this.end[1]) return true;
        return false;
    }
    
    public showContainer():number[][]{
        const q:number[][] = [];

        for(const i of this.q)q.push(i.node)
        
        return q
    }

    //used for changing colors on past squares
    // public reanimatePastChanges(){

    // }
}

