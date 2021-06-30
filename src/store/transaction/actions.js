/*
export function someAction (context) {
}
*/

import TransactionService from "../../services/TransactionService";
export function fetchTransactions({ commit }) {
  TransactionService.getTransactions()
    .then(response => {
      commit("SET_TRANSACTION", response.data);
    })
    .catch(e => {
      console.log(e);
    });
}
