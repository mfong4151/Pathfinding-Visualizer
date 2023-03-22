import React from 'react'
import { ItemTypes } from './utils/dragDropConstraints';
import { useDrag } from 'react-dnd';

interface Props{
    nodeValue: string;
}

const CanvasNode: React.FC<Props> = ({nodeValue}) => {
  
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
        {nodeValue}
      </button>
  )
}

export default CanvasNode
