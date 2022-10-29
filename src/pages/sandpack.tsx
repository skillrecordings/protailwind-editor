// https://github.com/pheralb/superui/blob/17eafcb9032d5e38c4eb093b7fae8fe4412d4c07/app/src/components/sandpack/editor.tsx

import React from "react";
import type { GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { walk } from "../utils/parcel-content";
import path from "path";

const SandpackEditor: React.ComponentType<any> = dynamic(
  () => import("../components/sandpack-parcel/repl"),
  { ssr: false }
);

export const getStaticProps: GetStaticProps = async () => {
  const directory = path.join(process.cwd(), "content/parcel");
  const files = walk(directory);

  return {
    props: {
      files,
    },
    revalidate: 10,
  };
};

const Home: NextPage<any> = ({ files }) => {
  return (
    <div>
      <SandpackEditor files={files} setCode={() => {}} />
    </div>
  );
};

export default Home;
