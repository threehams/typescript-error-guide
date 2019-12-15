import React from "react";
import { configure } from "@storybook/react";
import { addDecorator } from "@storybook/react";

// automatically import all files ending in *.stories.js
configure(require.context("../stories", true, /\.stories\.tsx$/), module);

const styles = {
  fontFamily: "Open Sans, sans-serif",
  fontSize: "1rem",
  maxWidth: 1000,
  paddingLeft: 20,
  paddingRight: 20,
  margin: "0 auto",
};
const LayoutDecorator = storyFn => <div style={styles}>{storyFn()}</div>;
addDecorator(LayoutDecorator);
