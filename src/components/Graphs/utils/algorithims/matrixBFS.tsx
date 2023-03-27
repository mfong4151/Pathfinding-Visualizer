import DIRS from "./dirs";

export class BFSItteratorMatrix{
    res: number[] = [];
    visited = new Set<string>();
    q: number[][];
    matrix:string[][];
    rows:number;
    cols:number;
    end: number[]

    constructor(start:number[], end:number[], matrix:string[][] ){
        this.q = [start];
        this.end = end;
        this.res = [];
        this.visited = new Set();
        this.matrix = matrix;
        this.rows = matrix.length;
        this.cols = matrix[0].length;
    }

    isValidNext(){
        if (this.q.length < 0) return false;

        const node:number[]= this.q[0];
        const x:number = node[0];
        const y:number=  node[1];
        const pos: string = `${y},${x}`;
        
        if(this.visited.has(pos) ||x < 0 || y< 0 || x >= this.cols || y >= this.rows) return false;

        return true;
    }

    next(){
        if(this.q.length <= 0)return []

        const node:number[] = this.q.shift()!;
        this.visited.add(`${node[1]},${node[0]}`)
        for (const dir of DIRS){
            this.q.push([node[0] + dir[0], node[1] + dir[1]]);
        }

        return node;
    }
    
    //used for changing colors on past squares
    reanimatePastChanges(){

    }
}

