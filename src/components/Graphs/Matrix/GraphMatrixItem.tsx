import React, {useEffect, useState} from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../generalComponents/DSACanvas/utils/dragDropConstraints";
import SvgTotem from "./SvgTotem";

type position = {
    x:number;
    y:number;
}

interface Props{
    matrixState:{
        matrix: Array<any>;
        setMatrix: React.Dispatch<React.SetStateAction<Array<any>>>;
    } 
    mouseDownState:{
        mouseDown: boolean;
        setMouseDown: React.Dispatch<React.SetStateAction<boolean>>
    }
    pos:{
        row:number;
        col:number;
    }

    startStopPos:{
        start: position;
        stop: position;
    }
    totemState:{
        heldTotem: string;
        setHeldTotem: React.Dispatch<React.SetStateAction<string>>;
    }
} 


//probably will want to refactor to take props
const GraphMatrixItem: React.FC<Props> = ({matrixState, mouseDownState, pos, totemState}) =>{
    const [tileFocus, setTileFocus] = useState('');
    const {matrix, setMatrix} = matrixState;
    const {mouseDown, setMouseDown} = mouseDownState;
    const {row, col} = pos;

    const renderContents = (matrixContents:string)=>{
        if(!!matrixContents) return 
        else return ''
    }

    const updateMatrix = () =>{
        const newMatrix = [...matrix];
        newMatrix[row][col] = totemState.heldTotem
        matrixState.setMatrix(prev => newMatrix)

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
            newMatrix[row][col] = 'wall'
            setMatrix(prev =>newMatrix)

        }else if (matrix[row][col] === 'wall'){
            newMatrix[row][col] = ''
            setMatrix(prev => newMatrix)
        }
        
        return
    }



    // still having issues with the entire on mouse sequence, need to refactor so that if it leaves the square then it turns back to normal
    return(
        <div className={`tile udc ${matrix[row][col]}`} 
            ref={drop}
            onMouseEnter={e=>handleMouseEnter(e)}
            onMouseDown={()=> setMouseDown(true)}
            onMouseUp={()=> setMouseDown(false)}
        >
           {matrix[row][col] === 's' && <SvgTotem totemType={'s'} setHeldTotem={totemState.setHeldTotem}/>}
           {matrix[row][col] === 'e' && <SvgTotem totemType={'e'} setHeldTotem={totemState.setHeldTotem}/>}
        </div>
    );

}

export default GraphMatrixItem;