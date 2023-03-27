import { MatrixItterator } from "../../../utils/itterator";
import DIRS from "./dirs";

export class BFSItteratorMatrix extends MatrixItterator{
    private q: number[][];


    constructor(start:number[], end:number[], matrix:string[][] ){
        super(start,end, matrix)
        this.q = [start];
 
    }

    public isValidNext():boolean{
        if (this.q.length < 0) return false;

        const node:number[]= this.q[0];
        const x:number = node[0];
        const y:number=  node[1];
        const pos: string = `${y},${x}`;
        
        if(this.visited.has(pos) ||x < 0 || y< 0 || x >= this.cols || y >= this.rows) return false;

        return true;
    }

    public next(): number[]{
        if(this.q.length <= 0)return []

        const node:number[] = this.q.shift()!;
        this.visited.add(`${node[1]},${node[0]}`)
        for (const dir of DIRS){
            this.q.push([node[0] + dir[0], node[1] + dir[1]]);
        }

        return node;
    }
    
    //used for changing colors on past squares
    // public reanimatePastChanges(){

    // }
}

