import React, {FC} from 'react'
import Start from './Start'
import End from './End'
import { ItemTypes } from '../dragDropConstraints'
import { useDrag } from 'react-dnd'

interface Props{
    totemType: string
}


const SvgTotem:FC<Props> = ({totemType}) => {

  const [_, drag] = useDrag(()=>({
      type: ItemTypes.MATRIX_CELL,
      item:{totemType},
      collect: (monitor) =>( {
        isDragging: !!monitor.isDragging()

      })
    }))


  return (
    <div className='matrix-totem' ref={drag}>
      {totemType === 's' && <Start/>}
      {totemType === 'e' && <End/>}
    </div>
  )
}


export default SvgTotem
