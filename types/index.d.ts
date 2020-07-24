import Vue from "Vue";

export default interface lichFormDesigner {
  install: (Vue: Vue) => {};
}
/**表单设计器 */
export const lichFormCreator: Vue.Component;
/**表单解析器 */
export const lichFormParser: Vue.Component;

export { componentsService, ComponentsBaseService } from "../src/core/services/index";
export { default as defaultElementService } from "../src/core/defaultElement";
