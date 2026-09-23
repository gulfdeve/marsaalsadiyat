"use server";

import { redirect } from "next/navigation";
import { revalidatePath, updateTag } from "next/cache";
import {
  clearAdminSession,
  getAdminPassword,
  isAdminAuthenticated,
  setAdminSession,
} from "@/lib/admin-session";
import { SITE_CONTENT_TAG, writeSiteContent } from "@/lib/content";
import { type SiteContent, validateSiteContent } from "@/lib/site-content";

export async function loginAdmin(_prev: { error?: string } | null, formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (password !== getAdminPassword()) {
    return { error: "Invalid password." };
  }
  await setAdminSession();
  redirect("/admin");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin");
}

export async function saveSiteContentAction(content: SiteContent) {
  if (!(await isAdminAuthenticated())) {
    return { error: "You need to sign in again." };
  }

  const errors = validateSiteContent(content);
  if (errors.length > 0) {
    return { error: errors[0] };
  }

  try {
    const result = await writeSiteContent(content);
    updateTag(SITE_CONTENT_TAG);
    revalidatePath("/", "layout");
    revalidatePath("/admin");
    return { ok: true as const, message: result.message };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save content.";
    return { error: message };
  }
}
