export class DFSIteratorMatrix {
    private visited: boolean[][];
    private matrix: number[][];
    private numRows: number;
    private numCols: number;
    private row: number;
    private col: number;
    private dirs: number[][];
  
    constructor(matrix: number[][]) {
      this.visited = matrix.map(row => row.map(() => false));
      this.matrix = matrix;
      this.numRows = matrix.length;
      this.numCols = matrix[0].length;
      this.row = 0;
      this.col = 0;
      this.dirs = [[0, 1], [1, 0], [-1, 0], [0, -1]];
    }
  
    hasNext(): boolean {
      return this.row < this.numRows && this.col < this.numCols;
    }
  
    next(): number {
      if (!this.hasNext()) {
        throw new Error('No more elements in matrix');
      }
  
      const value = this.matrix[this.row][this.col];
      this.visited[this.row][this.col] = true;
  
      let nextRow = this.row;
      let nextCol = this.col;
      for (const [dr, dc] of this.dirs) {
        const r = this.row + dr;
        const c = this.col + dc;
        if (r >= 0 && r < this.numRows && c >= 0 && c < this.numCols && !this.visited[r][c]) {
          nextRow = r;
          nextCol = c;
          break;
        }
      }
  
      if (nextRow === this.row && nextCol === this.col) {
        // Reached a dead end, backtrack
        while (nextRow === this.row && nextCol === this.col) {
          if (this.col > 0) {
            this.col--;
          } else {
            this.col = this.numCols - 1;
            this.row--;
          }
        }
      } else {
        this.row = nextRow;
        this.col = nextCol;
      }
  
      return value;
    }
  }