import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import apilist from "./apilist";
import transaction from "./transaction";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    apilist,
    transaction
  }
});
