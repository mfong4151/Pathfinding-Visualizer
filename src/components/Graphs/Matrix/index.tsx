import React, {useState} from "react";
import GraphMatrixItem from "./GraphMatrixItem"
import { Props} from "../commonInterface/modelMatrixState"

const GraphMatrix: React.FC<Props> = ({matrixState})=>{
    const {matrix, setMatrix} = matrixState;
    const [mouseDown, setMouseDown] = useState(false)
    const mouseDownState = {mouseDown, setMouseDown}

    return(
        <div className="matrix">
            {matrix.map((row : Array<Array<String>>, idxRow: number)=>   
                <div id={`row-${idxRow}`} className='udc' key={idxRow}>
                    {
                        row.map((cell: Array<String>, idxCol: number) =>

                            <GraphMatrixItem 
                                matrixState={matrixState} 
                                mouseDownState={mouseDownState}
                                pos={{row: idxRow, col: idxCol}}
                                key={idxCol}

                            />)
                    }
                  
                </div>
            )}

        </div>
    )
}


export default GraphMatrix;