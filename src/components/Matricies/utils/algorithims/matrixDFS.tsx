import { MatrixItterator } from "./matrixItterator";
import { matrixItemObject } from "../../../types/objects";

export class DFSItterMatrix extends MatrixItterator {
    public stack: matrixItemObject[];
    public res: matrixItemObject[];

    constructor(start: number[], end: number[], matrix: matrixItemObject[][]) {
        super(start, end, matrix);
        this.stack = [{ pos: start, prev: this.prev }];
        this.res = [];
    }

    public isValidNext(): boolean {
        if (this.stack.length <= 0) return false;
        const last = this.stack[this.stack.length - 1];
        if (this.outOfRangeOrVisited(last.pos[0], last.pos[1]) )return false;
        return true;
    }

    public discardInvalidNode(): number[] {
        const node: matrixItemObject = this.stack.pop()!
        return node.pos
     }

    public next(): number[] {
        if (this.stack.length <= 0) return [];

        const curr: matrixItemObject = this.stack.pop()!;
        const { pos } = curr;
        this.prev = pos;
        const x: number = pos[0];
        const y: number = pos[1];
        this.visited.add(`${x},${y}`);

        this.assignValueToMatrix(curr, x, y)
        this.evaluateEnd(curr)
        if (this.endFound){
            this.markEndPrev(curr, x, y)
        }
        // load the stack
        for (const [dx, dy] of this.dirs) {
            const newPos = [x + dx, y + dy];
            this.stack.push({ pos: newPos, prev: pos });
        }
        return pos;
    }

    public isContainerEmpty(): boolean {
        return !(this.stack.length > 0);
    }


    public preformFullAlgo(): matrixItemObject[] {
        while (!this.isContainerEmpty()) {
            const curr: matrixItemObject = this.stack.pop()!;
            const x: number = curr.pos[0];
            const y: number = curr.pos[1];

            if (this.outOfRangeOrVisited(x, y)) continue;

            this.visited.add(`${x},${y}`);
            this.res.push(curr);
            
            this.evaluateEnd(curr)

            if (this.endFound) {
                this.markEndPrev(curr, x, y)
                break;
            }

            if (!this.isStart(curr.pos)) this.matrix[y][x] = { val: '', prev: curr.prev };

            for (const [dx, dy] of this.dirs) {
                this.stack.push({ pos: [x + dx, y + dy], prev: curr.pos });
            }
        }
        return this.res;
    }

    public showContainer():number[][]{
        const stack:number[][] = [];
    
        for(let i = this.stack.length-1; i>=0; i--){
            stack.push(this.stack[i].pos)
        }
        
        return stack
    }
}