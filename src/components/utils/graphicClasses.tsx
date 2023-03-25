

export class GraphicNode{
    id: number;
    type: string;
    subtype: string;
    style: string;
    neighbors: Array<GraphicNode> | undefined;
    left: GraphicNode| undefined;
    right: GraphicNode| undefined;
    prev: GraphicNode| undefined;
    next: GraphicNode| undefined;

    constructor(id: number, type :string, subtype: string = '', style: string, 
            neighbors?: GraphicNode[], left?: GraphicNode, right?: GraphicNode, 
            next?: GraphicNode, prev?: GraphicNode
    ){
        this.id = id;
        this.type = type;
        this.subtype = subtype;
        this.style = style;
        this.neighbors = neighbors;
        this.left = left;
        this.right = right;
        this.next = next;
        this.prev = prev;
        this.next = next;
        
    }

}

export class Edges{
    constructor( ) {
        
    }
}

