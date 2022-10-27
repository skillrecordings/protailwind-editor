import React from "react";
import { FileSystemTree, load, WebContainer } from "@webcontainer/api";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import dynamic from "next/dynamic";

const MonacoEditor: React.ComponentType<any> = dynamic(
  () => import("./monaco-editor"),
  {
    ssr: false,
  }
);

async function bootWhenReady() {
  // `load` should only be called once
  const WebContainer = await load();

  // only a single instance of WebContainer can be created
  const webcontainer = await WebContainer.boot();

  return webcontainer;
}

const StackBlitzEditor: React.FC<{
  projectFiles: any;
}> = ({ projectFiles }) => {
  const [magicURL, setMagicURL] = React.useState<any>();
  const xtermRef = React.useRef<any>(null);
  const terminal = new Terminal({ convertEol: true });
  const fitAddon = new FitAddon();

  async function initProject(projectFiles: FileSystemTree) {
    const webcontainer = await bootWhenReady();
    await webcontainer.loadFiles(projectFiles);
    const install = await webcontainer.run(
      { command: "turbo", args: ["install"] },
      {
        stdout(data) {
          terminal.write(data);
          console.debug(`[npm install] ${data}`);
        },
      }
    );

    const installExitCode = await install.onExit;

    if (installExitCode !== 0) {
      throw new Error("Unable to run npm install");
    }

    await webcontainer.run(
      { command: "npm", args: ["run", "dev"] },
      {
        stdout(data) {
          terminal.write(data);
          console.debug(`[npm run dev] ${data}`);
        },
      }
    );

    webcontainer.on("server-ready", (_, url) => {
      setMagicURL(url);
      setContainer(webcontainer);
    });

    return webcontainer;
  }

  const [container, setContainer] = React.useState<any>();

  React.useEffect(() => {
    initProject(projectFiles);
    terminal.open(xtermRef.current);
    terminal.loadAddon(fitAddon);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="relative flex sm:flex-row flex-col items-center h-screen w-full">
        {magicURL && (
          <MonacoEditor container={container} project={projectFiles} />
        )}
        {magicURL ? (
          <iframe
            className="w-full h-full"
            src={`${magicURL}/tutorials/ribbon-banner/02-intro`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="animate-pulse">loading</span>
          </div>
        )}
      </div>
      <div className="w-full h-16" ref={xtermRef} />
    </div>
  );
};

export default StackBlitzEditor;
