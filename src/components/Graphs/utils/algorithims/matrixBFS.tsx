import { MatrixItterator } from "../../../utils/itterator";
import DIRS from "./dirs";



export class BFSItteratorMatrix extends MatrixItterator{
    private q: number[][];


    constructor(start:number[], end:number[], matrix:string[][] ){
        super(start,end, matrix)
        this.q = [start];
        this.end = end;
    }

    public isValidNext():boolean{
        if (this.q.length < 0) return false;

        const x:number =  this.q[0][0];
        const y:number=  this.q[0][1];
        const pos: string = `${x},${y}`;
        
        if( this.visited.has(pos) || 
            x < 0 || y< 0 || x >= this.cols || y >= this.rows || 
            this.matrix[y][x] === 'w') 
            
            return false;

        return true;
    }

    public next(): number[]{
        if(this.q.length <= 0)return []

        const node:number[] = this.q.shift()!;
        this.visited.add(`${node[0]},${node[1]}`)
        this.prev = node;
        for (const dir of DIRS)  this.q.push([node[0] + dir[0], node[1] + dir[1]]);
        

        return node;
    }

    public isEnd(): boolean{
        if (this.q.length === 0) return true;
        if (this.q[0][0] === this.end[0] && this.q[0][1] !== this.end[1]) return false;
        return true;
    }
    
    //used for changing colors on past squares
    // public reanimatePastChanges(){

    // }
}

