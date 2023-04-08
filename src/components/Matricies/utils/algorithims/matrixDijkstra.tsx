// type Cell = {
//     row: number;
//     col: number;
//     distance: number;
//   };
  
//   type Node = {
//     row: number;
//     col: number;
//     fScore: number;
//     gScore: number;
//     hScore: number;
//     parent: Node | null;
//   };
  
//   type Heuristic = (cell1: Cell, cell2: Cell) => number;
  
//   const dijkstra = (start: Cell, end: Cell, matrix: number[][]): Cell[] => {
//     const rows = matrix.length;
//     const cols = matrix[0].length;
//     const visited: boolean[][] = new Array(rows)
//       .fill(false)
//       .map(() => new Array(cols).fill(false));
//     const distances: number[][] = new Array(rows)
//       .fill(Infinity)
//       .map(() => new Array(cols).fill(Infinity));
//     const parents: Cell[][] = new Array(rows)
//       .fill(null)
//       .map(() => new Array(cols).fill(null));
//     const queue: Cell[] = [];
  
//     distances[start.row][start.col] = 0;
//     visited[start.row][start.col] = true;
//     queue.push(start);
  
//     while (queue.length) {
//       const curr: Cell = queue.shift()!;
//       const { row, col } = curr;
  
//       if (row === end.row && col === end.col) {
//         const path: Cell[] = [];
//         let node: Cell | null = curr;
//         while (node !== null) {
//           path.unshift(node);
//           node = parents[node.row][node.col];
//         }
//         return path;
//       }
  
//       const neighbors: Cell[] = [];
//       if (row > 0 && !visited[row - 1][col]) {
//         neighbors.push({ row: row - 1, col, distance: matrix[row - 1][col] });
//       }
//       if (row < rows - 1 && !visited[row + 1][col]) {
//         neighbors.push({ row: row + 1, col, distance: matrix[row + 1][col] });
//       }
//       if (col > 0 && !visited[row][col - 1]) {
//         neighbors.push({ row, col: col - 1, distance: matrix[row][col - 1] });
//       }
//       if (col < cols - 1 && !visited[row][col + 1]) {
//         neighbors.push({ row, col: col + 1, distance: matrix[row][col + 1] });
//       }
  
//       neighbors.forEach((neighbor) => {
//         const { row, col, distance } = neighbor;
//         const newDistance = distances[curr.row][curr.col] + distance;
//         if (newDistance < distances[row][col]) {
//           distances[row][col] = newDistance;
//           parents[row][col] = curr;
//         }
//         if (!visited[row][col]) {
//           visited[row][col] = true;
//           queue.push({ row, col, distance: newDistance });
//         }
//       });
  
//       queue.sort((a, b) => distances[a.row][a.col] - distances[b.row][b.col]);
//     }
  
//     return [];
//   };
  
export {}