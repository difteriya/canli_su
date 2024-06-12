import { setTokenCookie, getTokenCookie } from "./auth-cookies";

export async function setLoginSession(res, token) {
  setTokenCookie(res, token);
}

export async function getLoginSession(req) {
  const token = getTokenCookie(req);

  return token;
}
