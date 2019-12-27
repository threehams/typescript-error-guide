declare module "*.md" {
  const contents: string;
  export default contents;
}

declare module "!file-loader!*" {
  const contents: string;
  export default contents;
}