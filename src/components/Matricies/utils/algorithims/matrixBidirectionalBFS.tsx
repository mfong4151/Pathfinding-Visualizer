import { matrixItemObject } from "../../../types/objects";
import { MatrixItterator } from "./matrixItterator";
import DIRS from "./dirs";




export class MatrixItteratorBiBFS extends MatrixItterator{
    public startQ: matrixItemObject[]  
    public endQ: matrixItemObject[]  
    public queues:matrixItemObject[][]
    private qNum:number;
    protected activeQ: matrixItemObject[]
    public visitedEnd: Set<string>;
    public visiteds: Array<Set<string>>;
    public activeVisited: Set<string>;
    public otherVisited: Set<string>;
    public startPathEnd: number[]
    public endPathEnd: number[]

    constructor(start:number[], end:number[], matrix:matrixItemObject[][] ){
        super(start,end, matrix)
        this.startQ = [{pos: start, prev: this.prev}];
        this.endQ =  [{pos: end, prev: this.prev}];
        this.visitedEnd = new Set();
        this.startPathEnd = [-1, -1]
        this.endPathEnd = [-1, -1]

        //Used to alternatively bfs
        this.queues = [this.startQ, this.endQ];
        this.visiteds = [this.visited, this.visitedEnd]
        this.qNum = 0;
        this.activeVisited = this.visiteds[0]
        this.otherVisited = this.visiteds[1]
        this.activeQ = this.queues[this.qNum];
    }

    public switchActiveQueue():void{
        
        this.otherVisited = this.visiteds[this.qNum]
        this.qNum = this.qNum === 0 ? 1 :0;
        this.activeQ = this.queues[this.qNum]
        this.activeVisited = this.visiteds[this.qNum]

    }

    public isValidNext():boolean{
        
        if (this.activeQ.length < 0) return false;
        const first = this.activeQ[0]
        if (this.outOfRangeOrVisited(first.pos[0], first.pos[1]) )return false;            
        return true;
    }

    public checkIntersection(node:matrixItemObject): boolean{
        const x:number = node.pos[0]
        const y:number = node.pos[1]

        if (this.otherVisited.has(`${x},${y}`)){
            this.startPathEnd = [x,y]
            this.endPathEnd = [node.prev[0], node.prev[1]]
            console.log(this.startPathEnd, this.endPathEnd)
            return true;
        }
        return false;
    }
    
    public discardInvalidNode():number[]{
        const node: matrixItemObject = this.queues[this.qNum].shift()!
        return node.pos
    }

    public next():number[]{

        
        if(this.activeQ.length <= 0) return []
        
        const curr:matrixItemObject = this.activeQ.shift()!;
        const {pos} = curr;
        this.prev = pos;
        const y: number = pos[1];
        const x: number = pos[0];

        this.activeVisited.add(`${x},${y}`)

        this.assignValueToMatrix(curr, x, y)
        this.evaluateEnd(curr)

        //load the queue
        for (const [dx, dy] of DIRS) {
            const newPos = [x + dx, y + dy]
            this.activeQ.push({pos: newPos, prev:pos} );
        }
        
        this.switchActiveQueue()

        return pos;
    }

    public isQueueEmpty():boolean{
        return !(this.activeQ.length > 0)
    }

    protected outOfRangeOrVisited(x:number, y:number):boolean{
        const pos: string = `${x},${y}`;
        return (this.activeVisited.has(pos) ||
            x < 0 ||  x >= this.cols ||
            y < 0 ||  y >= this.rows ||
            this.matrix[y][x].val === 'w'
        )
    }
    
    public preformFullAlgo():matrixItemObject[]{
        while (!this.isQueueEmpty()) {
            const curr:matrixItemObject = this.activeQ.shift()!;
            const x: number = curr.pos[0];
            const y: number = curr.pos[1];
            
            if (this.outOfRangeOrVisited(x, y)) continue;
            
            //Keep track of visited spaces in set
            this.activeVisited.add(`${x},${y}`);
            //push next item on to res
            this.res.push(curr);
            
            //If one touches the visited of the other then we have reached the end
            
            if (this.checkIntersection(curr)){
                this.matrix[y][x] = {val: '', prev:curr.prev}
                this.endFound = true;
                break;
            }

            if(!this.isStart(curr.pos) && !this.isEnd(curr.pos))  this.matrix[y][x] = {val: '', prev:curr.prev}
            
            for (const [dx, dy] of this.dirs) {
                this.activeQ.push({pos:[x + dx, y + dy], prev: curr.pos})
            }
            this.switchActiveQueue()
        }
            return this.res;
    }



    
    public generateShortestPath():number[][]{
        if (!this.endFound) return [[]]
        const res: number[][] = []

        for(const bidirectPoint of [this.startPathEnd, this.endPathEnd]){

            let curr:matrixItemObject = this.matrix[bidirectPoint[1]][bidirectPoint[0]]
            
            while (!(curr.prev[0] === this.start[0] && curr.prev[1] === this.start[1] ||
                    curr.prev[0] === this.end[0] && curr.prev[1] === this.end[1]))
            {
                res.push(curr.prev)
                curr = this.matrix[curr.prev[1]][curr.prev[0]]
            }
        }
         return res.reverse()
    }

}

