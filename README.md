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

## Planned Features

- Implementation of A* on matricies 4/21
- Choose your own color scheme 4/28
- Change the wall color 5/5
- A series of my favorite wall presets (does anyone remember Whitney's gym from Pokemon gen 2?). 5/12
- Trees, graphs, and linked lists TBD

## UI Features

### ReactDND

The drag and drop on the grid is satisfying...for me at least.

### Expandable grid

Again...it's really satisfying to watch these on the fullscreen. You can expand the canvas size in order to see the algo effects at scale.


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

Inside .assignActiveItter() is just a switch-case statement that will assign the itterator conditional on what chosenAlgo is.

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
            
            const currPair: minHeapItem = this.open.pop()!
            const curr: matrixItemObject = currPair[1]
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
        const first:matrixItemObject = this.open.top(1)[0][1]
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
        const curr: matrixItemObject = currPair[1]
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
            const cost: number = this.manhattanHeuristic(newPos);
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


## Reflections on the Use of ChatGPT

ChatGPT-3.5 and 4 were heavily used to assist creation of vanilla React components, but I would be lying if I said that it did all the heavy lifting. Up to the first release, I intentionally restricted limited myself to doing the TS typing on my own. Certain inherent limitations of using ChatGPT became apparent when I tried to put together classes to handle algorithmic itterators. This section reflects on some of the roadblocks I had when interacting with ChatGPT. If you're more interested in the project itself, then skip this section (doesn't hurt my feelings :)).

Let me be clear: ChatGPT and generative technology are powerful technologies, and I'm very confident that if I had given it more scope and context to what I was doing (in the form of the unreleased Github CopilotX or any other similar service), it would expedite the job that much more. If anything, this section should server more as: 1) a commentary on the current state of pair coding with ChatGPT; 2) A reflection on what I think this means for software engineers as a whole. I believe that this reflection might be insightful on the limits of ChatGPT, areas it seems to be having trouble with is data structures and algorithms. It will get there eventually, and I write this taking neither the side of the AI evangelist, nor the average SWE in the denial stage of the seven stages of grief, but just as a user. 

### Exhibit A : Resizing divs: there are just some things that it couldn't handle


If you've hovered over the div that divides the console and the canvas, you might have noticed that you can resize your screen. This was the original code snippet provided by ChatGPT-3.5:

```typescript

import { useState, useRef, useEffect } from "react";

const Graphs: React.FC = () => {
  const [pageLeftWidth, setPageLeftWidth] = useState<number>(300);
  const pageLeftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (pageLeftRef.current) {
        const offsetRight: number = window.innerWidth - (pageLeftRef.current.offsetLeft + pageLeftWidth);
        const newWidth:number = e.pageX - pageLeftRef.current.offsetLeft;
        if (newWidth > 0 && offsetRight > 0) {
          setPageLeftWidth(newWidth);
        }
      }
    };
    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [pageLeftWidth]);

  return (
    <div className='font-color'>
      {/* ... */}
      <div className='page-body'>
        <section id='page-left' className='tab-bg' ref={pageLeftRef} style={{ width: pageLeftWidth }}>
          {/* Content of page-left */}
        </section>
        {/* ... */}
      </div>
    </div>
  );
};

export default Graphs;

```

In this case the above code section works, it just didn't preform well. You could drag the resizing hook over and it would jump erratically from one side to the other. Credits to itsCodingDoctor for supplying the fix: https://www.youtube.com/watch?v=Af7iCwhQSRs:

```typescript
    //Within react component: 
    const pageLeftRef = useRef<HTMLDivElement>(null);
    const pageRightRef = useRef<HTMLDivElement>(null);
    const adjBarRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{

      const resizeableLeft = pageLeftRef.current;
      const stylesLeft: CSSStyleDeclaration = window.getComputedStyle(resizeableLeft!);
      let widthLeft:number = parseInt(stylesLeft.width, 10)
      if(!resizeableLeft) return 

      let x:number = 0;
      
      const onMouseMoveLRResize =  (e:any) =>{
        const dx: number = e.clientX - x;
        widthLeft = widthLeft + dx;
        x = e.clientX
        resizeableLeft.style.width! = `${widthLeft}px`
      }
      
      const onMouseUpLRResize = (e:any) => document.removeEventListener("mousemove", onMouseMoveLRResize);

      const onMouseDownRightResize = (e:any) =>{

        x = e.clientX;
        resizeableLeft.style.left = stylesLeft.left
        resizeableLeft.style.right = '';
        document.addEventListener("mousemove", onMouseMoveLRResize);
        document.addEventListener("mouseup", onMouseUpLRResize);


      }

      const resizerRight = adjBarRef.current
      if(!resizerRight) return 
      resizerRight.addEventListener("mousedown", onMouseDownRightResize);

      return ()=> {
        resizerRight.removeEventListener("mousedown", onMouseDownRightResize)

      }
    }, [])

```


As I discussed above, a large part of my project was creating the "step-by-step" playback effect of an itterator. Because of how the itterator stacks, queues, and heaps took matrixItemObjects, ChatGPT wasn't able to produce helpful code. It became more helpful once I provided it with examples of what I had already done, namely the parent class, and the BFS itterator. The issue I ran into was namely dealing with the itterators that utilized the heap-js library. In particular, I tried to have ChatGPT make the step itterators for Best First Search:

ChatGPT's result:

```typescript

//My query: Hey ChatGPT, I’m looking to get help adding a couple instance methods to some code. I’ve created a step-itterator for several common pathfinding algorithims in matricies. I’ve made a class for Greedy Best First Search. What I want you to do is produce equivalent methods for  all the methods on BFSItterMatrix that aren’t already on BestFSItterMatrix. Please note that Heap is a class from a library, heap-js, and if you don’t know how to handle the methods for heaps, please leave pseudo code instead:


export class BestFSItterMatrix extends matrixHeuristicSearch{

    constructor(start:number[], end:number[], matrix:matrixItemObject[][]){
        super(start, end, matrix)
        const first: matrixItemObject = {pos:this.start, prev: [-1, -1]}
        Heap.heappush(this.open, [this.manhattanHeuristic(first.pos), first])
    }

    //...
    

    public isValidNext():boolean {
        if (this.open.length <= 0) return false;
        const first = this.open[0][1]
        if (this.outOfRangeOrVisited(first.pos[0], first.pos[1])) return false;
        return true;
    }

    public discardInvalidNode():number[]{
        const node: matrixItemObject = this.open[0][1]
        Heap.heappop(this.open);
        return node.pos
    }

}
```

My edits: 
```typescript

export class BestFSItterMatrix extends matrixHeuristicSearch{

    constructor(start:number[], end:number[], matrix:matrixItemObject[][]){
        super(start, end, matrix)
        const top: matrixItemObject = {pos:this.start, prev: [-1, -1]};
        Heap.heappush(this.open, [this.manhattanHeuristic(top.pos), top])
    }

    public isValidNext():boolean {
        if (this.open.heapArray.length <= 0) return false;
        const top:matrixItemObject = this.open.top(1)[0][1];
        if (this.outOfRangeOrVisited(top.pos[0], top.pos[1])) return false;
        return true;
    }

    public discardInvalidNode():number[]{
        const node: matrixItemObject = this.open.top(1)[0][1];
        Heap.heappop(this.open);
        return node.pos
    }

}

```

ChatGPT's code attempts to access the heap via indexing, which in this case is not possible. It must be accessed via the .top() method. I don't blame it, but this does show that you can't completely take the human out of the loop. In this case it was faster to refactor the code than it was to mess around with another query.

The first public release of this project was on 4/14/2023, and its safe to say that I will use ChatGPT for much more of the project going forward.