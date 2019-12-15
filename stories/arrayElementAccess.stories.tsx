import React from "react";
import excessPropertyChecking from "../examples/array-element-access.md";
import { MarkdownDocs } from "./components/MarkdownDocs";

export default {
  title: "Array Element Access",
};

export const troubleshooting = () => (
  <MarkdownDocs>{excessPropertyChecking}</MarkdownDocs>
);
