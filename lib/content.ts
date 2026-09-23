import { cache } from "react";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { connection } from "next/server";
import {
  defaultSiteContent,
  mergeSiteContent,
  type SiteContent,
} from "@/lib/site-content";
import {
  getGithubRepoConfig,
  isVercelRuntime,
  readGithubSiteJson,
  writeGithubSiteJson,
} from "@/lib/github-content";

export * from "@/lib/site-content";
export { getContentStorageStatus, isVercelRuntime, SITE_CONTENT_TAG } from "@/lib/github-content";

export const SITE_CONTENT_PATH = path.join(process.cwd(), "content", "site.json");

export const getSiteContent = cache(async (): Promise<SiteContent> => {
  await connection();

  if (isVercelRuntime() && getGithubRepoConfig()) {
    try {
      const remote = await readGithubSiteJson();
      if (remote) return mergeSiteContent(defaultSiteContent, remote);
    } catch (error) {
      console.error("[content] GitHub read failed, using the deployed file snapshot.", error);
    }
  }

  try {
    const raw = await readFile(SITE_CONTENT_PATH, "utf8");
    return mergeSiteContent(defaultSiteContent, JSON.parse(raw));
  } catch {
    return defaultSiteContent;
  }
});

export async function writeSiteContent(content: SiteContent) {
  if (isVercelRuntime()) {
    await writeGithubSiteJson(content);
    return {
      stored: "github" as const,
      message:
        "Saved to content/site.json on GitHub. The live site is using this copy now, and Vercel will redeploy with the updated file.",
    };
  }

  await writeFile(SITE_CONTENT_PATH, `${JSON.stringify(content, null, 2)}\n`, "utf8");
  return {
    stored: "file" as const,
    message: "Saved to content/site.json. The live site now uses this copy.",
  };
}
