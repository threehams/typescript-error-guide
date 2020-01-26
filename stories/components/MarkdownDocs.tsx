import React, { ReactElement, ReactNode } from "react";
import { Editor } from "./Editor";
import Markdown from "markdown-to-jsx";
import LinkTo from "@storybook/addon-links/dist/react";
import { kebabCase } from "lodash";

interface LinkProps {
  href?: string;
  children?: ReactNode;
}
const Link = ({ href, children }: LinkProps) => {
  if (!href) {
    return <div>{children}</div>;
  }
  if (href.startsWith("http")) {
    return <a href={href}>{children}</a>;
  }
  return <LinkTo story={kebabCase(href)}>{children}</LinkTo>;
};

interface EditorSwitchProps {
  children?: ReactNode;
  className?: string;
}
const EditorSwitch = ({
  children,
  className,
}: EditorSwitchProps): ReactElement => {
  if (typeof children === "string" && className === "lang-tsx") {
    return <Editor>{children}</Editor>;
  }
  return (
    <span
      style={{
        whiteSpace: "pre",
        display: "inline-block",
        backgroundColor: "#eee",
        padding: "0 3px",
      }}
    >
      {children}
    </span>
  );
};

interface MarkdownDocsProps {
  children: ReactNode;
}
export const MarkdownDocs = ({ children }: MarkdownDocsProps) => {
  return (
    <Markdown
      options={{
        overrides: {
          code: EditorSwitch,
          a: Link,
        },
      }}
    >
      {children}
    </Markdown>
  );
};
