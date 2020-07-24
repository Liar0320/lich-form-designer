// @ts-ignore
import elCheckboxGroup from "@/packages/elCheckboxGroup";
// @ts-ignore
import elRadioGroup from "@/packages/elRadioGroup";
// @ts-ignore
import select from "@/packages/elSelect";
/**
 * @class 组件注册 提供一个组件注册工具 根据定义的组件type会优先从此获取组件
 */
class ComponentRegister {
  constructor() {
    this.components = {};
  }
  get(name) {
    return this.components[name];
  }
  register(component) {
    this.components[component.name] = component;
  }
  has(serviceName) {
    return !!this.components[serviceName];
  }
}
const componentRegister = new ComponentRegister();
componentRegister.register(select);
componentRegister.register(elCheckboxGroup);
componentRegister.register(elRadioGroup);
export default componentRegister;
