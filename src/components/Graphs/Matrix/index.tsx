import React, { useState} from "react";
import GraphMatrixItem from "./GraphMatrixItem"
import { startStop } from "../../types/positions";
import { DndProvider} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SvgTotem from './SvgTotem'
import CellTotem from "./CellTotem";

export interface Props{
    matrixState:{
        matrix: Array<any>;
        setMatrix: React.Dispatch<React.SetStateAction<Array<any>>>;
    }
    startEndState:{
        startEndPos:startStop;
        setStartEndPos: React.Dispatch<React.SetStateAction<startStop>>;
    }
} 



const GraphMatrix: React.FC<Props> = ({matrixState, startEndState})=>{
    const {matrix} = matrixState;


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
                                    startEndState={startEndState} 
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