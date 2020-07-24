import lichFormCreator from "@/components/creator/index.vue";
import lichFormParser from "@/components/parser/index.vue";

// import componentRegister from "@/lib/defaultComponents";
import { componentsService, ComponentsBaseService } from "@/lib/services/index";
export { default as defaultElementService } from "@/lib/defaultElement";
export { lichFormCreator, lichFormParser, ComponentsBaseService, componentsService };

export default {
  install(Vue) {
    Vue.component(lichFormCreator.name, lichFormCreator);
    Vue.component(lichFormParser.name, lichFormParser);
  }
};
