const Notes = () => {
  return (
    <div className="fixed bottom-5 right-5 font-mono text-xs rounded-md bg-white/90 backdrop-blur-lg text-black p-5 w-[350px]">
      <ul className="list-none list-inside space-y-2">
        <h3 className="font-semibold pb-2">Notes</h3>
        <li>
          ✓ This example allows for editing a static HTML file with functioning
          Monaco TailwindCSS intellisense integration. It is loading full
          TailwindCSS stylesheet from{" "}
          <a
            href="https://tailwindcss.com/docs/installation/play-cdn"
            target="_blank"
            className="underline"
          >
            Tailwind's Play CDN
          </a>
        </li>
        <li>
          - It's using{" "}
          <a
            href="https://github.com/codesandbox/sandpack"
            target="_blank"
            className="underline"
          >
            Sandpack
          </a>{" "}
          for the preview pane and{" "}
          <a
            href="https://www.npmjs.com/package/@monaco-editor/react"
            target="_blank"
            className="underline"
          >
            Monaco Editor
          </a>{" "}
          +{" "}
          <a
            href="https://github.com/remcohaszing/monaco-tailwindcss"
            target="_blank"
            className="underline"
          >
            Monaco TailwindCSS integration
          </a>{" "}
          for the code editor.
        </li>

        <li>
          ⚠︎ Sandpack does not support Astro as of now.{" "}
          <strong>
            Interactive examples would only be possible with supported templates
            such as React
          </strong>
          , Vue, or vanilla JS. This example uses a static template and since
          our .astro files only contain HTML, it's being parsed as that. (using
          React would likely mean having to deal with additional boilerplate
          code)
        </li>
        <li>
          ⚠︎ Loading a custom tailwind config (which we'll need) seems
          problematic and I still haven't figured out how to do that.
        </li>
      </ul>
    </div>
  );
};

export default Notes;
