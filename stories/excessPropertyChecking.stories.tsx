import React from "react";
import excessPropertyChecking from "../examples/excess-property-checking.md";
import { MarkdownDocs } from "./components/MarkdownDocs";

export default {
  title: "Excess Property Checking",
};

export const troubleshooting = () => (
  <MarkdownDocs>{excessPropertyChecking}</MarkdownDocs>
);
