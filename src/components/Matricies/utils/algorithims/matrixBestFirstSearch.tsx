import { matrixHeuristicSearch } from "./matrixHeuristicSearch";
import { matrixItemObject } from "../../../types/objects";


export class matrixBestFirstSearch extends matrixHeuristicSearch{

    constructor(start:number[], end:number[], matrix:matrixItemObject[][]){
        super(start, end, matrix)
    }

}