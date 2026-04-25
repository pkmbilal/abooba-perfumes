export const POST_AUTH_REDIRECT = "/auth/redirect";

export function buildAuthCallbackUrl(origin, next = POST_AUTH_REDIRECT) {
  if (!origin) {
    return undefined;
  }

  return `${origin}/auth/callback?next=${encodeURIComponent(next)}`;
}
