import { BFSItterMatrix } from "../Matricies/utils/algorithims/matrixBFS";
import { BiBFSItterMatrix } from "../Matricies/utils/algorithims/matrixBidirectionalBFS";
import { DFSItterMatrix } from "../Matricies/utils/algorithims/matrixDFS";
import { BestFSItterMatrix } from "../Matricies/utils/algorithims/matrixBestFirstSearch";


export type itterator = null | BFSItterMatrix | DFSItterMatrix | BiBFSItterMatrix | BestFSItterMatrix;

