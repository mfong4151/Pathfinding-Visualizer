import React, {useEffect, useState} from "react";
import GraphMatrixItem from "./GraphMatrixItem"
import { Props} from "../commonInterface/modelMatrixState"
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SvgTotem from './SvgTotem'

const GraphMatrix: React.FC<Props> = ({matrixState})=>{
    const {matrix, setMatrix} = matrixState;
    const [heldTotem, setHeldTotem] = useState<string>('')
    const [mouseDown, setMouseDown] = useState(false)
    const mouseDownState = {mouseDown, setMouseDown}

    useEffect(()=>{
        console.log(heldTotem)
    },[heldTotem])

    return(
        <div className="fdc">
            <DndProvider backend={HTML5Backend}>

                <div className='toolbar fdr'>
                    <SvgTotem totemType='start' setHeldTotem={setHeldTotem}/>
                    <SvgTotem totemType='end' setHeldTotem={setHeldTotem}/>
                </div>

                <div className="matrix">
                    {matrix.map((row : Array<Array<String>>, idxRow: number)=>   
                        <div id={`row-${idxRow}`} className='udc' key={idxRow}>
                            {
                                row.map((cell: Array<String>, idxCol: number) =>
                                
                                <GraphMatrixItem 
                                    matrixState={matrixState} 
                                    mouseDownState={mouseDownState}
                                    pos={{row: idxRow, col: idxCol}}
                                    totemState={{heldTotem, setHeldTotem}}
                                    key={idxCol}
                                
                                />)
                            }
                        
                        </div>
                    )}

                </div>
            </DndProvider>
        </div>
    )
}


export default GraphMatrix;