import React from "react";
import {
  SandpackProvider,
  SandpackPreview,
  useActiveCode,
  useSandpackNavigation,
  SandpackLayout,
  SandpackStack,
  useSandpack,
  SandpackPreviewRef,
} from "@codesandbox/sandpack-react";
import MonacoEditor, { OnMount, Monaco } from "@monaco-editor/react";
import postcss from "postcss";
import {
  configureMonacoTailwindcss,
  tailwindcssData,
} from "monaco-tailwindcss";
import { Config } from "tailwindcss";
import tailwindcss from "tailwindcss";
import { tail } from "lodash";

export const tailwindConfig: Config = {
  content: [],
  theme: {
    extend: {
      screens: {
        television: "90000px",
      },
      spacing: {
        "128": "32rem",
      },
      colors: {
        // https://icolorpalette.com/color/molten-lava
        lava: "#b5332e",
        // Taken from https://icolorpalette.com/color/ocean-blue
        ocean: {
          50: "#f2fcff",
          100: "#c1f2fe",
          200: "#90e9ff",
          300: "#5fdfff",
          400: "#2ed5ff",
          500: "#00cafc",
          600: "#00a3cc",
          700: "#007c9b",
          800: "#00546a",
          900: "#002d39",
        },
      },
    },
  },
};

function Editor({
  onChange,
  activeFile,
  isPreview,
}: {
  onChange: (code: string) => void;
  isPreview?: boolean;
  activeFile?: string;
}) {
  const { sandpack } = useSandpack();

  const { code, updateCode } = useActiveCode();

  onChange(code);

  React.useEffect(() => {
    // activeFile && sandpack.setActiveFile(activeFile);
    updateCode(code);
  }, [code]);

  const handleEditorDidMount: OnMount = async (editor, monaco) => {
    configureMonacoTailwindcss(monaco, { tailwindConfig });
    monaco.languages.css.cssDefaults.setOptions({
      data: {
        dataProviders: {
          tailwindcssData,
        },
      },
    });

    // Disable the auto-completion until package is uploaded to @types
    /* await AutoTypings.create(editor, {
      sourceCache: new LocalStorageCache(), // Cache loaded sources in localStorage. May be omitted
      monaco: monaco,
    }); */
  };

  return (
    <SandpackStack style={{ height: "90vh", margin: 0 }}>
      <div
        style={{
          flex: 1,
          paddingTop: 8,
          background: "#1e1e1e",
          maxHeight: "90vh",
        }}
      >
        <MonacoEditor
          width="100%"
          language="html"
          theme="vs-dark"
          onMount={handleEditorDidMount}
          key={sandpack.activeFile}
          defaultValue={code}
          value={code}
          onChange={(value) => updateCode(value || "")}
          options={{
            fontSize: 14,
            lineHeight: 1.5,
            useShadowDOM: false,
            acceptSuggestionOnCommitCharacter: true,
            acceptSuggestionOnEnter: "on",
            accessibilitySupport: "auto",
            autoIndent: "full",
            automaticLayout: true,
            codeLens: true,
            colorDecorators: true,
            contextmenu: true,
            cursorBlinking: "blink",
            cursorSmoothCaretAnimation: false,
            cursorStyle: "line",
            disableLayerHinting: false,
            disableMonospaceOptimizations: false,
            dragAndDrop: false,
            fixedOverflowWidgets: false,
            folding: true,
            foldingStrategy: "auto",
            fontLigatures: false,
            formatOnPaste: false,
            formatOnType: false,
            hideCursorInOverviewRuler: false,
            links: true,
            mouseWheelZoom: false,
            multiCursorMergeOverlapping: true,
            multiCursorModifier: "alt",
            overviewRulerBorder: true,
            overviewRulerLanes: 2,
            quickSuggestions: true,
            quickSuggestionsDelay: 100,
            readOnly: isPreview || false,
            renderControlCharacters: false,
            renderFinalNewline: true,
            renderLineHighlight: "all",
            renderWhitespace: "none",
            revealHorizontalRightPadding: 30,
            roundedSelection: true,
            rulers: [],
            scrollBeyondLastColumn: 5,
            scrollBeyondLastLine: true,
            selectOnLineNumbers: true,
            selectionClipboard: true,
            selectionHighlight: true,
            showFoldingControls: "mouseover",
            smoothScrolling: false,
            suggestOnTriggerCharacters: true,
            wordBasedSuggestions: true,
            wordSeparators: "~!@#$%^&*()-=+[{]}|;:'\",.<>/?",
            wordWrap: "off",
            wordWrapBreakAfterCharacters: "\t})]?|&,;",
            wordWrapBreakBeforeCharacters: "{([+",
            wordWrapColumn: 80,
            wrappingIndent: "none",
            minimap: { enabled: false },
          }}
        />
      </div>
    </SandpackStack>
  );
}

export default function MySandpack({
  file,
  setCode,
  defaultCode,
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
  const [tailwindConfig, setTailwindConfig] = React.useState<string>();
  console.log(tailwindConfig);
  return mounted ? (
    <div>
      <SandpackProvider
        customSetup={{
          entry: "/index.html",
        }}
        files={{
          "/index.html": {
            code: `<!-- ${file.data.path} -->
${code}

<script>
tailwind.config = {
  theme: {
    extend: {
      colors: {
        clifford: '#da373d',
      }
    }
  }
}
</script>
`,
          },
          "/config.html": {
            code: `
            <script>
           tailwind.config = {
                content: [
                  "./pages/**/*.{js,ts,jsx,tsx}",
                  "./components/**/*.{js,ts,jsx,tsx}",
                ],
                theme: {
                    extend: {
                      screens: {
                        television: "90000px",
                      },
                      spacing: {
                        "128": "32rem",
                      },
                      colors: {
                        // https://icolorpalette.com/color/molten-lava
                        lava: "#b5332e",
                        // Taken from https://icolorpalette.com/color/ocean-blue
                        ocean: {
                          50: "#f2fcff",
                          100: "#c1f2fe",
                          200: "#90e9ff",
                          300: "#5fdfff",
                          400: "#2ed5ff",
                          500: "#00cafc",
                          600: "#00a3cc",
                          700: "#007c9b",
                          800: "#00546a",
                          900: "#002d39",
                        },
                      },
                    },
                  },
                plugins: [],
              };
            </script>`,
          },
        }}
        options={{
          activeFile: "/index.html",
          externalResources: [
            "https://cdn.tailwindcss.com",
            `http://localhost:3000/api/tailwind?config=${tailwindConfig}`,
          ],
          classes: {
            "sp-stack": "h-screen",
          },
        }}
        theme="dark"
      >
        <SandpackLayout>
          <Editor
            // activeFile="/index.html"
            onChange={setCode}
            isPreview={isPreview}
          />
          <SandpackPreviewClient />
        </SandpackLayout>
      </SandpackProvider>
      <MonacoEditor
        width="100%"
        height={800}
        language="javascript"
        // language="tailwindcss"

        key={"config"}
        theme="vs-dark"
        value={`module.exports = {
            content: [
              "./pages/**/*.{js,ts,jsx,tsx}",
              "./components/**/*.{js,ts,jsx,tsx}",
            ],
            theme: {
                extend: {
                  screens: {
                    television: "90000px",
                  },
                  spacing: {
                    "128": "32rem",
                  },
                  colors: {
                    // https://icolorpalette.com/color/molten-lava
                    lava: "#b5332e",
                    // Taken from https://icolorpalette.com/color/ocean-blue
                    ocean: {
                      50: "#f2fcff",
                      100: "#c1f2fe",
                      200: "#90e9ff",
                      300: "#5fdfff",
                      400: "#2ed5ff",
                      500: "#00cafc",
                      600: "#00a3cc",
                      700: "#007c9b",
                      800: "#00546a",
                      900: "#002d39",
                    },
                  },
                },
              },
            plugins: [],
          };`}
        onChange={(value: any) => {
          const value64 = window.btoa(value);
          setTailwindConfig(value64);
        }}
        options={{
          fontSize: 14,
          lineHeight: 1.5,
          useShadowDOM: false,
          acceptSuggestionOnCommitCharacter: true,
          acceptSuggestionOnEnter: "on",
          accessibilitySupport: "auto",
          autoIndent: "full",
          automaticLayout: true,
          codeLens: true,
          colorDecorators: true,
          contextmenu: true,
          cursorBlinking: "blink",
          cursorSmoothCaretAnimation: false,
          cursorStyle: "line",
          disableLayerHinting: false,
          disableMonospaceOptimizations: false,
          dragAndDrop: false,
          fixedOverflowWidgets: false,
          folding: true,
          foldingStrategy: "auto",
          fontLigatures: false,
          formatOnPaste: false,
          formatOnType: false,
          hideCursorInOverviewRuler: false,
          links: true,
          mouseWheelZoom: false,
          multiCursorMergeOverlapping: true,
          multiCursorModifier: "alt",
          overviewRulerBorder: true,
          overviewRulerLanes: 2,
          quickSuggestions: true,
          quickSuggestionsDelay: 100,
          readOnly: isPreview || false,
          renderControlCharacters: false,
          renderFinalNewline: true,
          renderLineHighlight: "all",
          renderWhitespace: "none",
          revealHorizontalRightPadding: 30,
          roundedSelection: true,
          rulers: [],
          scrollBeyondLastColumn: 5,
          scrollBeyondLastLine: true,
          selectOnLineNumbers: true,
          selectionClipboard: true,
          selectionHighlight: true,
          showFoldingControls: "mouseover",
          smoothScrolling: false,
          suggestOnTriggerCharacters: true,
          wordBasedSuggestions: true,
          wordSeparators: "~!@#$%^&*()-=+[{]}|;:'\",.<>/?",
          wordWrap: "off",
          wordWrapBreakAfterCharacters: "\t})]?|&,;",
          wordWrapBreakBeforeCharacters: "{([+",
          wordWrapColumn: 80,
          wrappingIndent: "none",
          minimap: { enabled: false },
        }}
      />
    </div>
  ) : null;
}

const SandpackPreviewClient: React.FC = () => {
  const { sandpack } = useSandpack();
  const previewRef = React.useRef<SandpackPreviewRef>(null);

  React.useEffect(() => {
    const client = previewRef.current?.getClient();
    const clientId = previewRef.current?.clientId;

    if (client && clientId) {
      console.log(client);
      console.log(sandpack.clients[clientId]);
    }
    /**
     * NOTE: In order to make sure that the client will be available
     * use the whole `sandpack` object as a dependencie.
     */
  }, [sandpack]);

  return <SandpackPreview ref={previewRef} />;
};

window.MonacoEnvironment = {
  // @ts-ignore-next-line
  getWorker(moduleId, label) {
    switch (label) {
      case "editorWorkerService":
        return new Worker(
          new URL("monaco-editor/esm/vs/editor/editor.worker", import.meta.url)
        );
      case "css":
      case "less":
      case "scss":
        return new Worker(
          new URL(
            "monaco-editor/esm/vs/language/css/css.worker",
            import.meta.url
          )
        );
      case "handlebars":
      case "html":
      case "razor":
        return new Worker(
          new URL(
            "monaco-editor/esm/vs/language/html/html.worker",
            import.meta.url
          )
        );
      case "json":
        return new Worker(
          new URL(
            "monaco-editor/esm/vs/language/json/json.worker",
            import.meta.url
          )
        );
      case "javascript":
      case "typescript":
        return new Worker(
          new URL(
            "monaco-editor/esm/vs/language/typescript/ts.worker",
            import.meta.url
          )
        );
      case "tailwindcss":
        return new Worker(
          new URL("monaco-tailwindcss/tailwindcss.worker", import.meta.url)
        );
      default:
        throw new Error(`Unknown label ${label}`);
    }
  },
};
