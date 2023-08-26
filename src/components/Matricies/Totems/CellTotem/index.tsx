import React from 'react'
import '../../../Matricies/graphs.css'
import './cells.css'

interface Props{
  totemType: string;
}

const CellTotem: React.FC<Props> = ({totemType}) => {
  
  return (
    <div className={`tile-display 'wall'`}/>
  )

}

export default CellTotem
