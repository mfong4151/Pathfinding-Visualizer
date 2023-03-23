import React, { useEffect } from 'react'
import Start from './Start'
import End from './End'
import { ItemTypes } from '../../../generalComponents/DSACanvas/utils/dragDropConstraints'
import {useUseDrag} from '../../../customHooks/useReactDND'

interface Props{
    totemType: string
    setHeldTotem: React.Dispatch<React.SetStateAction<string>>
}


const SvgTotem: React.FC<Props> = ({totemType, setHeldTotem}) => {

  const [{isDragging}, drag] = useUseDrag(ItemTypes.MATRIX_CELL)
  useEffect(()=>{
    setHeldTotem(totemType.slice(0,1))
  },[isDragging])
  
  return (
    <div
      ref={drag}

      >
      {totemType === 'start' && <Start/>}
      {totemType === 'end' && <End/>}
    </div>
  )
}


export default SvgTotem
