import { cookies } from "next/headers";

const COOKIE_NAME = "rp_admin_session";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 14; // 14 days

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function constantTimeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

async function expectedToken(): Promise<string | null> {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return sha256Hex(password);
}

export async function verifyPassword(
  submitted: string,
): Promise<{ ok: true; token: string } | { ok: false }> {
  if (!submitted) return { ok: false };
  const expected = await expectedToken();
  if (!expected) return { ok: false };
  const submittedHash = await sha256Hex(submitted);
  if (!constantTimeEqualHex(submittedHash, expected)) return { ok: false };
  return { ok: true, token: expected };
}

export async function startSession(token: string) {
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE_SECONDS,
  });
}

export async function endSession() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return false;
  const expected = await expectedToken();
  if (!expected) return false;
  return constantTimeEqualHex(token, expected);
}

export async function isAuthenticatedFromCookie(
  cookieValue: string | undefined,
): Promise<boolean> {
  if (!cookieValue) return false;
  const expected = await expectedToken();
  if (!expected) return false;
  return constantTimeEqualHex(cookieValue, expected);
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
