import React from "react";
import { storiesOf } from "@storybook/react";
import { MarkdownDocs } from "./components/MarkdownDocs";
import * as examples from "../examples";
import { startCase } from "lodash";

Object.entries(examples).reduce((stories, [name, contents]) => {
  return stories.add(startCase(name), () => (
    <MarkdownDocs>{contents}</MarkdownDocs>
  ));
}, storiesOf("Examples", module));
