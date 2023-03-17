
const matrixBFS = (matrix:Array<Array<string>>, start : Array<number>): Array<Array<number>> =>{
    const res: Array<number>[] = [];
    const visited = new Set<string>(); //how do i declare typing on this?

    const q: Array<Array<number>> = [start];
    const dirs: Array<Array<number>> = [[0, 1], [1, 0], [-1, 0], [0, -1]]
    let i, j;
    
    while (q.length){
        const node: Array<number> = q.shift()!;
        visited.add(`${node[0]},${node[1]}`)

    
        for(const dir of dirs){
            const i=  node[0] + dir[0];
            const j = node[1] + dir[1];
 

        }




    }

    return res;
}

export default matrixBFS;


// interface Point {
//     row: number;
//     col: number;
//   }
  
//   function bfs(matrix: number[][], start: Point): void {
//     const numRows = matrix.length;
//     const numCols = matrix[0].length;
//     const visited = new Set<string>();
  
//     const queue: Point[] = [start];
//     visited.add(`${start.row},${start.col}`);
  
//     const dirs: Point[] = [
//       { row: 0, col: 1 },
//       { row: 1, col: 0 },
//       { row: 0, col: -1 },
//       { row: -1, col: 0 },
//     ];
  
//     while (queue.length) {
//       const curr = queue.shift()!;
//       const { row, col } = curr;
//       console.log(`Processing (${row}, ${col})`);
  
//       for (const dir of dirs) {
//         const newRow = row + dir.row;
//         const newCol = col + dir.col;
  
//         if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
//           const key = `${newRow},${newCol}`;
//           if (!visited.has(key)) {
//             visited.add(key);
//             queue.push({ row: newRow, col: newCol });
//           }
//         }
//       }
//     }
//   }