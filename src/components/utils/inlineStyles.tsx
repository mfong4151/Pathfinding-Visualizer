

export const customTransition = (color1:string, color2:string, color3:string, color4:string):string =>(
    `@keyframes customTransition {

    
        0% {
          background-color:${color1};
        }
        25%{
          background-color:${color2};
        }
    
        35%{
          background-color: ${color3};
        }
    
        100% {
          background-color: ${color4};
        }
      }`


)

export const transitionTiming= (color4: string) =>(
    {
        backgroundColor: color4,
        animation: `customTransition 7s linear`
    }
    
)