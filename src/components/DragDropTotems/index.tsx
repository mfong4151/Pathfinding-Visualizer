import React, {FC} from 'react'
import SvgTotem from './SvgTotem'
import CellTotem from './CellTotem'
import '../Matricies/graphs.css'


const DragDropTotems:FC = () => {
  return (
    <div className='toolbar-right fdr'>
        <div className="hover-over drag-icon-holder udc fdc">

             <SvgTotem totemType='s'/>
             <p className="toolbar-text">Start</p>

        </div>
        <div className="hover-over drag-icon-holder udc fdc">
             <SvgTotem totemType='e'/>
             <p className="toolbar-text">Stop</p>

        </div>
        <div className="hover-over drag-icon-holder udc fdc">
            <CellTotem/>
            <p className="toolbar-text">Walls</p>

        </div>


    </div>
  )
}

export default DragDropTotems
