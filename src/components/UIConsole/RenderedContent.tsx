import React from "react";
import { consoleContent } from "../types/objects";

type Props = {
  consoleContent: consoleContent;
};

const RenderedContent: React.FC<Props> = ({ consoleContent }) => {
  return (
    <>
      {Object?.values(consoleContent).map((content, index) => (
        <p className="console-spacing" key={index}>{content}</p>
      ))}
    </>
  );
};

export default RenderedContent;