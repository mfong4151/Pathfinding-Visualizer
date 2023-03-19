
const matrixBFS = (matrix:Array<Array<string>>, start : Array<number>, target : Array<number>): Array<Array<number>> =>{
    const res: Array<number>[] = [];
    const visited = new Set<string>();
    const rows = matrix.length;
    const cols = matrix[0].length;
    const q: Array<Array<number>> = [start];
    const dirs: Array<Array<number>> = [[0, 1], [1, 0], [-1, 0], [0, -1]];
    let i, j;
    
    while (q.length){
        const curr: Array<number> = q.shift()!;
        visited.add(`${curr[0]},${curr[1]}`)

    
        for(const dir of dirs){
            const i=  curr[0] + dir[0];
            const j = curr[1] + dir[1];
            
            if(i >= rows || i < 0 || j >= cols || j < 0 || visited.has(`${i},${j}`)){
                continue
            }
            
            res.push([i, j])
            if(i === target[0] && j == target[1]) return res;            
            q.push([i, j])
        }

    }

    return res;
}

export default matrixBFS;