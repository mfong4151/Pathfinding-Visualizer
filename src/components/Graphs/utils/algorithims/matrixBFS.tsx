import { pathObject } from "../../../types/classes";
import { MatrixItterator } from "../../../utils/itterators";
import DIRS from "./dirs";




export class BFSItteratorMatrix extends MatrixItterator{
    protected q: pathObject[]  

    constructor(start:number[], end:number[], matrix:string[][] ){
        super(start,end, matrix)
        this.q = [{node: start, path:[start]}];
        this.visited.add(`${start[0]},${start[1]}`)
        this.end = end;
        this.prev = [-1, -1];
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

    public next(): void{
        if(this.q.length <= 0) return //do i need this line?

        const {node, path} = this.q.shift()!;
        this.prev = node;
        const y: number = node[1];
        const x: number = node[0];
        const cords: string = `${x},${y}`;
        this.visited.add(cords)
        
        if (!this.isStart(node)) this.matrix[y][x] = 'v'

        const newPath: number[][] = [...path, [x, y]]

        //load the queue
        for (const [dx, dy] of DIRS) {
            const newPos = [x + dx, y + dy]
            this.q.push({node: newPos, path: newPath} );

        }
        

        return;
    }

    public isEnd(): boolean{
        if (this.q.length === 0) return true;
        if (this.q[0].node[0] === this.end[0] && this.q[0].node[1] !== this.end[1]) return false;
        return true;
    }
    
    //used for changing colors on past squares
    // public reanimatePastChanges(){

    // }
}

