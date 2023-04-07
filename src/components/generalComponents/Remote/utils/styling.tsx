export const styleElement = (coords:number[], style: string, stagger: number = 1):void =>{
    setTimeout(()=>{
    let currEle: HTMLElement;
    currEle = document.getElementById(`cell-${coords[0]}-${coords[1]}`)!;
    currEle.className = `${currEle?.className} ${style}`;
    },stagger * 30
     )
  }

export  const styleShortestPath = (path:number[][]):void =>{
    for(const p of path) styleElement(p, 'shortest-path')
  }