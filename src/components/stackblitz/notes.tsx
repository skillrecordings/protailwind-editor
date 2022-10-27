const Notes = () => {
  return (
    <div className="fixed bottom-5 right-5 font-mono text-xs rounded-md bg-white/90 backdrop-blur-lg text-black p-5 w-[350px]">
      <ul className="list-none list-inside space-y-2">
        <h3 className="font-semibold pb-2">Notes</h3>
        <li>
          ✓ This is a fully functional Astro app running in WebContainer,
          meaning we have full control over it from the browser. Any changes
          made to tailwind config would get reflected.
        </li>
        <li>
          - All project files need to be loaded into WebContainers file system.
          In this example, they're being loaded from /content/tutorials dir.
        </li>
        <li>
          ⚠︎ In this example, Tailwind intellisense is not working in Monaco
          Editor because of issues related to loading TailwindCSS language
          worker and security headers settings that are required for
          WebContainer to work. Help appreciated!
        </li>
        <li>
          ⚠︎ When editing code, className changes are often times not being
          reflected right away. May be related to tailwind's jit engine, but
          idk.
        </li>
      </ul>
    </div>
  );
};

export default Notes;
