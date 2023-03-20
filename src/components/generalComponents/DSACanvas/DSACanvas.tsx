import React from 'react'
import CanvasGrid from './CanvasGrid';
import {DndProvider, useDrag, useDrop} from "react-dnd"
import { HTML5Backend } from 'react-dnd-html5-backend';
import { generateCanvas } from './utils/canvasMethods';


const DSACanvas: React.FC = () => {  

  //inside div should be a .map function  
  const temp : number[] = [  1, 2, 3];
  const canvasMatrix: string[][] = generateCanvas();


    
  return (
    <div className="fdc">

      <DndProvider backend={HTML5Backend}>
         <div id='canvas-toolbar' className="udc-left">

          <button className='node'>hello</button>
          <button className='node'>goodbye</button>
         </div>
        
          <div className='canvas'>
              <CanvasGrid/>

          </div>
        </DndProvider>
    </div>
    )
      
}
 
  
  

export default DSACanvas;
