/*
export function someAction (context) {
}
*/
import ApiService from "../../services/ApiService";

export function fetchApilist({ commit }) {
  ApiService.getApilist()
    .then(response => {
      commit("SET_LIST", response.data);
    })
    .catch(e => {
      console.log(e);
    });
}
export function createApilist({ commit }, payload) {
  return ApiService.postApilist(payload)
    .then(res => {
      commit("ADD_LIST", res.data.api);
    })
    .catch(e => {
      console.log(e);
    });
}
export function updateApilist({ commit }, payload) {
  return ApiService.updateApilist(payload)
    .then(() => {
      commit("UPDATE_LIST", payload);
    })
    .catch(e => {
      console.log(e);
    });
}
export function deleteApilist({ commit }, payload) {
  return ApiService.deleteApilist(payload)
    .then(() => {
      commit("DELETE_LIST", payload);
    })
    .catch(e => {
      console.log(e);
    });
}
