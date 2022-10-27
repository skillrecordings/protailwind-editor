import React from "react";
import Link from "next/link";

const Index = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <main className="flex flex-col items-center justify-center w-full max-w-md text-lg gap-3 ">
        <Link href="/sandpack">
          <a className="flex items-center rounded text-sm font-medium font-mono p-5 bg-white/5 hover:bg-white/10 transition w-full">
            Sandpack @CodeSandbox
          </a>
        </Link>
        {/* <Link href="/sandpack-config-test">
          <a className="flex items-center rounded text-sm font-medium font-mono p-5 bg-white/5 hover:bg-white/10 transition w-full">
            Sandpack @CodeSandbox (Tailwind Config Test)
          </a>
        </Link> */}
        <a
          href="/stackblitz"
          className="flex items-center rounded text-sm font-medium font-mono p-5 bg-white/5 hover:bg-white/10 transition w-full"
        >
          WebContainer @StackBlitz
        </a>
      </main>
    </div>
  );
};

export default Index;
