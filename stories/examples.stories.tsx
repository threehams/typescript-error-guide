import React from "react";
import { storiesOf } from "@storybook/react";
import { MarkdownDocs } from "./components/MarkdownDocs";
import * as examples from "../examples";

Object.entries(examples).reduce((stories, [name, contents]) => {
  return stories.add(name, () => <MarkdownDocs>{contents}</MarkdownDocs>);
}, storiesOf("Examples", module));
