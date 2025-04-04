import { createContext } from "./context.js";

export const userContext = createContext({
  path: "/",
  isLoggedIn: false,
  user: null,
  error: null,
});

function syncLocalStorage(state) {
  // 초기 상태인지 확인
  const isInitialState =
    state.isLoggedIn === false && state.user === null && state.path === "/";

  if (!isInitialState) {
    if (state.isLoggedIn && state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("isLoggedIn", "true");
    } else {
      localStorage.removeItem("user");
      localStorage.setItem("isLoggedIn", "false");
    }
    localStorage.setItem("path", state.path);
  }
}

userContext.subscribe(syncLocalStorage);
