import {FC, useRef, useState } from "react";
import GraphMatrixItem from "./GraphMatrixItem"
import { startStop } from "../../../types/positions";
import { DndProvider} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { consoleContentState, matrixState } from "../../../types/state";
import { matrixItemObject } from "../../../types/objects";
import EditColorModal from "./EditColorModal";
import useEditColorStates from "../../../hooks/useCustomColorStates";
import DragDropTotems from "./DragDropTotems";
import styled, {keyframes} from "styled-components";

 interface Props{
    matrixState:matrixState;
    startEndState:{
        startEndPos:startStop;
        setStartEndPos: React.Dispatch<React.SetStateAction<startStop>>;
    }
    consoleContentState: consoleContentState;
    matrixRef:React.MutableRefObject<any>;
} 


const GraphMatrix: FC<Props> = ({matrixState, startEndState, consoleContentState, matrixRef})=>{
    const {matrix} = matrixState;
    const [mouseDown, setMouseDown] = useState<boolean>(false);
    const [wallColor, setWallColor] = useState<string>('');
    const [editColorModal, setEditColorModal] = useState<boolean>(false);
    //We might be able to bust these out into a custom hook and reuse them 
  
      
    const startPosBtnRef = useRef<HTMLButtonElement>(null);
    

    return(
        <div id='matrix-tab' className="fdc univ-padding" >   
            <DndProvider backend={HTML5Backend}>
                <div>
                    <div id='toolbar' className="fdr udc-right">

                    {/* <div id='toolbar-left' className="udc">
                        <div id='change-color' className="hover-over drag-icon-holder udc fdc" 
                            onMouseEnter={()=> setConsoleContent(["Click this button to change your color scheme!"])}
                            onMouseLeave={()=> setConsoleContent([])}
                            >

                            <button className="tile" 
                                    style={{backgroundColor: color1}} 
                                    ref={startPosBtnRef} 
                                    onClick ={() =>setEditColorModal(prev => true)}
                                />
                            <p> Change your colors! </p>
                        </div>

                        {/* <div id="favorite-maps">
                            <button id="favorite-maps" className="sq-buttons hover-over banner-button">
                                My Favorite Maps
                            </button>
                        </div> 
                    </div> 
                        */}


                    <DragDropTotems/>

                    </div>
                <div id="matrix" 
                    onMouseDown={()=> setMouseDown(prev => true)} 
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
            </div>
                
            </DndProvider>

            {editColorModal && <EditColorModal 
                                            position={{left:startPosBtnRef.current!.offsetLeft, 
                                                        top:startPosBtnRef!.current!.offsetTop + startPosBtnRef!.current!.offsetHeight}}
                                            colorModalState={{editColorModal, setEditColorModal}}
                                        />}
        </div>
    )
}


export default GraphMatrix;