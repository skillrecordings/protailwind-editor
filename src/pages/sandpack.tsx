// https://github.com/pheralb/superui/blob/17eafcb9032d5e38c4eb093b7fae8fe4412d4c07/app/src/components/sandpack/editor.tsx

import React from "react";
import type { GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { getFileFromRepo } from "../lib/repos";
import Notes from "../components/sandpack/notes";

const SandpackEditor: React.ComponentType<any> = dynamic(
  () => import("../components/sandpack/repl"),
  { ssr: false }
);

export const getStaticProps: GetStaticProps = async () => {
  const file = await getFileFromRepo();

  return {
    props: {
      file,
    },
    revalidate: 10,
  };
};

const Home: NextPage<any> = ({ file }) => {
  const [newFile, setNewFile] = React.useState(file);

  const inputRef = React.useRef<any>(null);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const file = await getFileFromRepo(inputRef.current.value);
    file && setNewFile(file);
  };

  return (
    <div>
      <form
        style={{ padding: 20, display: "flex", gap: 5 }}
        onSubmit={handleSubmit}
      >
        <label>
          <code className="text-sm pr-2">pro-tailwind/tutorials/</code>
          <input
            style={{ width: 400 }}
            defaultValue="src/tutorials/ribbon-banner/02-solution.astro"
            ref={inputRef}
            type="text"
            className="px-2 py-0.5 rounded font-mono text-sm border border-white/10"
          />
        </label>
        <button
          className="bg-blue-500 rounded px-2 py-0.5 font-mono text-sm hover:bg-blue-400 transition"
          type="submit"
        >
          load
        </button>
      </form>
      <SandpackEditor file={newFile} setCode={() => {}} />
      <Notes />
    </div>
  );
};

export default Home;
