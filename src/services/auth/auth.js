import { TOKEN_KEY } from "../../constants";

export const auth = {
  login(token, cb) {
    localStorage.setItem(TOKEN_KEY, token);
    if (typeof cb === "function") cb();
  },
  signup(token, cb) {
    localStorage.setItem(TOKEN_KEY, token);
    if (typeof cb === "function") cb();
  },

  logout(cb) {
    localStorage.removeItem(TOKEN_KEY);
    if (typeof cb === "function") cb();
  },
};
