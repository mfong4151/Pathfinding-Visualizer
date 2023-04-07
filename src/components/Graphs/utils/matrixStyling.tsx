export const styleElement = (coords:number[], style: string, stagger: number = 1):void =>{
    setTimeout(()=>{
    let currEle: HTMLElement;
    currEle = document.getElementById(`cell-${coords[0]}-${coords[1]}`)!;
    currEle.className = `${currEle?.className} ${style}`;
    },stagger * 30
     )
  }


//used for styling element synchronously
export const styleElementSync = (coords:number[], style: string, stagger: number = 1):void =>{

    let el: HTMLElement;
    el = document.getElementById(`cell-${coords[0]}-${coords[1]}`)!;
    el.className = `${el?.className} ${style}`;
  }

//Used to reset an element style.

export const resetStyleSync = (coords:number[], style: string, stagger: number = 1):void =>{

    let el: HTMLElement;
    el = document.getElementById(`cell-${coords[0]}-${coords[1]}`)!;
    el.className = `${style}`;
  }


export  const styleShortestPath = (path:number[][]):void =>{
    for(const p of path) styleElement(p, 'shortest-path')
  }