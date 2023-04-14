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
        To get started, try dragging and dropping some of the items in the start and stop  to the right on to the matrix
      </p>
      <p>
        You can draw and erase walls by clicking on the matrix
      </p>
    </div>
  )
};

export default HowTo;