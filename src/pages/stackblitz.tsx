import React from "react";
import dynamic from "next/dynamic";
import { GetStaticProps } from "next";
import { walk } from "../utils/content";
import path from "path";
import Notes from "../components/stackblitz/notes";

const StackBlitzEditor: React.ComponentType<any> = dynamic(
  () => import("../components/stackblitz/repl"),
  { ssr: false }
);

export const getStaticProps: GetStaticProps = async () => {
  const projectDirectory = path.join(process.cwd(), "content/tutorials");
  const pagesDirectory = path.join(
    process.cwd(),
    "content/tutorials/src/pages"
  );
  const layoutsDirectory = path.join(
    process.cwd(),
    "content/tutorials/src/layouts"
  );
  const tutorialsDirectory = path.join(
    process.cwd(),
    "content/tutorials/src/tutorials/ribbon-banner"
  );
  const stylesDirectory = path.join(
    process.cwd(),
    "content/tutorials/src/styles"
  );
  const ribbonBannerPagesDirectory = path.join(
    process.cwd(),
    "content/tutorials/src/pages/tutorials/ribbon-banner"
  );

  const common = walk(projectDirectory);
  const pages = walk(pagesDirectory);
  const layouts = walk(layoutsDirectory);
  const tutorials = walk(tutorialsDirectory);
  const ribbonBannerPages = walk(ribbonBannerPagesDirectory);
  const styles = walk(stylesDirectory);

  const src = {
    src: {
      directory: {
        pages: {
          directory: {
            ...pages,
            tutorials: {
              directory: {
                "ribbon-banner": {
                  directory: {
                    ...ribbonBannerPages,
                  },
                },
              },
            },
          },
        },
        layouts: {
          directory: {
            ...layouts,
          },
        },
        tutorials: {
          directory: {
            "ribbon-banner": {
              directory: {
                ...tutorials,
              },
            },
          },
        },
        styles: {
          directory: {
            ...styles,
          },
        },
      },
    },
  };

  return {
    props: {
      tutorial: {
        common,
        src,
      },
    },
    revalidate: 10,
  };
};

const StackBlitzPage: React.FC<{ tutorial: any }> = ({ tutorial }) => {
  const project = {
    ...tutorial.common,
    ...tutorial.src,
  };

  return (
    <div className="w-screen">
      {tutorial && <StackBlitzEditor projectFiles={project} />}
      <Notes />
    </div>
  );
};

export default StackBlitzPage;
