import React, {useState} from 'react'
import { ItemTypes } from './utils/dragDropConstraints';
import { useDrag } from 'react-dnd';


// export function moveKnight(toX, toY) {
//   knightPosition = [toX, toY]
//   emitChange()
// }

const CanvasNode: React.FC = () => {
  
  const [nodeValue, setNodeValue] = useState<string>('hello world')
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
