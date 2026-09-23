import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "admin_session";

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "admin";
}

export function isDefaultAdminPassword() {
  return !process.env.ADMIN_PASSWORD;
}

function sessionToken() {
  return createHmac("sha256", getAdminPassword()).update("marsa-admin-session").digest("hex");
}

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function isAdminAuthenticated() {
  const store = await cookies();
  const value = store.get(ADMIN_SESSION_COOKIE)?.value;
  return Boolean(value && safeEqual(value, sessionToken()));
}

export async function setAdminSession() {
  const store = await cookies();
  store.set(ADMIN_SESSION_COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(ADMIN_SESSION_COOKIE);
}
