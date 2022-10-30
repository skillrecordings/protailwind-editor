import React from "react";
import {
  useActiveCode,
  SandpackStack,
  useSandpack,
} from "@codesandbox/sandpack-react";
import MonacoEditor, { useMonaco } from "@monaco-editor/react";
import {
  configureMonacoTailwindcss,
  tailwindcssData,
} from "monaco-tailwindcss";
import get from "lodash/get";

const Editor: React.FC<any> = ({ activeFile, onChange, isPreview }) => {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();
  const [mounted, setMounted] = React.useState(false);
  const parseTailwindConfigFromCdn = (config: string) => {
    const trueConfig = config.replace("tailwind.config", "module.exports");
    const module = {
      exports: {},
    };
    return eval(trueConfig);
  };
  const fileExtension = sandpack.activeFile.split(".").pop();

  // since we are using tailwind cdn which uses tailwind.config syntax it needs to be modified
  const tailwindConfig = get(
    get(sandpack.files, "/src/tailwind.config.js"),
    "code"
  );

  React.useEffect(() => {
    setMounted(true);
    activeFile && sandpack.setActiveFile(activeFile);
  }, []);
  onChange(code);

  React.useEffect(() => {
    updateCode(code);
  }, [code]);

  const monaco = useMonaco();

  const [monacoTailwindcss, setMonacoTailwindcss] = React.useState<any>();

  React.useEffect(() => {
    if (monaco && mounted) {
      monaco.languages.css.cssDefaults.setOptions({
        data: {
          dataProviders: {
            tailwindcssData,
          },
        },
      });

      const monacoTailwindcss = configureMonacoTailwindcss(monaco, {
        tailwindConfig: parseTailwindConfigFromCdn(tailwindConfig),
      });
      setMonacoTailwindcss(monacoTailwindcss);
    }
  }, [monaco]);

  const updateTailwindConfig = (value: string) => {
    monacoTailwindcss.setTailwindConfig(parseTailwindConfigFromCdn(value));
  };

  return mounted ? (
    <SandpackStack>
      <div
        style={{
          flex: 1,
          paddingTop: 16,
          background: "#1e1e1e",
          maxHeight: "90vh",
        }}
      >
        <MonacoEditor
          width="100%"
          language={fileExtension === "js" ? "javascript" : fileExtension}
          theme="vs-dark"
          key={sandpack.activeFile}
          // defaultValue={code}
          value={code}
          onChange={(value = "") => {
            updateCode(value);
            updateTailwindConfig(value);
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
    </SandpackStack>
  ) : null;
};
export default Editor;

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
