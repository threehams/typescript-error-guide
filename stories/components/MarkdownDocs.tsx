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
  if (typeof children === "string") {
    return <Editor className={className}>{children}</Editor>;
  }
  return <div>{children}</div>;
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
