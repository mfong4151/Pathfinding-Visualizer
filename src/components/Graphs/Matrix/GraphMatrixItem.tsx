import React, {useEffect, useState} from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../generalComponents/DSACanvas/utils/dragDropConstraints";
import SvgTotem from "./SvgTotem";
import { startStop, pos } from "../../types/positions";
import { time } from "console";

interface Props{
    matrixState:{
        matrix: Array<any>;
        setMatrix: React.Dispatch<React.SetStateAction<Array<any>>>;
    }
    cellValue: string;
    startEndState:{
        startEndPos: startStop;
        setStartEndPos: React.Dispatch<React.SetStateAction<startStop>>
    }
    pos:pos;

} 


//probably will want to refactor to take props
const GraphMatrixItem: React.FC<Props> = ({matrixState, cellValue, pos, startEndState}) =>{
    const {matrix, setMatrix} = matrixState;
    const {startEndPos} = startEndState;
    const {y, x} = pos; 


    const updateStartStop = (itemType :any) =>{
        const droppedTotem: string= itemType.totemType;
        const newMatrix: string[][] = [...matrix];
        const newStartEndPos:startStop = {...startEndPos}
        let res:string;

        switch(droppedTotem){
            case 's':
                const newStart: pos = newStartEndPos.start
                if (newStart.y !== -1 && newStart.x !== -1) newMatrix[newStart.y][newStart.x] = ''
                newMatrix[y][x] = 's'
                newStart.y = y;
                newStart.x = x;
                
                break
            case 'e':
                const newEnd: pos = newStartEndPos.end
                if (newEnd.y !== -1 && newEnd.x !== -1) newMatrix[newEnd.y][newEnd.x] = ''
                newMatrix[y][x] = 'e'
                newEnd.y = y;
                newEnd.x = x;
                
                break
            default:
                return                
        }


        newMatrix[y][x] = droppedTotem
        setMatrix(newMatrix)
        return
    }

    const updateWalls = (itemType: any) =>{
        
        const newMatrix = [...matrix];

        if(matrix[y][x] ===''){
            newMatrix[y][x] = 'w'
            setMatrix(prev =>newMatrix)

        }else if (matrix[y][x] === 'w'){
            newMatrix[y][x] = ''
            setMatrix(prev => newMatrix)
        } 
        
        return
    }
    const [{isOver}, drop] = useDrop(
        ()=> ({
            accept: ItemTypes.MATRIX_CELL,
            drop: (item, monitor) => updateStartStop(item),
            hover: (item, monitor) => updateWalls(item),
            collect: (monitor) => ({
                isOver: !!monitor.isOver()
      
              })
            }), [matrix]
      )  

    




    // still having issues with the entire on mouse sequence, need to refactor so that if it leaves the square then it turns back to normal
    return(
        <div className={`tile udc ${cellValue === 'w' ? 'wall' : ''}`} 
            ref={drop}
        >
           {cellValue === 's'  && <SvgTotem totemType={cellValue}/>}
           {cellValue === 'e'  && <SvgTotem totemType={cellValue}/>}
           
           
        </div>
    );

}

export default GraphMatrixItem;