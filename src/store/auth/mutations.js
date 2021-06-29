/*
export function someMutation (state) {
}
*/
import { apiClient } from "../../services/api";
export function SET_USER(state, user) {
  state.isLoggedIn = true;
  state.user = user.infos;
  state.token = user.token;
  localStorage.setItem("userData", JSON.stringify(user));
}
export function REGISTER_USER() {}
export function DISCONNECT_USER() {}
export function SET_ERRORS(state, error) {
  state.error = error;
}
export function RESET_ERRORS(state) {
  state.error = null;
}
export function LOGOUT(state) {
  state.user = null;
  state.isLoggedIn = false;
  localStorage.removeItem("userData");
  apiClient.defaults.headers.common["Authorization"] = null;
}
