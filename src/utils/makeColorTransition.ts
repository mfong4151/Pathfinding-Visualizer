const makeColorTransition = (color1 :string, color2 : string, color3 :string, color4:string) => (
  
    `@keyframes colorTransition {
        0% {
            background-color: ${color1};
        }
        25%{
          background-color: ${color2};
        }
    
        35%{
          background-color: ${color3};
        }
    
        100% {
          background-color: ${color4};
        }
      }
    `
    )

export default makeColorTransition;