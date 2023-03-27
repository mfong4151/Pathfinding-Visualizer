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

                <div className='toolbar fdr sb'>
                    <div className="drag-icon-holder udc fdc">
                         <SvgTotem totemType='s'/>
                         <p>Start</p>
                         
                    </div>
                    <div className="drag-icon-holder udc fdc">
                         <SvgTotem totemType='e'/>
                         <p>Stop</p>

                    </div>
                    <div className="drag-icon-holder udc fdc">
                        <CellTotem totemType='w'/>
                        <p>Create Wall</p>

                    </div>
                    <div className="drag-icon-holder udc fdc">
                        <CellTotem totemType='erase'/>
                        <p>Erase wall</p>

                    </div>

                    
                    <div className="drag-icon-holder udc fdc">
                        <CellTotem totemType='toggle-path'/>
                        <p>TogglePath</p>

                    </div>




                    
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