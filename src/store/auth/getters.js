/*
export function someGetter (state) {
}
*/
export function fullName(state) {
  if (state.user != {} && state.user != null) {
    return state.user.first_name + " " + state.user.last_name;
  } else {
    return "";
  }
}
