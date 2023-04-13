import React, { useEffect, useState } from "react";
import GraphMatrixItem from "./GraphMatrixItem"
import { startStop } from "../../types/positions";
import { DndProvider} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SvgTotem from './SvgTotem'
import CellTotem from "./CellTotem";
import { consoleContentState, matrixState } from "../../types/state";
import { matrixItemObject } from "../../types/objects";
import { SliderPicker } from "@hello-pangea/color-picker"; //pass on change to this in order to get color

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
    const [mouseDown, setMouseDown] = useState<boolean>(false);
    const [wallColor, setWallColor] = useState<string>('')
    const [startColor, setStartColor] = useState<string>('')
    const [endColor, setEndColor] = useState<string>('')
    const [shortestPathColor, setShortestPathColor] = useState<string>('')


    return(
        <div id='matrix-tab' className="fdc univ-padding" >
            {/* <SliderPicker/> */}
            <DndProvider backend={HTML5Backend}>

                <div className='toolbar fdr'>
                    <div className="hover-over drag-icon-holder udc fdc">

                         <SvgTotem totemType='s'/>
                         <p className="toolbar-text">Start</p>
                         
                    </div>
                    <div className="hover-over drag-icon-holder udc fdc">
                         <SvgTotem totemType='e'/>
                         <p className="toolbar-text">Stop</p>

                    </div>
                    <div className="hover-over drag-icon-holder udc fdc">
                        <CellTotem totemType='w'/>
                        <p className="toolbar-text">Wall Color</p>

                    </div>
                    {/* <div className="hover-over drag-icon-holder udc fdc">
                        <CellTotem totemType=''/>
                        <p className="toolbar-text">Start Color</p>

                    </div>
                    <div className="hover-over drag-icon-holder udc fdc">
                        <CellTotem totemType=''/>
                        <p className="toolbar-text">End Color</p>

                    </div>
                    <div className="hover-over drag-icon-holder udc fdc">
                        <CellTotem totemType=''/>
                        <p className="toolbar-text">Shortest Path </p>

                    </div> */}
                 
                    
                </div>

                <div id="matrix" onMouseDown={()=> setMouseDown(prev => true)} 
                    onMouseUp={()=> setMouseDown(prev => false )}
                    onMouseLeave={()=> setMouseDown(prev => false )}
                    ref={matrixRef}
                    >
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
                                    mouseDown={mouseDown}
                                    setMouseDown ={setMouseDown}
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