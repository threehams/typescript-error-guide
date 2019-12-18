import React from "react";
import readme from "../README.md";
import { MarkdownDocs } from "./components/MarkdownDocs";

export default {
  title: "About",
};

export const errors = () => <MarkdownDocs>{readme}</MarkdownDocs>;
