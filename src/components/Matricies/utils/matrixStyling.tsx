
export const styleElement = (coords:number[], style: string, stagger: number = 1):void =>{
    setTimeout(()=>{
    const currEle: HTMLElement = document.getElementById(`cell-${coords[0]}-${coords[1]}`)!;
    currEle.className = `${currEle?.className} ${style}`;
    },stagger
     )
  }


//used for styling element synchronously
export const styleElementSync = (coords:number[], style: string):void =>{

    const el: HTMLElement = document.getElementById(`cell-${coords[0]}-${coords[1]}`)!;
    el.className = `${el?.className} ${style}`;
  }

//Used to reset an element style.

export const resetStyleSync = (coords:number[], style: string, stagger: number = 1):void =>{

    const el: HTMLElement = document.getElementById(`cell-${coords[0]}-${coords[1]}`)!;
    el.className = `${style}`;
  }


export  const styleShortestPath = (path:number[][]):void =>{
    for(let i:number = 0; i < path.length; i++) styleElement(path[i], 'shortest-path', i * 20)
  }

  export  const styleShortestPathSync = (path:number[][]):void =>{
    for(let i:number = 0; i < path.length; i++) styleElement(path[i], 'shortest-path-sync')
  }