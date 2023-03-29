import { pathObject } from "../types/classes";
import { matrixItemObject } from "../types/objects";

export class MatrixItterator{
    protected dirs: number[][];
    protected visited: Set<string>;
    public matrix:matrixItemObject ;
    public rows:number;
    public cols:number;
    public end: number[];
    public start: number[];
    public prev: number[];
    public res: number[];
    
    constructor(start:number[], end:number[], matrix:matrixItemObject ){
        this.end = end;
        this.res = [];
        this.prev = [-1, -1];
        this.start = start
        this.visited = new Set();
        this.matrix = matrix;
        this.rows = matrix.length;
        this.cols = matrix[0].length;
        this.dirs = [[0, 1], [1, 0], [-1, 0], [0, -1]];
    }
    

    //meant to be overridden, used as a reference.
    //All these methods should exist on the child classes
    public isValidNext():boolean {

        return true;
    }

    public showContainer(): number[][]{
        return [[]]
    }

    public next(){
        return 
    }

    // public isEnd(node:number):boolean{
        
    //     return true;

    // }

    //except for these, these actually do stuff

    public isStart(node:number[]):boolean{
        if (node[0] === this.start[0] && node[1] === this.start[1]) return true;
        return false

    }

    public reanimatePastChanges(): matrixItemObject {
        return this.matrix;
    }

}


