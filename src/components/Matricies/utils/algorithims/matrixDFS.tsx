import { MatrixItterator } from "./matrixItterator";
import { pathObject } from "../../../types/classes";
import { matrixItemObject } from "../../../types/objects";
export class DFSItteratorMatrix extends MatrixItterator {
    public stack: pathObject[];
    public res: pathObject[];

    constructor(start: number[], end: number[], matrix: matrixItemObject[][]) {
        super(start, end, matrix);
        this.stack = [{ pos: start, prev: this.prev }];
        this.res = [];
    }

    public isValidNext(): boolean {
        if (this.stack.length <= 0) return false;
        const last = this.stack[this.stack.length - 1];
        const x: number = last.pos[0];
        const y: number = last.pos[1];

        const pos: string = `${x},${y}`;
        if (
            this.visited.has(pos) ||
            x < 0 ||  x >= this.cols ||
            y < 0 ||  y >= this.rows ||
            this.matrix[y][x].val === 'w'
        )
            return false;
        return true;
    }

    public discardInvalidNode(): void {
        this.stack.pop();
    }

    public next(): number[] {
        if (this.stack.length <= 0) return [];

        const curr: pathObject = this.stack.pop()!;
        const { pos } = curr;
        this.prev = pos;
        const x: number = pos[0];
        const y: number = pos[1];
        const cords: string = `${x},${y}`;
        this.visited.add(cords);

        if (!this.isStart(curr.pos) && !(this.isEnd(curr.pos))) this.matrix[y][x] = curr;
        if (this.isEnd(pos)) this.endFound = true;

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

    public isEnd(node: number[]): boolean {
        if (node[0] === this.end[0] && node[1] === this.end[1]) return true;
        return false;
    }

    public preformFullAlgo(): pathObject[] {
        while (!this.isContainerEmpty()) {
            const curr: pathObject = this.stack.pop()!;
            const x: number = curr.pos[0];
            const y: number = curr.pos[1];
            const visitedPos: string = `${x},${y}`;
            if (this.visited.has(visitedPos) || x < 0 || x >= this.cols || y < 0 || y >= this.rows || this.matrix[y][x].val === 'w') continue;

            this.visited.add(visitedPos);
            this.res.push(curr);

            if (this.isEnd(curr.pos)) {
                this.matrix[y][x] = { val: 'e', prev: curr.prev };
                this.endFound = true;
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