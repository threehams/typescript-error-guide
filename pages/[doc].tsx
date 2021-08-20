import { camelCase } from "lodash";
import { MarkdownDocs } from "../components/MarkdownDocs";
import { GetStaticPaths, GetStaticProps } from "next";
import fs from "fs";
import util from "util";
const readFile = util.promisify(fs.readFile);
import path from "path";

type DocPageProps = {
  markdown: string | null;
};

const DocPage = ({ markdown }: DocPageProps) => {
  if (!markdown) {
    return <div>page not found</div>;
  }
  return <MarkdownDocs>{markdown}</MarkdownDocs>;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const docName = camelCase(params?.doc as string);
  let markdown: string;
  try {
    console.log(path.resolve(process.cwd(), "markdown", `${docName}.md`));
    const result = await readFile(
      path.resolve(process.cwd(), "markdown", `${docName}.md`),
    );
    markdown = result.toString();
  } catch (err) {
    return {
      props: {
        markdown: null,
      },
    };
  }

  return {
    props: {
      markdown,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { doc: "narrowing" },
      },
    ],
    fallback: false,
  };
};

export default DocPage;
