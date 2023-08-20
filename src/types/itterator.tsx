import { BFSItterMatrix } from "../components/Matricies/algorithims/matrixBFS";
import { BiBFSItterMatrix } from "../components/Matricies/algorithims/matrixBidirectionalBFS";
import { DFSItterMatrix } from "../components/Matricies/algorithims/matrixDFS";
import { BestFSItterMatrix } from "../components/Matricies/algorithims/matrixBestFirstSearch";
import { AStar } from "../components/Matricies/algorithims";


export type itterator = null | BFSItterMatrix | DFSItterMatrix | BiBFSItterMatrix | BestFSItterMatrix | AStar;

