import React, {useState } from 'react'
import CanvasItem from './CanvasItem';
import {DndProvider} from "react-dnd"
import { HTML5Backend } from 'react-dnd-html5-backend';
import CanvasNode from './CanvasNode';
import { generateDefaultCanvas } from './utils/canvasContents';
import { canvasMatrixObject } from '../interface/types';
import './DSACanvas'

const DEFAULT_ITEM_WIDTH:number = 80;
const DEFAULT_ITEM_HEIGHT:number = 80;
const DEFAULT_CANVAS_WIDTH:number = 800;
const DEFAULT_CANVAS_HEIGHT:number = 800;


const DSACanvas: React.FC = () => {  
  const [canvasWidth , setCanvasWidth] = useState(DEFAULT_CANVAS_WIDTH);
  const [canvasHeight, setCanvasHeight] = useState(DEFAULT_CANVAS_HEIGHT);
  const canvasItemDim = {width:DEFAULT_ITEM_WIDTH, height: DEFAULT_ITEM_HEIGHT}
  const canvasContents: canvasMatrixObject[][] = generateDefaultCanvas(canvasWidth, canvasHeight, canvasItemDim) 



  
  return (
    <div className="fdc">

      <DndProvider backend={HTML5Backend}>
         <div id='canvas-toolbar' className="udc-left">
          <CanvasNode 
            setCanvasItemContent={null}
            canvasItemDim={canvasItemDim}
            />

         </div>
        
          <div className='canvas' style={{width: canvasWidth, height: canvasHeight}} >
            {canvasContents.map((row: canvasMatrixObject[]) =>(
              row.map((canvasContent: canvasMatrixObject, idx: number) => 
              <CanvasItem 
                  pos={canvasContent.pos}
                  hasNode={canvasContent.hasNode} 
                  canvasItemDim={canvasContent.canvasItemDim}
                  key={idx}
                  />
                ))
              )}
          </div>
        </DndProvider>
    </div>
    )
      
}
 
  
  

export default DSACanvas;
