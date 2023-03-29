import { MatrixItterator } from "../../../utils/itterators";
import { pathObject } from "../../../types/classes";
import { matrixItemObject } from "../../../types/objects";

export class DFSItteratorMatrix extends MatrixItterator {
  public stack: pathObject[]

  constructor(start:number[], end:number[], matrix:matrixItemObject[][]){
      super(start, end, matrix)
      this.stack = [{node: start, prev: this.prev}]
  }

  public isValidNext(): boolean {
      if (this.stack.length <= 0) return false;
      const last = this.stack[this.stack.length - 1]
      const x: number =  last.node[0];
      const y: number =  last.node[1];
      const pos: string = `${x},${y}`;
      
      
      if (this.visited.has(pos) || 
          x < 0 || x >= this.cols ||
          y < 0 || y >= this.rows || 
          this.matrix[y][x] === 'w') {
              return false;
      }

      return true;
  }

  public discardInvalidNode(): void {
      this.stack.pop()
  }

  public next(): number[] {
      if (this.stack.length <= 0) return [];

      const { node, prev } = this.stack[this.stack.length - 1];
      this.prev = node;
      const y: number = node[1];
      const x: number = node[0];
      const cords: string = `${x},${y}`;
      this.visited.add(cords)
      if (!this.isStart(node)) this.matrix[y][x] = 'v1'


      // Load the stack
      for (const [dx, dy] of this.dirs) {
          const newPos = [x + dx, y + dy]
          this.stack.push({node: newPos, prev: node});
      }

      return node;
  }

  public isEnd(): boolean {
      if (this.stack.length === 0) return true;
      if (this.stack[this.stack.length - 1].node[0] === this.end[0] && this.stack[this.stack.length - 1].node[1] === this.end[1]) return true;
      return false;
  }
}