import "server-only";

export const INSTAGRAM_ACCOUNT_URL = "https://www.instagram.com/aboobaperfumes/";

const DEFAULT_REEL_LIMIT = 6;
const DEFAULT_GRAPH_API_VERSION = "v25.0";

function getInstagramConfig() {
  return {
    accessToken: process.env.INSTAGRAM_ACCESS_TOKEN,
    graphApiVersion:
      process.env.INSTAGRAM_GRAPH_API_VERSION || DEFAULT_GRAPH_API_VERSION,
    userId: process.env.INSTAGRAM_USER_ID,
  };
}

function normalizeReel(reel) {
  return {
    id: reel.id,
    caption: reel.caption || "Instagram reel",
    imageUrl: reel.thumbnail_url || reel.media_url || "",
    permalink: reel.permalink || INSTAGRAM_ACCOUNT_URL,
    timestamp: reel.timestamp || "",
  };
}

function isReel(media) {
  return (
    media.media_product_type === "REELS" ||
    media.permalink?.includes("/reel/")
  );
}

export async function getInstagramReels(limit = DEFAULT_REEL_LIMIT) {
  const { accessToken, graphApiVersion, userId } = getInstagramConfig();

  if (!accessToken || !userId) {
    return [];
  }

  const params = new URLSearchParams({
    access_token: accessToken,
    fields:
      "id,caption,media_type,media_product_type,media_url,thumbnail_url,permalink,timestamp",
    limit: String(Math.max(limit * 2, limit)),
  });
  const url = `https://graph.facebook.com/${graphApiVersion}/${userId}/media?${params.toString()}`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: 60 * 60,
      },
    });

    if (!response.ok) {
      return [];
    }

    const payload = await response.json();

    if (!Array.isArray(payload.data)) {
      return [];
    }

    return payload.data
      .filter(isReel)
      .slice(0, limit)
      .map(normalizeReel);
  } catch {
    return [];
  }
}
