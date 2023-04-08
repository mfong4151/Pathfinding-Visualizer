import React from "react";
import { useLocation } from "react-router-dom";

const HowTo: React.FC = () => {
  const location:any = useLocation()
  // const route = location.

  return <div className="console-spacing">
    {`Welcome to the DSA visualizer, you are currently viewing ${location.pathname.slice(1)}. To get started, try dragging and dropping some of the items in the toolbar to the right on to the matrix`}

  </div>;
};

export default HowTo;