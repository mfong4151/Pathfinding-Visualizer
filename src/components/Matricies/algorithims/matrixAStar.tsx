import { matrixHeuristicSearch, minHeapItem } from "./matrixHeuristicSearch";
import { matrixItemObject } from "../../../types/objects";
import Heap from "heap-js";
import { DIRS_EIGHT } from "./dirs"; // You should use DIRS_EIGHT for A* search

export class AStar extends matrixHeuristicSearch {
    constructor(start: number[], end: number[], matrix: matrixItemObject[][]) {
        super(start, end, matrix);
        const top: matrixItemObject = { pos: this.start, prev: [-1, -1] };
        Heap.heappush(this.open, [this.calculateF(top), top]); // Use calculateF for A*
    }


    public manhattanHeuristic(nodePos: number[]): number {
        const [x1, y1] = nodePos;
        const [x2, y2] = this.end;
        return Math.abs(y2 - y1) + Math.abs(x2 - x1);
    }
    
    public calculateG(currPos: number[]): number {
        // Calculate the cost to reach the current position from the start
        return this.manhattanHeuristic(currPos);
    }
    
    public calculateF(curr: matrixItemObject): number {
        // Calculate the total cost (g + h) for the current node
        const g = this.calculateG(curr.pos);
        const h = this.manhattanHeuristic(curr.pos);
        return g + h;
    }
    
    public preformFullAlgo(): matrixItemObject[] {
        while (this.open.length) {
            const currPair: minHeapItem = this.open.pop()!;
            const curr: matrixItemObject = currPair[1];
            const { pos } = curr;
            const [x, y] = pos;

            if (this.outOfRangeOrVisited(x, y)) continue;
            this.visited.add(`${x},${y}`);
            this.res.push(curr);

            this.evaluateEnd(curr);
            if (this.endFound) {
                this.markEndPrev(curr, x, y);
                break;
            }

            for (const [dx, dy] of DIRS_EIGHT) {
                const nextX: number = x + dx;
                const nextY: number = y + dy;
                const nextPos: [number, number] = [nextX, nextY];
                const next: matrixItemObject = { pos: nextPos, prev: pos };
                if (this.outOfRangeOrVisited(nextX, nextY)) continue;

                const nextF: number = this.calculateF(next); 
                Heap.heappush(this.open, [nextF, next]);
            }
        }

        return this.res;
    }

    public discardInvalidNode(): number[] {
        const node: matrixItemObject = this.open.pop()![1];
        return node.pos;
    }
    
    public isContainerEmpty(): boolean {
        return this.open.heapArray.length === 0;
    }
    public next(): number[] {
        if (this.open.length <= 0) return [];
    
        const currPair: minHeapItem = this.open.pop()!;
        const curr: matrixItemObject = currPair[1];
        const { pos } = curr;
        const [x, y] = pos;
    
        this.prev = pos;
        this.visited.add(`${x},${y}`);
        this.assignValueToMatrix(curr, x, y);
        this.evaluateEnd(curr);
    
        if (this.endFound) {
            this.markEndPrev(curr, x, y);
        }
    
        // Load the queue
        for (const [dx, dy] of DIRS_EIGHT) {
            const nextX: number = x + dx;
            const nextY: number = y + dy;
            const nextPos: [number, number] = [nextX, nextY];
            const next: matrixItemObject = { pos: nextPos, prev: pos };
            if (this.outOfRangeOrVisited(nextX, nextY)) continue;
    
            const nextF: number = this.calculateF(next); // Use calculateF for A*
            Heap.heappush(this.open, [nextF, next]);
        }
    
        return pos;
    }
    
}
