// @ts-nocheck

import fs from "fs";
import path from "path";

const text_files = new Set([
  ".astro",
  ".txt",
  ".json",
  ".mjs",
  ".js",
  ".ts",
  ".tsx",
  ".css",
  ".svg",
  ".html",
  ".cjs",
  ".md",
]);

const excluded = new Set([
  ".DS_Store",
  ".gitkeep",
  ".gitignore",
  "package-lock.json",
]);

/**
 * Get a list of all files in a directory
 * @param {string} cwd - the directory to walk
 * @param {{
 *   exclude?: string[]
 * }} options
 */
export function walk(cwd, options = {}) {
  /** @type {Record<string, import('$lib/types').FileStub | import('$lib/types').DirectoryStub>} */
  const result = {};

  if (!fs.existsSync(cwd)) return result;

  /**
   * @param {string} dir
   * @param {number} depth
   */
  function walk_dir(dir, depth) {
    const files = fs.readdirSync(path.join(cwd, dir));

    for (const basename of files) {
      if (excluded.has(basename)) continue;
      if (options.exclude?.includes(basename)) continue;

      const name = dir + basename;
      const resolved = path.join(cwd, name);

      const stats = fs.statSync(resolved);

      if (stats.isDirectory()) {
        // result[basename] = {
        //   directory: {
        //     [basename]: {
        //       ...walk(`content/tutorials/${name.replace("/", "")}`),
        //     },
        //     // file: {
        //     //   ...walk_dir(name + "/", depth + 1)
        //     //  },
        //     type: "directory",
        //     name,
        //     basename,
        //     depth,
        //   },
        // };
      } else {
        const text = text_files.has(path.extname(name));
        const contents = fs.readFileSync(resolved, text ? "utf-8" : "base64");

        result[name.replace("/", "")] = {
          file: {
            type: "file",
            name,
            basename,
            text,
            contents,
            depth,
          },
        };
      }
    }
  }

  return walk_dir("/", 1), result;
}
