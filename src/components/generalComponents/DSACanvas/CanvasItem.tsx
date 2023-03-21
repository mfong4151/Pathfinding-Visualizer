import React from 'react'
import CanvasNode from './CanvasNode';
import { Props } from '../interface/CanvasGridItemProps';


const CanvasItem: React.FC<Props> = ({i, nodeValue, canvasItemDim }) => {
  const gridItemWidth = canvasItemDim.width;
  const gridItemHeight = canvasItemDim.height;
  const renderedContent = nodeValue ? <CanvasNode nodeValue={nodeValue}/>: null

  //temporary variable for testing purposes, delete in styles after finished, also delete the -2
  const bw = i % 2  === 0 ? 'black' : 'white'

  return (
    <div className='canvas-item' style={{width: gridItemWidth - 2, height: gridItemHeight -2, backgroundColor: bw}}>
        {renderedContent}
    </div>
  )
}

export default CanvasItem;
