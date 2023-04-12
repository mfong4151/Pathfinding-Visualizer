import { BFSItteratorMatrix } from "../Matricies/utils/algorithims/matrixBFS";
import { MatrixItteratorBiBFS } from "../Matricies/utils/algorithims/matrixBidirectionalBFS";
import { DFSItteratorMatrix } from "../Matricies/utils/algorithims/matrixDFS";
import { MatrixBestFirstSearch } from "../Matricies/utils/algorithims/matrixBestFirstSearch";


export type itterator = null | BFSItteratorMatrix | DFSItteratorMatrix | MatrixItteratorBiBFS;

