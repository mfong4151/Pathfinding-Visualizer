import React from 'react'
import { useDrag, useDrop} from 'react-dnd'
//helper component to help keep code clean
//Basically a wrapper for useDrag from 'react-dnd'



export const useUseDrag = (itemType:string) => {
  return useDrag(()=>({
    type: itemType,
    collect: (monitor) =>({
      isDragging: !!monitor.isDragging()

    })
  }))
}


// export const useuseDrop = (itemType: string, dropCallBack:) =>{

  
// useDrop(
//   ()=> ({
//       accept: ItemTypes.CANVAS_NODE,
//       drop: () => setCanvasItemContent(!canvasItemContent),
//       collect: (monitor) => ({
//           isOver: !!monitor.isOver()

//         })
//       }), [canvasItemContent]
// )  


// }


