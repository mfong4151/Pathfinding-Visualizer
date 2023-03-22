import React, { useState } from 'react'
import CanvasNode from './CanvasNode';
import { Props } from '../interface/CanvasGridItemProps';
import {useDrop} from 'react-dnd'
import { ItemTypes } from './utils/dragDropConstraints';
import { hoverOverStyles } from './utils/conditionalStyles';

const CanvasItem: React.FC<Props> = ({i, hasNode, canvasItemDim }) => {  
  const gridItemWidth = canvasItemDim.width;
  const gridItemHeight = canvasItemDim.height;
  const [canvasItemContent, setCanvasItemContent] = useState<boolean>(hasNode)


  const [{isOver}, drop] = useDrop(
  ()=> ({
    accept: ItemTypes.CANVAS_NODE,
    drop: () => setCanvasItemContent(!canvasItemContent),
    collect: (monitor) => ({
        isOver: !!monitor.isOver()

      })
    }), [i]
  )


  //temporary variable for testing purposes, delete in styles after finished, also delete the -2
  const bw = i % 2  === 0 ? 'black' : 'white'

  return (
    <div className='canvas-item'
    ref={drop}
      style={ isOver ? hoverOverStyles() : {width: gridItemWidth - 2, height: gridItemHeight -2, backgroundColor: bw}}
      >
        {canvasItemContent && <CanvasNode/>}
    </div>
  )
}

export default CanvasItem;
