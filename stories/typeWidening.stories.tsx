import React from "react";
import typeWidening from "../examples/type-widening.md";
import { MarkdownDocs } from "./components/MarkdownDocs";

export default {
  title: "Type Narrowing and Widening",
};

export const troubleshooting = () => (
  <MarkdownDocs>{typeWidening}</MarkdownDocs>
);
