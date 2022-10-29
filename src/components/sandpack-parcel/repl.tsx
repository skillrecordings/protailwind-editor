import React from "react";
import {
  SandpackProvider,
  SandpackPreview,
  SandpackLayout,
  FileTabs,
  SandpackStack,
} from "@codesandbox/sandpack-react";
import MonacoEditor from "./monaco-editor";

const Repl: React.FC<any> = ({ setCode, files, isPreview }) => {
  return (
    <div>
      <SandpackProvider
        customSetup={{
          entry: "/src/app.js",
          environment: "parcel",
          devDependencies: {
            "@parcel/transformer-inline-string": "^2.7.0",
            parcel: "^2.7.0",
            postcss: "^8.4.18",
            tailwindcss: "^3.2.1",
          },
        }}
        files={files}
        options={{
          visibleFiles: [
            "/src/lesson.html", // TODO: pass in dynamic lesson file
            "/src/tailwind.config.js",
          ],
          externalResources: ["https://cdn.tailwindcss.com"],
          classes: {
            "sp-stack": "h-screen",
          },
        }}
        theme="dark"
      >
        <SandpackLayout>
          <SandpackStack style={{ height: "100%" }}>
            <FileTabs />
            <MonacoEditor onChange={setCode} isPreview={isPreview} />
          </SandpackStack>
          <SandpackPreview />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
};

export default Repl;
