export const adminCookieName = "laimartx_admin_session";

export function getAdminSessionValue() {
  const email = process.env.ADMIN_EMAIL || "";
  const password = process.env.ADMIN_PASSWORD || "";
  const secret = process.env.ADMIN_SESSION_SECRET || "";

  if (!email || !password || !secret) return "";

  return secret;
}

export function hasAdminCredentials() {
  return Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET);
}
