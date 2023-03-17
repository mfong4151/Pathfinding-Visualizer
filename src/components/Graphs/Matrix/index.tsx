import React from "react";
import GraphMatrixItem from "./GraphMatrixItem"
import { Props} from "../commonInterface/modelMatrixState"


const GraphMatrix: React.FC<Props> = ({matrixState})=>{
    const {matrix, setMatrix} = matrixState;

    return(
        <div className="matrix">
            {matrix.map((row : Array<Array<String>>, idx: number)=> 
                <div id={`row-${idx}`} className='udc' key={idx}>
                    {
                        row.map((cell: Array<String>, idx: number) =><GraphMatrixItem matrixState={matrixState} key={idx}/>)
                    }
                  
                </div>
            )}

        </div>
    )
}


export default GraphMatrix;