import {FC, useRef, useState, useEffect} from "react";
import GraphMatrixItem from "./GraphMatrixItem"
import { startStop } from "../../../types/positions";
import { DndProvider} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { consoleContentState, matrixStates } from "../../../types/state";
import { matrixItemObject } from "../../../types/objects";
import EditColorModal from "./EditColorModal";
import useEditColorStates from "../../../hooks/useCustomColorStates";
import DragDropTotems from "./DragDropTotems";
import styled, {keyframes} from "styled-components";
import { calculateResize } from "../../../utils/resizeCanvas";
import useWindowSize from "../../../hooks/useWindowSize";
import { StateSetter } from "../../../types/setState";
import { transplantMatrix } from "../../MatrixRemote/utils/graphUtils";

 interface Props{
    matrixStates:matrixStates;
    consoleContentState: consoleContentState;
    matrixRef:React.MutableRefObject<any>;
    matHolderRef:React.MutableRefObject<any>;
    isPlaying: boolean;
    
} 

const TOOLBAR_HEIGHT: number = 128;
const GraphMatrix: FC<Props> = ({matrixStates, consoleContentState, matrixRef, matHolderRef, isPlaying})=>{
    const [mouseDown, setMouseDown] = useState<boolean>(false);
    const [wallColor, setWallColor] = useState<string>('');
    const [editColorModal, setEditColorModal] = useState<boolean>(false);
    const windowDim = useWindowSize();
    const  {matrix, setMatrix, matrixDim, startEndPos, setStartEndPos} = matrixStates;

    //We might be able to bust these out into a custom hook and reuse them 
  
      
    const startPosBtnRef = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        matrixRef.current = document.getElementById("matrix");
      }, [matrix])
  
  
    useEffect(()=>{
  
        const matrixDiv = matrixRef.current!;  
        const matHolderDiv = matHolderRef.current!;
  
        if(isPlaying  || (!matrixDiv)) return 
        
        const [rows, cols]:[number, number] = calculateResize(matrixDim, matrixDiv, matHolderDiv)
        
        const [newMatrix, newStartEnd]:[matrixItemObject[][], startStop] = transplantMatrix(rows, cols, startEndPos)
        
        setMatrix(newMatrix)
        setStartEndPos(newStartEnd)
  
      },[windowDim, matrixRef.current!])

    return(
        <DndProvider backend={HTML5Backend}>
            <div id='matrix-tab' className="fdc" >   
                <div id='toolbar' className="fdr udc-right">

                {/* <div id='toolbar-left' className="udc">
                    <div id='change-color' className="hover-over drag-icon-holder udc fdc" 
                        onMouseEnter={()=> setConsoleContent(["Click this button to change your color scheme!"])}
                        onMouseLeave={()=> setConsoleContent([])}
                        >

                        <button className="tile" 
                                style={{backgroundColor: color1}} 
                                ref={startPosBtnRef} 
                                onClick ={() =>setEditColorModal( true)}
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
                <div id='matrix-holder' ref={matHolderRef}>

                    <div id="matrix" 
                        onMouseDown={()=> setMouseDown( true)} 
                        onMouseUp={()=> setMouseDown( false )}
                        onMouseLeave={()=> setMouseDown( false )}
                        ref={matrixRef}
                        >
                        {matrix.map((row : matrixItemObject[], y: number)=>   
                            <div id={`row-${y}`} className='udc' key={y}>
                                {
                                    row.map((matrixItemObject: matrixItemObject, x: number) =>
                                    
                                    <GraphMatrixItem 
                                    matrixState={{matrix, setMatrix}}
                                    matrixItemObject={matrixItemObject} 
                                    startEndState={{startEndPos, setStartEndPos}} 
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
                

            {editColorModal && <EditColorModal 
                                            position={{left:startPosBtnRef.current!.offsetLeft, 
                                                top:startPosBtnRef!.current!.offsetTop + startPosBtnRef!.current!.offsetHeight}}
                                                colorModalState={{editColorModal, setEditColorModal}}
                                                />}
        </div>
    </DndProvider>
    )
}


export default GraphMatrix;