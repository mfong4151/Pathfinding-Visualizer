
const matrixBFS = (matrix:Array<Array<number>>, start : Array<number>): Array<Array<number>> =>{
    const res: Array<number>[] = [];
    const visited = new Set(); //how do i declare typing on this?

    const q: Array<number>[] = [start];
    const dirs = [[0, 1], [1, 0], [-1, 0], [0, -1]]
    let node;
    
    while (q){
        node = q.shift()
        visited.add(start)
        for(let dir of dirs){
            

        }




    }

    return res;
}

export default matrixBFS;