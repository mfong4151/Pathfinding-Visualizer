# Background

This project is as much a TypeScript project, as a Frontend project, as a DSA project. The main design of this  visualizer for several common data structures and algorithms, including matrices, graph nodes, trees, and linked lists. As of right now, only matricies are implemented. I’ve loved working with React, and I felt like this would be a good way to pick up TypeScript. 

This project is open to collaborators, please message me before making any pull requests about considered contributions.

## Live Link


http://maxfongdev.com/DSA-Visualizer/

As of now, only the matricies section is availible for public release.

## How to use: Matricies

1) I personally enjoy abusing my 36" widescreen to view the screen, so I tend to expand the width...a lot


2) Place a start and a stop on the grid. At this point you can also draw walls.

3) Press play. Watch the pretty colors :D. 


## Data Structures

### Matrices

Obvious inspiration and credit must be given to Clement Milhaesque who popularized the pathfinding visualizer, and made a tutorial for it on his Youtube channel. The library react-dnd was used to make the start and stop markers drag and droppable. Huge shout out to the original React team at Meta who made this wonderful library. Walls are turned on and off via click and drag.

## Algorithms

### Depth-First Search (DFS)

The DFS algorithm traverses the matrix in a "depth-first" manner, visiting all nodes in one direction before moving on. Usually the go to for your Leetcode problems, but I have to say when I finally saw how it works I was a bit let down. Either way, it's a bread and butter staple of DSA diet. DFS is used to implement other algorithms, so its important to at least understand how it works.

### Breadth-First Search (BFS)

he BFS algorithm traverses the matrix or graph in a "breadth-first" manner, visiting all nodes at a given level before moving on to the next level. This algorithm is useful when you want to explore all the neighbors of a node before moving on to its neighbors' neighbors. It is commonly used in shortest path and connectivity problems. This is the first "shortest path" algorithim that I have implemented.

### Bidirectional Breadth-First Search

The Bidirectional BFS algorithm is an optimized version of the BFS algorithm that searches two ends of a graph or matrix simultaneously. The search starts from the initial node and the goal node, exploring nodes in a "breadth-first" manner. The algorithm stops when the two searches meet. This algorithm is useful when you want to find the shortest path between two nodes in a graph or matrix. Also, it's really visually satisfying to watch.

### Best-First Search

Best First Search: The Best First Search algorithm is a graph traversal algorithm that uses a heuristic to search for the most promising path towards the goal node. In this sense it's the first "heuristic" based  It evaluates each node based on its estimated distance to the goal node and explores the node with the smallest estimated distance first. This algorithm is useful in finding the shortest path between two nodes. It is usually more preformant than BFS.

## Reflections on the Use of ChatGPT

ChatGPT-3.5 and 4 were heavily used to assist creation of vanilla React components, but I would be lying if I said that it did all the heavy lifting. Up to the first release, I intentionally restricted limited myself to doing the TS typing on my own. Certain inherent limitations of using ChatGPT became apparent when I tried to put together classes to handle algorithmic itterators. This section reflects on some of the roadblocks I had when interacting with ChatGPT. If you're more interested in the project itself, then skip this section (doesn't hurt my feelings :)).

Let me be clear: ChatGPT and generative technology are powerful technologies, and I'm very confident that if I had given it more scope and context to what I was doing (in the form of the unreleased Github CopilotX or any other similar service), it would expedite the job that much more. If anything, this section should server more as: 1) a commentary on the current state of pair coding with ChatGPT; 2) A reflection on what I think this means for software engineers as a whole. I believe that this reflection might be insightful on the limits of ChatGPT, areas it seems to be having trouble with is Data structures and algorithms. It will surely get there eventually, and I write this taking neither the side of the AI evangelist, nor the average SWE in the denial stage of the seven stages of grief, but just as a user. 

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
        const offsetRight = window.innerWidth - (pageLeftRef.current.offsetLeft + pageLeftWidth);
        const newWidth = e.pageX - pageLeftRef.current.offsetLeft;
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
  const pageLeftRef = useRef<HTMLDivElement>(null);
    const pageRightRef = useRef<HTMLDivElement>(null);
    const adjBarRef = useRef<HTMLDivElement>(null);
    const matrixRef = useRef<any>();

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


As I discussed above, a large part of my project was creating the "step-by-step" playback effect of an itterator. 

The first public release of this project was on 4/14/2023, and its safe to say that I will use ChatGPT for much more of the project going forward.