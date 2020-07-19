import { TOKEN_KEY } from "../../constants";

export const isAuthenticated = () => {
  return localStorage.getItem(TOKEN_KEY);
};
