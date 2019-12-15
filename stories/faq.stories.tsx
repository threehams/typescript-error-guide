import React from "react";
import readme from "../README.md";
import { MarkdownDocs } from "./components/MarkdownDocs";

export default {
  title: "FAQ",
};

export const faq = () => <MarkdownDocs>{readme}</MarkdownDocs>;
