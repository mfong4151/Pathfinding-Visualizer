import React, {useState } from 'react'
import CanvasNode from './CanvasNode';
import { Props } from '../../generalComponents/interface/CanvasGridItemProps';
import {useDrop} from 'react-dnd'
import { ItemTypes } from './utils/dragDropConstraints';
import './DSACanvas.css'

const CanvasItem: React.FC<Props> = ({pos, hasNode, canvasItemDim }) => {  
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
        }), [canvasItemContent]
  )  

  //temporary variable for testing purposes, delete in styles after finished, also delete the -2

  return (
    <div className='canvas-item udc'
      ref={drop}
      style={isOver ?{width: gridItemWidth - 2, height: gridItemHeight -2, backgroundColor: 'yellow'}
                  : {width: gridItemWidth - 2, height: gridItemHeight -2}
              }
      >
        {canvasItemContent && 
          <CanvasNode 
            setCanvasItemContent={setCanvasItemContent}
            canvasItemDim={canvasItemDim}
        
          />
        }
    </div>
  )
}

export default CanvasItem;
