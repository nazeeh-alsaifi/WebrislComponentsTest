import Vue from "vue";
import Vuex from "vuex";
import datatable from "./Modules/datatable";
import chart from "./Modules/chart";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    datatable,
    chart,
  },
});
