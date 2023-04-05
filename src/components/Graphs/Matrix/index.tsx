import React from "react";
import GraphMatrixItem from "./GraphMatrixItem"
import { startStop } from "../../types/positions";
import { DndProvider} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SvgTotem from './SvgTotem'
import CellTotem from "./CellTotem";
import { consoleContentState, matrixState } from "../../types/state";
import { matrixItemObject } from "../../types/objects";

export interface Props{
    matrixState:matrixState;
    startEndState:{
        startEndPos:startStop;
        setStartEndPos: React.Dispatch<React.SetStateAction<startStop>>;
    }
    consoleContentState: consoleContentState;
    matrixRef:React.MutableRefObject<any>;
} 



const GraphMatrix: React.FC<Props> = ({matrixState, startEndState, consoleContentState, matrixRef})=>{
    const {matrix} = matrixState;


    return(
        <div id='matrix-tab' className="fdc univ-padding" ref={matrixRef}>
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

                    
            
                    
                </div>

                <div className="matrix">
                    {matrix.map((row : matrixItemObject[], y: number)=>   
                        <div id={`row-${y}`} className='udc' key={y}>
                            {
                                row.map((matrixItemObject: matrixItemObject, x: number) =>
                                
                                <GraphMatrixItem 
                                    matrixState={matrixState}
                                    matrixItemObject={matrixItemObject} 
                                    startEndState={startEndState} 
                                    consoleContentState={consoleContentState}
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