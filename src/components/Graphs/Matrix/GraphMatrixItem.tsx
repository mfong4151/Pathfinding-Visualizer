import React, {useEffect, useState} from "react";
import { Props} from "../commonInterface/modelMatrixState"



//probably will want to refactor to take props
const GraphMatrixItem: React.FC<Props> = ({matrixState}) =>{
    const [tileFocus, setTileFocus] = useState('')
    const [tileContent, setTileContent] = useState('')
    const {matrix, setMatrix} = matrixState;
    const wallOnConditions = ['start', 'end', 'wall']

    
    return(
        <div className={`tile ${tileFocus} ${tileContent}

            `} 
        onMouseEnter={()=> setTileFocus('')}
        onMouseLeave={()=>setTileFocus('')}
        onMouseDown={()=>setTileContent(!wallOnConditions.includes(tileContent) ? 'wall' : '')}
        />
    );

}

export default GraphMatrixItem;