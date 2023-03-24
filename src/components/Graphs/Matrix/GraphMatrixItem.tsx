import React, {useEffect, useState} from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../generalComponents/DSACanvas/utils/dragDropConstraints";
import SvgTotem from "./SvgTotem";
import { startStop, pos } from "../../types/positions";

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


const CONDITIONAL_STYLING:{[key:string]: string} = {'w' : 'wall' ,
                                                    'v1' : 'visited-1',
                                                    'v2' : 'visited-2',
                                                    'v3' : 'visited-3',
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
        const currDragging = itemType.totemType;
        const inclusions: string[] = ['w', 'erase']
       
        if (!inclusions.includes(currDragging)) return

        const newMatrix = [...matrix];
        switch(currDragging){
            case'w':
                newMatrix[y][x] = 'w'
                setMatrix(prev => newMatrix)
                break
            case 'erase':
                newMatrix[y][x] = ''
                setMatrix(prev => newMatrix)
                break
            default:
                break
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

    return(
        <div 
            className={`tile udc ${CONDITIONAL_STYLING[cellValue] ? CONDITIONAL_STYLING[cellValue] : ''}`} 
            ref={drop}
        >
           {cellValue === 's'  && <SvgTotem totemType={cellValue}/>}
           {cellValue === 'e'  && <SvgTotem totemType={cellValue}/>}
           
           
        </div>
    );

}

export default GraphMatrixItem;