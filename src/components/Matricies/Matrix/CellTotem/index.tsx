import React from 'react'
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../../generalComponents/Nodulars/DSACanvas/utils/dragDropConstraints';
import '../../../Matricies/graphs.css'

interface Props{
  totemType: string;
}

const CellTotem: React.FC<Props> = ({totemType}) => {
  

  const [collected, drag] = useDrag(()=>({
    type: ItemTypes.MATRIX_CELL,
    item:{totemType},
    collect: (monitor) =>( {
      isDragging: !!monitor.isDragging()

    })
  }))


return (
  <div ref={drag} className={`tile ${totemType === 'w' && 'wall'} `}>
  </div>
)

}

export default CellTotem
