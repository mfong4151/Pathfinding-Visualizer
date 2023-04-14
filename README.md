# Background

This project is as much a TypeScript project, as a Frontend project, as a DSA project. The main design of this  visualizer for several common data structures and algorithms, including matrices, graph nodes, trees, and linked lists. As of right now, only matricies are implemented. I’ve loved working with React, and I felt like this would be a good way to pick up TypeScript. 

This project is open to collaborators, please message me before making any pull requests about considered contributions.

## Live Link

http://maxfongdev.com/DSA-Visualizer/

As of now, only the matricies section is availible for public release.

## How to use: Matricies

1) I personally enjoy abusing my 36" widescreen to view the screen, so I tend to expand the width...a lot

2) Place a start and a stop on the grid. At this point you can also draw walls.

3) Select the algorithm you want to pick from the algo dropdown

4) Press play. Watch the pretty colors :D. 

## UI Features


## Featured Data Structures

### Matrices

Obvious inspiration and credit must be given to Clement Milhaesque who popularized the pathfinding visualizer, and made a tutorial for it on his Youtube channel. The library react-dnd was used to make the start and stop markers drag and droppable. Huge shout out to the original React team at Meta who made this wonderful library. Walls are turned on and off via click and drag.

## Featured Algorithms

### Depth-First Search (DFS)

The DFS algorithm traverses the matrix in a "depth-first" manner, visiting all nodes in one direction before moving on. Usually the go to for your Leetcode problems, but I have to say when I finally saw how it works I was a bit let down. Either way, it's a bread and butter staple of DSA diet. DFS is used to implement other algorithms, so its important to at least understand how it works.

### Breadth-First Search (BFS)

he BFS algorithm traverses the matrix or graph in a "breadth-first" manner, visiting all nodes at a given level before moving on to the next level. This algorithm is useful when you want to explore all the neighbors of a node before moving on to its neighbors' neighbors. It is commonly used in shortest path and connectivity problems. This is the first "shortest path" algorithim that I have implemented.

### Bidirectional Breadth-First Search

The Bidirectional BFS algorithm is an optimized version of the BFS algorithm that searches two ends of a graph or matrix simultaneously. The search starts from the initial node and the goal node, exploring nodes in a "breadth-first" manner. The algorithm stops when the two searches meet. This algorithm is useful when you want to find the shortest path between two nodes in a graph or matrix. Also, it's really visually satisfying to watch.

### Best-First Search

Best First Search: The Best First Search algorithm is a graph traversal algorithm that uses a heuristic to search for the most promising path towards the goal node. In this sense it's the first "heuristic" based  It evaluates each node based on its estimated distance to the goal node and explores the node with the smallest estimated distance first. This algorithm is useful in finding the shortest path between two nodes. It is usually more preformant than BFS.

## The core of the Application: Itterators


Here I define Itterators as a group of classes that are responsible for breaking down an algorithm into several steps, each inheriting from general parent class.First, I used a ref in order to store the itterator over multiple rerenders:

```typescript


//Cross section of the Matrix Remote 
const Remote:FC<Props> = ({chosenAlgo, matrixState, startEndPos,  consoleContentState, isPlaying, setIsPlaying}) => {
  const {setConsoleContent} = consoleContentState;

  const currIttr = useRef<itterator>(null);




  useEffect(()=>{
    currIttr.current = assignActiveItterator(chosenAlgo, startEndPos, matrixState.matrix)
  },[startEndPos, matrix])

  useEffect(()=>{
    if(allowSetIttr.current) currIttr.current = assignActiveItterator(chosenAlgo, startEndPos, matrixState.matrix)
    allowSetIttr.current = true;
    

  },[chosenAlgo])


return (
  <div id='remote' className='fdr se'>
    // remote JSX here
  </div>
);

```

Inside assignActiveItter is just a switch-case statement that will assign the itterator conditional on what chosenAlgo is.

Next I abstracted the different functions of itterators into several instance methods in order to conditionally render changes to the DOM based on what step of the algorithm we were at. For all the flack that OOP gets, I believe that this was a good case example of where it shines:

```typescript



export class BestFSItterMatrix extends matrixHeuristicSearch{

    constructor(start:number[], end:number[], matrix:matrixItemObject[][]){
        super(start, end, matrix)
        const first: matrixItemObject = {pos:this.start, prev: [-1, -1]}
        Heap.heappush(this.open, [this.manhattanHeuristic(first.pos), first])
    }

    public manhattanHeuristic(nodePos:number[]):number{
        const [x1, y1] = nodePos;
        const [x2, y2] = this.end;
        return Math.abs(y2 - y1) + Math.abs (x2 - x1)
    }

    public preformFullAlgo(): matrixItemObject[] {
        
        while (this.open.length){
            
            const currPair: minHeapItem = this.open.pop()! //figure out how to type this later
            const curr = currPair[1]
            const {pos, prev} = curr
            const [x, y] = pos;

            if (this.outOfRangeOrVisited(x, y)) continue
            this.visited.add(`${x},${y}`)
            this.res.push(curr)
            
            this.evaluateEnd(curr)
            if (this.endFound){
                this.markEndPrev(curr, x, y)
                break;
            }

            for(const [dx, dy] of DIRS){
                const next:matrixItemObject = {pos:[x + dx, y + dy] , prev:pos} 
                this.open.push([this.manhattanHeuristic([x + dx, y + dy]), next])
    
            }
        }
       

        return this.res;
    }

    
    public isValidNext():boolean {
        if (this.open.heapArray.length <= 0) return false;
        const first = this.open.top(1)[0][1]
        if (this.outOfRangeOrVisited(first.pos[0], first.pos[1])) return false;
        return true;
    }

    public discardInvalidNode():number[]{
        const node: matrixItemObject = this.open.top(1)[0][1]
        Heap.heappop(this.open);
        return node.pos
    }

    public next():number[]{
        if(this.open.length <= 0) return []

        const currPair: minHeapItem = this.open.pop()!         
        const curr = currPair[1]
        const {pos} = curr;
        this.prev = pos;
        const y: number = pos[1];
        const x: number = pos[0];

        this.visited.add(`${x},${y}`)
        this.assignValueToMatrix(curr, x, y)
        this.evaluateEnd(curr)

        if (this.endFound){
            this.markEndPrev(curr, x, y)
        }

        //load the queue
        for (const [dx, dy] of DIRS) {
            const newPos = [x + dx, y + dy]
            const next: matrixItemObject = {pos: newPos, prev:pos} 
            const cost = this.manhattanHeuristic(newPos);
            Heap.heappush(this.open, [cost, next]);
        }
        

        return pos;
    }

    public isContainerEmpty():boolean{
        return !(this.open.heapArray.length > 0)
    }

    public showContainer():number[][]{
        const open:number[][] = [];

        for(const i of this.open) open.push(i[1].pos)
        
        return open
    }
}
```
