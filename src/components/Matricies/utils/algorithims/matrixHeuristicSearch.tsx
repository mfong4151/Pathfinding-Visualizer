import { MatrixItterator } from "./matrixItterator";
import { matrixItemObject } from "../../../types/objects";
import Heap from 'heap-js';

interface trackPositions{
    [key:string]:[number, number]
}


//Bridge class to 
export class matrixHeuristicSearch extends MatrixItterator{
    public h: number; //refers to the heuristic function
    public heap: any; //most of the heuristic functions are implemented with heaps.
    public open: trackPositions;
    public closed: trackPositions;
    
    constructor(start:number[], end:number[], matrix:matrixItemObject[][]){
        super(start, end, matrix)
        this.heap = new Heap();
        this.heap.init()
        this.open = {}
        this.closed ={}
        this.h = 0;
    }
}