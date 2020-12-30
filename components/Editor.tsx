import React, { useEffect, useRef, useState } from "react";
import { useMonaco } from "./MonacoContext";
import { v4 as uuid } from "uuid";

const hashCode = (s: string) => {
  return s
    .split("")
    .reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0)
    .toString();
};

type EditorProps = {
  children: string;
};
export const Editor = ({ children }: EditorProps) => {
  const id = hashCode(children);
  const { error, createSandbox } = useMonaco();

  const height = children.split(/\r\n|\r|\n/).length * 19 + 1;
  useEffect(() => {
    createSandbox?.({
      text: children,
      compilerOptions: {},
      domID: id,
    });
  }, [createSandbox]);

  return (
    <>
      <h1>Example</h1>
      <div id={id} style={{ minHeight: height }}>
        {error && "sorry"}
      </div>
    </>
  );
};
