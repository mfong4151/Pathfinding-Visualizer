import React from "react";
import { useLocation } from "react-router-dom";

const HowTo: React.FC = () => {
  const location:any = useLocation()
  // const route = location.



  return (
    <div className="console-spacing">
      <p>
        {`Welcome to the DSA visualizer, you are currently viewing ${location.pathname.slice(1)}.`}
      </p>
      <p>
        To get started, try dragging and dropping the start and stop icons to the right on to the matrix.
      </p>
      <p>
        Optional: You can draw and erase walls by clicking on the matrix.
      </p>
      <p>
        Next, select an algorithm to play with the "Choose your algorithm" dropdown.
      </p>
      <p>
        Next, hit the play button to watch a full automated walkthrough.  
      </p>
      <p>
        Alternative you can hit the fast-forward button to watch a step by step playthrough, or the skip forward button to skip to the end.
      </p>
    </div>
  )
};

export default HowTo;