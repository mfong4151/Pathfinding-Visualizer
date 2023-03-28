import React from "react";
import { consoleContent } from "../../types/objects";


type Props = {
  consoleContent: consoleContent;
};

const RenderedContent: React.FC<Props> = ({ consoleContent }) => {
  return (
    <>
      {Object?.keys(consoleContent).map((content, index) => (
        <p key={index}>{content}</p>
      ))}
    </>
  );
};

export default RenderedContent;