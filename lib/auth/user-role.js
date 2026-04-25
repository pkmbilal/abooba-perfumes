export const DEFAULT_USER_DASHBOARD_PATH = "/dashboard";
export const ADMIN_DASHBOARD_PATH = "/admin/products";

export function getUserRole(user) {
  const role = user?.app_metadata?.role;

  return typeof role === "string" ? role.trim().toLowerCase() : "";
}

export function isAdminUser(user) {
  return getUserRole(user) === "admin";
}

export function getPostAuthRedirectPath(user) {
  return isAdminUser(user)
    ? ADMIN_DASHBOARD_PATH
    : DEFAULT_USER_DASHBOARD_PATH;
}
