import React from "react";
import {
  SandpackProvider,
  SandpackPreview,
  SandpackLayout,
} from "@codesandbox/sandpack-react";
import MonacoEditor from "./monaco-editor";

export default function MySandpack({
  file,
  setCode,

  isPreview,
}: {
  file: any;
  setCode: (code: string) => void;
  defaultCode?: string;
  isPreview?: boolean;
}) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, [file]);
  const code = mounted && window.atob(file.data.content);

  return (
    <div>
      <SandpackProvider
        // template="vanilla"
        customSetup={{
          entry: "/index.html",
          // environment: "static",
          // dependencies: {
          //   astro: "^1.5.0",
          // },
        }}
        files={{
          "/index.html": {
            code: `<!-- ${file.data.path} -->
${code}`,
          },
        }}
        options={{
          activeFile: "/index.html",
          externalResources: ["https://cdn.tailwindcss.com"],
          classes: {
            "sp-stack": "h-screen",
          },
        }}
        theme="dark"
      >
        <SandpackLayout>
          <MonacoEditor onChange={setCode} isPreview={isPreview} />
          <SandpackPreview />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
