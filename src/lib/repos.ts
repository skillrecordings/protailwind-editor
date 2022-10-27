import { octokit } from "../utils/octokit";

export const getFileFromRepo = async (
  filePath = "/src/tutorials/ribbon-banner/02-intro.astro",
  repoOwner = "pro-tailwind",
  repoName = "tutorials"
) => {
  const file = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner: repoOwner,
      repo: repoName,
      path: filePath,
    }
  );
  if (file.status === 200) {
    return file;
  } else {
    throw new Error(`couldn't get file from pro-tailwind tutorials repo`);
  }
};
