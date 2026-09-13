import {mkdir, readFile, writeFile} from "node:fs/promises";
import {resolve} from "node:path";

const dataFile = resolve("src/data/issues.json");
const repo = process.env.GITHUB_ISSUES_REPO || "yanlong832-source/profile-website";
const endpoint = `https://api.github.com/repos/${repo}/issues?state=all&per_page=100&sort=updated&direction=desc`;

try {
  const response = await fetch(endpoint, {headers: {Accept: "application/vnd.github+json", "User-Agent": "profile-website-build"}});
  if (!response.ok) throw new Error(`GitHub API ${response.status}`);
  const issues = (await response.json())
    .filter((item) => !item.pull_request)
    .map((item) => ({
      number: item.number,
      title: item.title,
      body: item.body || "",
      labels: item.labels.map((label) => label.name),
      created_at: item.created_at,
      updated_at: item.updated_at,
      html_url: item.html_url,
      likes: item.reactions?.["+1"] || 0,
      comments: item.comments || 0,
    }));
  await mkdir(resolve("src/data"), {recursive: true});
  await writeFile(dataFile, JSON.stringify(issues, null, 2));
  console.log(`issues: ${issues.length} records`);
} catch (error) {
  try {
    const existing = JSON.parse(await readFile(dataFile, "utf8"));
    console.warn(`issues: using cached ${existing.length} records (${error.message})`);
  } catch {
    await writeFile(dataFile, "[]\n");
    console.warn(`issues: unavailable, using empty feed (${error.message})`);
  }
}
