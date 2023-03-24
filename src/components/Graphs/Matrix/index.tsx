import React, { useState} from "react";
import GraphMatrixItem from "./GraphMatrixItem"
import { Props} from "../commonInterface/modelMatrixState"
import { startStop } from "../../types/positions";
import { DndProvider} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SvgTotem from './SvgTotem'
import CellTotem from "./CellTotem";



const GraphMatrix: React.FC<Props> = ({matrixState})=>{
    const {matrix} = matrixState;
    const [startEndPos, setStartEndPos] = useState<startStop>({start:{y: -1, x: -1}, end: {y: -1, x: -1}})


    return(
        <div className="fdc">
            <DndProvider backend={HTML5Backend}>

                <div className='toolbar fdr'>
                    <SvgTotem totemType='s'/>
                    <SvgTotem totemType='e'/>
                    <CellTotem totemType='w'/>
                    <CellTotem totemType='erase'/>
                    
                </div>

                <div className="matrix">
                    {matrix.map((row : string[], y: number)=>   
                        <div id={`row-${y}`} className='udc' key={y}>
                            {
                                row.map((cellValue: string, x: number) =>
                                
                                <GraphMatrixItem 
                                    matrixState={matrixState}
                                    cellValue={cellValue} 
                                    startEndState={{startEndPos, setStartEndPos}} 
                                    pos={{y, x}}
                                    key={`${y}${x}`}
                                
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