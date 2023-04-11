import { MatrixItterator } from "./matrixItterator";
import { matrixItemObject } from "../../../types/objects";
import Heap from 'heap-js';


//Bridge class to 
export class matrixHeuristicSearch extends MatrixItterator{
    public h: number; //refers to the heuristic function
    public heap: any; //most of the heuristic functions are implemented with heaps.

    constructor(start:number[], end:number[], matrix:matrixItemObject[][]){
        super(start, end, matrix)
        this.heap = new Heap();
        this.heap.init()
        this.h = 0;
    }
}