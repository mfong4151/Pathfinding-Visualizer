import { matrixItemObject } from "../../../../../types/objects";

const convertContainer = (container:matrixItemObject[]):string =>{

    let res:string[] = [];

    for(const node of container) res.push(`[${node.pos[0]}, ${node.pos[1]}]`)

    return `[${res.join(' ,')}]`;
}


export default convertContainer;