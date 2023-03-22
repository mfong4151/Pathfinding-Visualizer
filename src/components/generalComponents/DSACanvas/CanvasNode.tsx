import React from 'react'
import { ItemTypes } from './utils/dragDropConstraints';
import { useDrag } from 'react-dnd';



const CanvasNode: React.FC = () => {
  
  const [{isDragging}, drag] = useDrag(()=>({
    type: ItemTypes.CANVAS_NODE,
    collect: (monitor) =>({
      isDragging: !!monitor.isDragging()
    })
  }))

  return (
    
      <button 
        className='node' 
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
          fontSize: 25,
          fontWeight: 'bold',
          cursor: 'move',
        }}
      >
        {}
      </button>
  )
}

export default CanvasNode
