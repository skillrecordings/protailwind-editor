import React from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { type WebContainer } from "@webcontainer/api";
import {
  configureMonacoTailwindcss,
  tailwindcssData,
} from "monaco-tailwindcss";

const MonacoEditor: React.FC<{
  project: any;
  container: WebContainer;
}> = ({ container, project }) => {
  const monaco = useMonaco();

  React.useEffect(() => {
    if (monaco) {
      // monaco.languages.css.cssDefaults.setOptions({
      //   data: {
      //     dataProviders: {
      //       tailwindcss: tailwindcssData,
      //     },
      //   },
      // });
      // configureMonacoTailwindcss(monaco);
      console.log("here is the monaco instance:", monaco);
    }
  }, [monaco]);

  const tutorialDir =
    project.src.directory.tutorials.directory["ribbon-banner"].directory[
      "02-intro.astro"
    ];
  const openFile = tutorialDir.file.contents;

  return (
    <>
      <Editor
        width="100%"
        height="100%"
        language="html"
        theme="vs-dark"
        key={openFile}
        value={openFile}
        onChange={(value) => {
          container.loadFiles({
            src: {
              directory: {
                tutorials: {
                  directory: {
                    "ribbon-banner": {
                      directory: {
                        "02-intro.astro": {
                          file: {
                            contents: value || "",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          });
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
          readOnly: false,
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
    </>
  );
};

export default MonacoEditor;

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
      case "html":
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

function getWorkerURL(url: string) {
  const content = `importScripts( "${url}" );`;
  return URL.createObjectURL(new Blob([content], { type: "text/javascript" }));
}
