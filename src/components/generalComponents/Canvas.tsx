import React, { useEffect } from 'react'
import { useRef } from 'react';
import {DndProvider, useDrag, useDrop} from "react-dnd"
import { HTML5Backend } from 'react-dnd-html5-backend';

const Canvas: React.FC = () => {  

  //inside div should be a .map function  
  const temp : number[] = [  1, 2, 3];



    
  return (
    <>
      <DndProvider backend={HTML5Backend}>
         <div className="canvas-toolbar">


         </div>
        
         <div className='canvas'>
            {temp.map((node : number, idx) =>


                  <div className="node"> 
                    {node} 
                  </div>
            )}


          </div>
        </DndProvider>
     </>
    )
      
}
 
  
  

export default Canvas
