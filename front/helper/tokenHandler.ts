import ls from "localstorage-slim";
export function setToken(token: string) {
  const value = {
    token: token,
  };
  ls.set("sheet-hub", token, { ttl: 86400 });
}
export function getToken() {
  return ls.get("sheet-hub");
}
export function removeToken() {
  ls.remove("sheet-hub");
}
