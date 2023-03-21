import React, {useState } from 'react'
import CanvasItem from './CanvasItem';
import {DndProvider, useDrag, useDrop} from "react-dnd"
import { HTML5Backend } from 'react-dnd-html5-backend';

const DSACanvas: React.FC = () => {  
  const canvasContents = [];
  const [canvasWidth , setCanvasWidth] = useState(800);
  const [canvasHeight, setCanvasHeight] = useState(800);
  const canvasItemDim = {width:80, height:80}
  
  for(let i: number = 0; i < (canvasWidth * canvasHeight)/(canvasItemDim.width * canvasItemDim.height); i++) 
    canvasContents.push(
          <CanvasItem i={i} 
              nodeValue={''} 
              canvasItemDim={canvasItemDim}
          />)
  
    
  return (
    <div className="fdc">

      <DndProvider backend={HTML5Backend}>
         <div id='canvas-toolbar' className="udc-left">

          <button className='node'>hello</button>
          <button className='node'>goodbye</button>
         </div>
        
          <div className='canvas' style={{width: canvasWidth, height: canvasHeight}} >
              {canvasContents}
          </div>
        </DndProvider>
    </div>
    )
      
}
 
  
  

export default DSACanvas;
