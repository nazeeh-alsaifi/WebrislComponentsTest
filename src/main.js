import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css";
import "video.js/dist/video-js.css";
Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
