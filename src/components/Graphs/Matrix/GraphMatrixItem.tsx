import React, {useEffect, useState} from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../generalComponents/DSACanvas/utils/dragDropConstraints";
import SvgTotem from "./SvgTotem";
import { startStop, pos } from "../../types/positions";
import { consoleContentState, matrixState, startEndState} from "../../types/state";
import '../../Graphs/graphs.css'
import { matrixItemObject } from "../../types/objects";

interface Props{
    matrixState: matrixState;
    matrixItemObject: matrixItemObject;
    startEndState: startEndState;
    consoleContentState: consoleContentState;
    pos:pos

} 


//probably will want to refactor to take props
const GraphMatrixItem: React.FC<Props> = ({matrixState, matrixItemObject, consoleContentState, pos, startEndState}) =>{
    const {matrix, setMatrix} = matrixState;
    const {startEndPos} = startEndState;
    const {y, x} = pos; 
    
    const updateStartStop = (itemType :any) =>{
        const droppedTotem: string= itemType.totemType;
        const newMatrix: matrixItemObject[][] = [...matrix];
        const newStartEndPos:startStop = {...startEndPos}
        let res:string;

        switch(droppedTotem){
            case 's':
                const newStart: pos = newStartEndPos.start
                if (newStart.y !== -1 && newStart.x !== -1) newMatrix[newStart.y][newStart.x].val = ''
                newMatrix[y][x].val = 's'
                newStart.y = y;
                newStart.x = x;
                consoleContentState.setConsoleContent(prev => ({'msg': `The location to start at has been set to ${newStart.y}, ${newStart.x}` }))

                break
            case 'e':
                const newEnd: pos = newStartEndPos.end
                if (newEnd.y !== -1 && newEnd.x !== -1) newMatrix[newEnd.y][newEnd.x].val = ''
                newMatrix[y][x].val = 'e'
                newEnd.y = y;
                newEnd.x = x;
                consoleContentState.setConsoleContent(prev => ({'msg': `The location to end at has been set to ${newEnd.y}, ${newEnd.x}` }))

                break
            default:
                return                
        }

        
        newMatrix[y][x].val = droppedTotem
        setMatrix(newMatrix)
        return
    }

    const updateWalls = (itemType: any) =>{
        const currDragging = itemType.totemType;
        const inclusions: string[] = ['w', 'erase']
        const exclusions: string[] = ['s', 'e']
        if (!inclusions.includes(currDragging)) return

        const newMatrix = [...matrix];
        switch(currDragging){
            case'w':
                newMatrix[y][x].val = !exclusions.includes(newMatrix[y][x].val) ? 'w' : newMatrix[y][x].val
                setMatrix(prev => newMatrix)
                break
            case 'erase':
                newMatrix[y][x].val = !exclusions.includes(newMatrix[y][x].val) ? '' : newMatrix[y][x].val
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
            id={`cell-${x}-${y}`}
            className={`tile udc ${matrixItemObject.val === 'w' ? 'wall' : ''}`} 
            ref={drop}
        >
           {matrixItemObject.val === 's'  && <SvgTotem totemType={matrixItemObject.val}/>}
           {matrixItemObject.val === 'e'  && <SvgTotem totemType={matrixItemObject.val}/>}
           
           
        </div>
    );

}

export default GraphMatrixItem;