/*
export function someAction (context) {
}
*/
import AuthentificationService from "../../services/AuthentificationService";
import router from "../../router/index.js";
export function login({ commit }, credentials) {
  commit("RESET_ERRORS");
  return AuthentificationService.login(credentials)
    .then(response => {
      commit("SET_USER", response.data.user);
      //console.log(response.data);
      router().push("/");
    })
    .catch(e => {
      //console.log(e);
      commit("SET_ERRORS", e.response.data.message);
    });
}
export function register({ commit }, credentials) {
  commit("RESET_ERRORS");
  return AuthentificationService.register(credentials).then(() => {
    commit("REGISTER_USER");
    //console.log(response.data);
  });
}
export function logout({ commit }) {
  commit("LOGOUT");
  router().push("/login");
  //location.reload();
}
export function loadUser({ commit }, userData) {
  commit("SET_USER", userData);
}
