import React, { FormEvent } from "react";
import type { GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { octokit } from "../utils/octokit";

const TestSandpackEditor: React.ComponentType<any> = dynamic(
  () => import("../components/sandpack/test-editor"),
  { ssr: false }
);

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const file = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner: "pro-tailwind",
      repo: "tutorials",
      path: "/src/tutorials/ribbon-banner/02-intro.astro",
    }
  );

  return {
    props: {
      file,
    },
    revalidate: 10,
  };
};

const Home: NextPage<any> = ({ file }) => {
  const [newFile, setNewFile] = React.useState(file);
  React.useEffect(() => {}, []);

  const inputRef = React.useRef<any>(null);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const file = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner: "pro-tailwind",
        repo: "tutorials",
        path: inputRef.current.value,
      }
    );
    file.status === 200 && setNewFile(file);
  };

  return (
    <div>
      <form
        style={{ padding: 20, display: "flex", gap: 5 }}
        onSubmit={handleSubmit}
      >
        <label>
          <code>pro-tailwind/tutorials/</code>
          <input
            style={{ width: 400 }}
            defaultValue="src/tutorials/ribbon-banner/02-solution.astro"
            ref={inputRef}
            type="text"
          />
        </label>
        <button type="submit">load</button>
      </form>

      <TestSandpackEditor file={newFile} setCode={() => {}} />
    </div>
  );
};

export default Home;
