import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";

import "./styles/index.scss";

import { defaultElementService } from "lichFormDesigner";

console.log(defaultElementService);
// Vue.use(lichFormDesigner);

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
