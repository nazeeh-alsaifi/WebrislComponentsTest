import Vue from "vue";
import Vuex from "vuex";
import datatable from "./Modules/datatable";
import chart from "./Modules/chart";
import videoStore from "./Modules/videoStore";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    datatable,
    chart,
    videoStore,
  },
});
