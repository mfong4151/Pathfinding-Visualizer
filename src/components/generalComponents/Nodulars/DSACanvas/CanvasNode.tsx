import React, {useEffect, useState} from 'react'
import { ItemTypes } from './utils/dragDropConstraints';
import './DSACanvas.css'
import {useUseDrag} from '../../../customHooks/useReactDND';

interface Props{
  setCanvasItemContent:React.Dispatch<React.SetStateAction<boolean>> | null
  canvasItemDim:{
    width: number,
    height: number,
  }
}


const CanvasNode: React.FC<Props> = ({setCanvasItemContent, canvasItemDim}) => {
  const [nodeValue, setNodeValue] = useState<number | null>(null)
  const [errors, setErrors] = useState<Array<string>>([''])
  const {width, height} = canvasItemDim;

  const [{isDragging}, drag] = useUseDrag(ItemTypes.CANVAS_NODE)

  useEffect(()=>{
    if (isDragging && setCanvasItemContent) setCanvasItemContent(false)
  },[isDragging])


  return (
     
      <div 
        className='node udc' 
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move',
        }}
      >

        <svg height={height} width={width}>
          <circle cx={width/2 - 10} cy={height/2} r={width/2 - 12} stroke="white" stroke-width="3" fill="transparent" />
        </svg> 
        <form className='node-form udc'>
          <input className='node-input' type="text"onChange={e =>setNodeValue(Number(e.target.value))}/>
        </form>
      </div>
  )
}

export default CanvasNode
