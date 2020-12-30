import React, { memo, useContext, useEffect, useState } from "react";
import ts from "typescript";

declare global {
  interface Window {
    require: {
      (): void;
      config: (requireConfig: unknown) => void;
    };
    ts: unknown;
  }
}

type SandboxOptions = {
  /** initial code */
  text: string;
  compilerOptions: ts.CompilerOptions;
  domID: string;
};

type CreateSandbox = (options: SandboxOptions) => void;
type MonacoContextType = {
  loading: boolean;
  createSandbox: CreateSandbox | null;
  error: string;
};
const MonacoContext = React.createContext<MonacoContextType>(undefined as any);

type MonacoProviderProps = {
  children: React.ReactNode;
};
export const MonacoProvider = ({ children }: MonacoProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [createSandbox, setCreateSandbox] = useState<CreateSandbox | null>(
    null,
  );
  useEffect(() => {
    // First set up the VSCode loader in a script tag
    const loaderScript = document.createElement("script");
    loaderScript.src = "https://www.typescriptlang.org/js/vs.loader.js";
    loaderScript.async = true;
    loaderScript.onload = () => {
      // Now the loader is ready, tell require where it can get the version of monaco, and the sandbox
      // This version uses the latest version of the sandbox, which is used on the TypeScript website

      // For the monaco version you can use unpkg or the TypeSCript web infra CDN
      // You can see the available releases for TypeScript here:
      // https://typescript.azureedge.net/indexes/releases.json
      window.require.config({
        paths: {
          vs: "https://typescript.azureedge.net/cdn/4.0.5/monaco/min/vs",
          sandbox: "https://www.typescriptlang.org/js/sandbox",
        },
        // This is something you need for monaco to work
        ignoreDuplicateModules: ["vs/editor/editor.main"],
      });

      // Grab a copy of monaco, TypeScript and the sandbox
      window.require(
        [
          "vs/editor/editor.main",
          "vs/language/typescript/tsWorker",
          "sandbox/index",
        ],
        (main, tsWorker, sandboxFactory) => {
          setLoading(false);

          if (!main || !window.ts || !sandboxFactory) {
            setError("Could not get all the dependencies of sandbox set up!");
            console.error(
              "main",
              !!main,
              "ts",
              !!window.ts,
              "sandbox",
              !!sandboxFactory,
            );
            return;
          }

          setCreateSandbox(() => (options: SandboxOptions) => {
            sandboxFactory.createTypeScriptSandbox(options, main, window.ts);
          });
        },
      );
    };

    document.body.appendChild(loaderScript);
  });
  return (
    <>
      <MonacoContext.Provider value={{ loading, createSandbox, error }}>
        {children}
      </MonacoContext.Provider>
    </>
  );
};

export const useMonaco = () => {
  const context = useContext(MonacoContext);
  if (!context) {
    throw new Error(
      "MonacoContext not found, import MonacoContextProvider and add it to your project",
    );
  }
  return context;
};
