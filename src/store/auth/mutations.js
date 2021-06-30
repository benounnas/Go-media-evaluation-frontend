/*
export function someMutation (state) {
}
*/
import { apiClient } from "../../services/api";
export function SET_USER_LOGIN(state, data) {
  state.isLoggedIn = true;
  state.user = data.user;
  state.token = data.token;

  localStorage.setItem("userData", JSON.stringify(data));
}
export function SET_USER_TOKEN(state, data) {
  state.isLoggedIn = true;
  state.user = data.user;
  state.token = data.token;
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
