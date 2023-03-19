import React, {useEffect, useState} from "react";

export interface Props{
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
} 



//probably will want to refactor to take props
const GraphMatrixItem: React.FC<Props> = ({matrixState, mouseDownState, pos}) =>{
    const [tileFocus, setTileFocus] = useState('');
    const {matrix, setMatrix} = matrixState;
    const {mouseDown, setMouseDown} = mouseDownState;
    const {row, col} = pos;


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
        <div className={`tile ${tileFocus} ${matrix[row][col]}`} 
            onMouseEnter={handleMouseEnter}
            onMouseDown={()=> setMouseDown(true)}
            onMouseUp={()=> setMouseDown(false)}
        >
           
        </div>
    );

}

export default GraphMatrixItem;