import React, { useEffect} from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./utils/dragDropConstraints";
import SvgTotem from "./Totems/SvgTotem";
import { startStop, pos } from "../../types/positions";
import { consoleContentState, startEndState} from "../../types/state";
import '../Matricies/graphs.css'
import { matrixItemObject } from "../../types/objects";
import { StateSetter } from "../../types/setState";

interface Props{
    matrixState: {matrix: matrixItemObject[][], setMatrix: StateSetter<matrixItemObject[][]>};
    matrixItemObject: matrixItemObject;
    startEndState: startEndState;
    consoleContentState: consoleContentState;
    pos:pos
    mouseDown: boolean
    setMouseDown: React.Dispatch<React.SetStateAction<boolean>>
} 


//probably will want to refactor to take props
const GraphMatrixItem: React.FC<Props> = ({matrixState, matrixItemObject, consoleContentState, pos, startEndState, mouseDown, setMouseDown}) =>{
    const {matrix, setMatrix} = matrixState;
    const {startEndPos} = startEndState;
    const {y, x} = pos; 

    const [{isOver}, drop] = useDrop(
        ()=> ({
            accept: ItemTypes.MATRIX_CELL,
            drop: (item, monitor) => updateStartStop(item),
            collect: (monitor) => ({
                isOver: !!monitor.isOver()
      
              })
            }), [matrix]
      )  


   const handleMouseEnter =(e:any):void =>{
       const [_ ,j, i ]=e.target.id.split('-')
       const y = Number(i);
       const x = Number(j);
       const exclusions: string[] = ['s', 'e']
       const newMatrix = [...matrix];

        if (mouseDown && !exclusions.includes(newMatrix[y][x].val)){
            newMatrix[y][x].val = newMatrix[y][x].val === 'w' ? '' : 'w'
            setMatrix(newMatrix)
        }
   
        return
    }

    useEffect(()=>{
        setMouseDown(false)
    },[isOver])

    const updateStartStop = (itemType :any):void =>{
        const droppedTotem: string= itemType.totemType;
        const newMatrix: matrixItemObject[][] = [...matrix];
        const newStartEndPos:startStop = {...startEndPos}

        switch(droppedTotem){
            case 's':
                const newStart: pos = newStartEndPos.start
                if (newStart.y !== -1 && newStart.x !== -1) newMatrix[newStart.y][newStart.x].val = ''
                newMatrix[y][x].val = 's'
                newStart.y = y;
                newStart.x = x;
                consoleContentState.setConsoleContent([`The location to start at has been set to ${newStart.y}, ${newStart.x}`])

                break
            case 'e':
                const newEnd: pos = newStartEndPos.end
                if (newEnd.y !== -1 && newEnd.x !== -1) newMatrix[newEnd.y][newEnd.x].val = ''
                newMatrix[y][x].val = 'e'
                newEnd.y = y;
                newEnd.x = x;
                consoleContentState.setConsoleContent([`The location to end at has been set to ${newEnd.y}, ${newEnd.x}`])

                break
            default:
                return                
        }

        
        newMatrix[y][x].val = droppedTotem
        setMatrix(newMatrix)
        return
    }



    return(
        <div 
            id={`cell-${x}-${y}`}
            className={`tile udc ${matrixItemObject.val === 'w' ? 'wall' : ''}`} 
            ref={drop}
            onMouseEnter={handleMouseEnter}
        >
           {matrixItemObject.val === 's'  && <SvgTotem totemType={matrixItemObject.val}/>}
           {matrixItemObject.val === 'e'  && <SvgTotem totemType={matrixItemObject.val}/>}
           
           
        </div>
    );

}

export default GraphMatrixItem;