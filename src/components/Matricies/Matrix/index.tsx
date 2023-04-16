import React, { useRef, useState } from "react";
import GraphMatrixItem from "./GraphMatrixItem"
import { startStop } from "../../types/positions";
import { DndProvider} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SvgTotem from './SvgTotem'
import CellTotem from "./CellTotem";
import { consoleContentState, matrixState } from "../../types/state";
import { matrixItemObject } from "../../types/objects";
import { SliderPicker } from "@hello-pangea/color-picker"; //pass on change to this in order to get color
import EditColorModal from "./EditColorModal";

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
    //We might be able to bust these out into a custom hook and reuse them 
    const [startColor, setStartColor] = useState<string>('')
    const [shortestPathColor, setShortestPathColor] = useState<string>('')
    const [colorModal, setColorModal] = useState<string>('')
    const [shortestPathColorModal, setShortestPathColorModal] = useState<string>('')
    const [endColor, setEndColor] = useState<string>('')
    const startPosBtnRef = useRef<HTMLButtonElement>(null);

    return(
        <div id='matrix-tab' className="fdc univ-padding" >
            <DndProvider backend={HTML5Backend}>

                {/* <div id='swap-colors-toolbar fdr'>
                    <div className="hover-over drag-icon-holder udc fdc">

                    <button className="tile" ref={startPosBtnRef} onClick={() =>setColorModal('start')}>
                        Button
                    </button>

                    </div>

                </div> */}
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

                    {/* {colorModal ==='start' && <EditColorModal 
                                                position={{left:startPosBtnRef.current!.offsetLeft, 
                                                            top:startPosBtnRef!.current!.offsetTop + startPosBtnRef!.current!.offsetHeight}}
                                                colorModalState={{colorModal, setColorModal}}/>} */}

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