import React from "react";
import GraphMatrixItem from "./GraphMatrixItem"

interface Props{
    matrixState:{
        matrix: Array<any>;
        setMatrix: React.Dispatch<React.SetStateAction<Array<any>>>;
    } 


} 


const GraphMatrix: React.FC<Props> = ({matrixState})=>{
    const {matrix, setMatrix} = matrixState;

    return(
        <div className="matrix">
            {matrix.map((row : Array<Array<String>>, idx: number)=> 
                <div>
                    {
                        row.map((cell: Array<String>, idx: number) =>
                        <GraphMatrixItem/>
                        )
                    }
                  
                </div>
            )}

        </div>
    )
}


export default GraphMatrix;