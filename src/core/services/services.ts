import { VNode } from "vue/types/vnode";
import { FormElemntConfig } from "../define";
/**组件注册解析服务 */
export class ComponentsService {
  private components: { [key: string]: any } = {};

  getService(serviceName: string) {
    return this.components[serviceName];
  }

  registerService(Service: any) {
    let service: ComponentsBaseService = new Service();
    this.components[service.serviceName] = service.render;
  }

  has(serviceName: string) {
    return !!this.components[serviceName];
  }
}

/**组件解析服务抽象类 */
export abstract class ComponentsBaseService {
  public serviceName: string;
  $set: any;
  constructor(serviceName: string) {
    this.serviceName = serviceName;
  }
  abstract render(h: Vue.CreateElement, formConfig: FormElemntConfig, formMap: any): VNode;
}
