import React from "react";

type Props = {
  consoleContent: any[];
};

const RenderedContent: React.FC<Props> = ({ consoleContent }) => {
  return (
    <>
      {consoleContent.map((content, index) => (
        <p key={index}>{content}</p>
      ))}
    </>
  );
};

export default RenderedContent;