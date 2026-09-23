const CONTENT_FILE = "content/site.json";

export const SITE_CONTENT_TAG = "site-content";

export type GithubRepoConfig = {
  token: string;
  owner: string;
  repo: string;
  branch: string;
};

export function isVercelRuntime() {
  return process.env.VERCEL === "1";
}

export function getGithubRepoConfig(): GithubRepoConfig | null {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_REPO_OWNER || process.env.VERCEL_GIT_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME || process.env.VERCEL_GIT_REPO_SLUG;
  const rawBranch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main";
  const branch = /^[0-9a-f]{40}$/i.test(rawBranch) ? "main" : rawBranch;

  if (!token || !owner || !repo) return null;
  return { token, owner, repo, branch };
}

export function getContentStorageStatus() {
  const github = Boolean(getGithubRepoConfig());
  const vercel = isVercelRuntime();
  return {
    vercel,
    github,
    ready: !vercel || github,
  };
}

function contentsUrl(config: GithubRepoConfig, withRef: boolean) {
  const base = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${CONTENT_FILE}`;
  return withRef ? `${base}?ref=${encodeURIComponent(config.branch)}` : base;
}

function githubHeaders(token: string, extra?: HeadersInit): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "marsa-landing-content",
    ...extra,
  };
}

type GithubFileResponse = {
  sha?: string;
  content?: string;
  encoding?: string;
  message?: string;
};

async function readGithubFile(config: GithubRepoConfig, fresh = false) {
  const response = await fetch(contentsUrl(config, true), {
    headers: githubHeaders(config.token),
    ...(fresh ? { cache: "no-store" as const } : { next: { tags: [SITE_CONTENT_TAG] } }),
  });

  if (response.status === 404) return null;
  const payload = (await response.json()) as GithubFileResponse;
  if (!response.ok) {
    throw new Error(payload.message || `GitHub could not read ${CONTENT_FILE} (${response.status}).`);
  }
  return payload;
}

export async function readGithubSiteJson(): Promise<unknown | null> {
  const config = getGithubRepoConfig();
  if (!config) return null;

  const file = await readGithubFile(config);
  if (!file?.content) return null;

  const decoded = Buffer.from(file.content.replace(/\n/g, ""), "base64").toString("utf8");
  return JSON.parse(decoded);
}

export async function writeGithubSiteJson(content: unknown) {
  const config = getGithubRepoConfig();
  if (!config) {
    throw new Error("GitHub is not configured. Add GITHUB_TOKEN in the Vercel project settings.");
  }

  const current = await readGithubFile(config, true);
  const body = `${JSON.stringify(content, null, 2)}\n`;
  const response = await fetch(contentsUrl(config, false), {
    method: "PUT",
    headers: githubHeaders(config.token, { "Content-Type": "application/json" }),
    body: JSON.stringify({
      message: "Update site content",
      content: Buffer.from(body).toString("base64"),
      branch: config.branch,
      sha: current?.sha,
    }),
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => ({}))) as GithubFileResponse;
    throw new Error(
      payload.message ||
        `GitHub could not update ${CONTENT_FILE} (${response.status}). Check that GITHUB_TOKEN can write repository contents.`,
    );
  }
}
