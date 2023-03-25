import DIRS from "./dirs";

export class bfsItterator{
    root:string;
    res: number[] = [];
    visited = new Set<string>();
    q: number[][];

    constructor(root:string){
        this.root = root;
        this.q = [];
        this.res = []
        this.visited = new Set()
    }

    next(){
        if(this.q.length <= 0)return []

        const node:number[] = this.q.shift()!;
  
        for (const dir of DIRS) {
            this.q.push([node[0] + dir[0], node[1] + dir[1]]);

            }
    }
    
}


// export default matrixBFS;