import React, {useEffect, useState} from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../generalComponents/DSACanvas/utils/dragDropConstraints";
import SvgTotem from "./SvgTotem";

interface Props{
    matrixState:{
        matrix: Array<any>;
        setMatrix: React.Dispatch<React.SetStateAction<Array<any>>>;
    }
    cellValue: string;
    mouseDownState:{
        mouseDown: boolean;
        setMouseDown: React.Dispatch<React.SetStateAction<boolean>>
    }
    pos:{
        row:number;
        col:number;
    }
    totemState:{
        heldTotem: string;
        setHeldTotem: React.Dispatch<React.SetStateAction<string>>;
    }
} 


//probably will want to refactor to take props
const GraphMatrixItem: React.FC<Props> = ({matrixState, cellValue, mouseDownState, pos, totemState}) =>{
    const {matrix, setMatrix} = matrixState;
    const {mouseDown, setMouseDown} = mouseDownState;
    const {row, col} = pos;

    const renderContents = (matrixContents:string)=>{


    }

    const updateMatrix = () =>{
        const newMatrix = [...matrix];
        newMatrix[row][col] = 's'
        setMatrix(newMatrix)
    }

    
    const [{isOver}, drop] = useDrop(
        ()=> ({
            accept: ItemTypes.MATRIX_CELL,
            drop: () => updateMatrix(),
            collect: (monitor) => ({
                isOver: !!monitor.isOver()
      
              })
            }), [matrix]
      )  

    
    const handleMouseEnter = (e: React.FormEvent) =>{
        e.stopPropagation();


        if (!mouseDown) return

        const newMatrix = [...matrix];

        if(matrix[row][col] ===''){
            newMatrix[row][col] = 'w'
            setMatrix(prev =>newMatrix)

        }else if (matrix[row][col] === 'w'){
            newMatrix[row][col] = ''
            setMatrix(prev => newMatrix)
        }
        
        return
    }



    // still having issues with the entire on mouse sequence, need to refactor so that if it leaves the square then it turns back to normal
    return(
        <div className={`tile ${cellValue === 'w' ? 'wall' : ''}`} 
            ref={drop}
            onMouseEnter={e=>handleMouseEnter(e)}
            onMouseDown={()=> setMouseDown(true)}
            onMouseUp={()=> setMouseDown(false)}
        >
           {cellValue === ('s' || 'e' ) && <SvgTotem totemType={cellValue} setHeldTotem={totemState.setHeldTotem}/>}
           
           
        </div>
    );

}

export default GraphMatrixItem;