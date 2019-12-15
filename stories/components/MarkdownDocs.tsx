import React from "react";
import { Editor } from "./Editor";
import Markdown from "markdown-to-jsx";

export const MarkdownDocs: React.FC = ({ children }) => {
  return (
    <Markdown
      options={{
        overrides: {
          code: Editor,
        },
      }}
    >
      {children}
    </Markdown>
  );
};
