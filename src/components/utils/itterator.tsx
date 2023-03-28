export class MatrixItterator{
    protected dirs: number[][];
    protected res: number[];
    protected visited: Set<string>;
    protected matrix:string[][];
    protected rows:number;
    protected cols:number;
    protected end: number[];
    protected path: number[];
    protected prev: number[];

    constructor(start:number[], end:number[], matrix:string[][]){
        this.end = end;
        this.path = [];
        this.res = [];
        this.visited = new Set();
        this.matrix = matrix;
        this.rows = matrix.length;
        this.cols = matrix[0].length;
        this.dirs = [[0, 1], [1, 0], [-1, 0], [0, -1]];
        this.prev = [-1, -1];
    }
    

    //meant to be overridden, used as a reference.
    //All these calsses should exist on the child classes
    public isValidNext():boolean {

        return true;
    }

    public next(): number[]{
        return [-1, -1]
    }

    public isEnd():boolean{
        
        return true;

    }
    public reanimatePastChanges(): string[][]{
        return this.matrix;
    }

}


