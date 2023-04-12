import { MatrixItterator } from "./matrixItterator";
import { matrixItemObject } from "../../../types/objects";
import Heap from 'heap-js';


//Bridge class to handle heursitc searches
export class matrixHeuristicSearch extends MatrixItterator{
    public open: any;
    
    constructor(start:number[], end:number[], matrix:matrixItemObject[][]){
        super(start, end, matrix)
        this.open = new Heap();
    
    }
}