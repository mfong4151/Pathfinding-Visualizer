import React, { useEffect } from 'react'
import Start from './Start'
import End from './End'
import { ItemTypes } from '../../../generalComponents/Nodulars/DSACanvas/utils/dragDropConstraints'
import {useUseDrag} from '../../../customHooks/useReactDND'
import { useDrag } from 'react-dnd'

interface Props{
    totemType: string
}


const SvgTotem: React.FC<Props> = ({totemType}) => {

  const [collected, drag] = useDrag(()=>({
      type: ItemTypes.MATRIX_CELL,
      item:{totemType},
      collect: (monitor) =>( {
        isDragging: !!monitor.isDragging()

      })
    }))


  return (
    <div ref={drag}>
      {totemType === 's' && <Start/>}
      {totemType === 'e' && <End/>}
    </div>
  )
}


export default SvgTotem
