export class MatrixItterator{
    protected dirs: number[][];
    protected res: number[];
    protected visited: Set<string>;
    protected matrix:string[][];
    protected rows:number;
    protected cols:number;
    protected end: number[];

    constructor(start:number[], end:number[], matrix:string[][]){
        this.end = end;
        this.res = [];
        this.visited = new Set();
        this.matrix = matrix;
        this.rows = matrix.length;
        this.cols = matrix[0].length;
        this.dirs = [[0, 1], [1, 0], [-1, 0], [0, -1]];

    }

    public isValidNext():boolean {

        return true;
    }

    public next(): number[]{
        return [-1, -1]
    }

    public isEnd():boolean{
        
        return true

    }
    public reanimatePastChanges(): string[][]{
        return this.matrix;
    }

}


