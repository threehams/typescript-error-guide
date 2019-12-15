import React, { createRef, useEffect, useState } from "react";
import MonacoEditor from "react-monaco-editor";

interface EditorProps {
  children?: React.ReactNode;
  className?: string;
}
export const Editor = ({ children, className }: EditorProps) => {
  const [code, setCode] = React.useState(children);
  if (className === "lang-tsx" && typeof code === "string") {
    const height = code.split(/\r\n|\r|\n/).length * 19 + 1;

    return (
      <div
        style={{
          backgroundColor: "#1e1e1e",
          padding: "20px 10px",
          borderRadius: 10,
        }}
      >
        <MonacoEditor
          defaultValue={code}
          value={code}
          onChange={newCode => setCode(newCode)}
          height={height}
          width="100%"
          language="typescript"
          options={{
            model: {},
            scrollbar: {
              vertical: "hidden",
              verticalHasArrows: false,
              verticalScrollbarSize: 0,
              verticalSliderSize: 0,
            },
            scrollBeyondLastLine: false,
            theme: "vs-dark",
            minimap: {
              enabled: false,
            },
            folding: false,
          }}
          editorWillMount={editor => {
            // editor.languages.typescript.CompilerOptions
            editor.languages.typescript.typescriptDefaults.setCompilerOptions({
              strict: true,
            });
          }}
        />
      </div>
    );
  }
  return (
    <span style={{ whiteSpace: "pre", display: "inline-block" }}>
      {children}
    </span>
  );
};
