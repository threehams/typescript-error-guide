import React from "react";
import { Editor } from "./Editor";
import Markdown from "markdown-to-jsx";
import NextLink from "next/link";
import { kebabCase } from "lodash";

interface LinkProps {
  href?: string;
  children?: string;
}
const Link = ({ href, children }: LinkProps) => {
  if (!href) {
    return <div>{children}</div>;
  }
  if (href.startsWith("http")) {
    return <a href={href}>{children}</a>;
  }
  return (
    <NextLink href={kebabCase(href)}>
      <a>{children}</a>
    </NextLink>
  );
};

interface EditorSwitchProps {
  children: string;
  className?: string;
}
const EditorSwitch = ({
  children,
  className,
}: EditorSwitchProps): React.ReactElement => {
  if (className === "lang-tsx") {
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
  children: string;
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
