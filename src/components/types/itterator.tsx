import { BFSItterMatrix } from "../Matricies/algorithims/matrixBFS";
import { BiBFSItterMatrix } from "../Matricies/algorithims/matrixBidirectionalBFS";
import { DFSItterMatrix } from "../Matricies/algorithims/matrixDFS";
import { BestFSItterMatrix } from "../Matricies/algorithims/matrixBestFirstSearch";
import { AStar } from "../Matricies/algorithims";


export type itterator = null | BFSItterMatrix | DFSItterMatrix | BiBFSItterMatrix | BestFSItterMatrix | AStar;

