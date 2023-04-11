import React from 'react'
import '../../../Matricies/graphs.css'
import './cells.css'
import { MapConditionalString } from '../../../types/interface';

interface Props{
  totemType: string;
}



const MAP_STYLE:MapConditionalString = {
    'w':'wall'
}

const CellTotem: React.FC<Props> = ({totemType}) => {
  



return (
  <div className={`tile-display ${MAP_STYLE[totemType]}`}>
  </div>
)

}

export default CellTotem
