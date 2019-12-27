import React from "react";
import MonacoEditor from "react-monaco-editor";
import { languages, editor, Uri } from "monaco-editor";
import esObject from "!raw-loader!typescript/lib/lib.es2017.object.d.ts";
import es5 from "!raw-loader!typescript/lib/lib.es5.d.ts";
import csstype from "!raw-loader!csstype/index.d.ts";
import dom from "!raw-loader!typescript/lib/lib.dom.d.ts";
import react from "!raw-loader!@types/react/index.d.ts";
import propTypes from "!raw-loader!@types/prop-types/index.d.ts";

languages.typescript.typescriptDefaults.setCompilerOptions({
  // target: languages.typescript.ScriptTarget.ESNext,
  allowNonTsExtensions: true,
  esModuleInterop: true,
  jsx: languages.typescript.JsxEmit.Preserve,
  moduleResolution: languages.typescript.ModuleResolutionKind.NodeJs,
  module: languages.typescript.ModuleKind.CommonJS,
  noEmit: true,
  strict: true,
  // lib: ["dom", "esnext"],
});
languages.typescript.typescriptDefaults.addExtraLib(
  esObject,
  "lib.es2017.object.d.ts",
);
languages.typescript.typescriptDefaults.addExtraLib(es5, "lib.es5.d.ts");
languages.typescript.typescriptDefaults.addExtraLib(dom, "lib.dom.d.ts");
languages.typescript.typescriptDefaults.addExtraLib(
  `declare module "react" {${react}}`,
  "react.d.ts",
);
languages.typescript.typescriptDefaults.addExtraLib(
  `declare module "csstype" {${csstype}}`,
  "csstype.d.ts",
);
languages.typescript.typescriptDefaults.addExtraLib(
  `declare module "prop-types" {${propTypes}}`,
  "prop-types.d.ts",
);

let id = 0;
const generateModel = (code: string) => {
  return editor.createModel(code, "typescript", Uri.file(`input${id++}.tsx`));
};

interface EditorProps {
  children: string;
  className?: string;
}
export const Editor = ({ children, className }: EditorProps) => {
  const model = React.useRef(generateModel(children));
  const [code, setCode] = React.useState(children);
  if (className === "lang-tsx") {
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
            model: model.current,
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
