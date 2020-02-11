import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import moment from "moment";
import "normalize.css/normalize.css";
import "./styles.scss";

Vue.use(ElementUI);
// Object.defineProperty(Vue, "$moment", moment);
Vue.prototype.$moment = moment;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
