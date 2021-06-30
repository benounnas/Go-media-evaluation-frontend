/*
export function someMutation (state) {
}
*/

export function SET_LIST(state, apilist) {
  state.apilist = apilist;
}

export function ADD_LIST(state, payload) {
  state.apilist.push(payload);
}

export function UPDATE_LIST(state, payload) {
  Object.assign(state.apilist[payload.index], payload.apilist)[payload.index];
}

export function DELETE_LIST(state, payload) {
  state.apilist.splice(payload.index, 1);
}
