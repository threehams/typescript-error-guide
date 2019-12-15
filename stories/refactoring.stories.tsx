import React from "react";
import refactoring from "../examples/refactoring.md";
import { MarkdownDocs } from "./components/MarkdownDocs";

export default {
  title: "Refactoring",
};

export const troubleshooting = () => <MarkdownDocs>{refactoring}</MarkdownDocs>;
