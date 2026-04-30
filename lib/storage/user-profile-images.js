export const USER_PROFILE_IMAGES_BUCKET = "user-profile-images";
export const USER_PROFILE_IMAGES_FOLDER = "profiles";

const IMAGE_EXTENSIONS = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export function getProfileImageExtension(contentType) {
  return IMAGE_EXTENSIONS[contentType] ?? "";
}

export function sanitizeProfileImageFileName(name) {
  const trimmedName = String(name ?? "").trim().toLowerCase();
  const baseName = trimmedName.replace(/\.[^.]+$/, "");
  const safeBaseName = baseName
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 50);

  return safeBaseName || "profile-image";
}

export function buildUserProfileImagePath({ userId, fileName, contentType }) {
  const extension = getProfileImageExtension(contentType) || "jpg";
  const uniqueId =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}`;
  const safeFileName = sanitizeProfileImageFileName(fileName);

  return `${USER_PROFILE_IMAGES_FOLDER}/${userId}/${uniqueId}-${safeFileName}.${extension}`;
}
