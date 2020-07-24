/**组件注册解析服务 */
export class ComponentsService {
  constructor() {
    this.components = {};
  }
  getService(serviceName) {
    return this.components[serviceName];
  }
  registerService(Service) {
    let service = new Service();
    this.components[service.serviceName] = service.render;
  }
  has(serviceName) {
    return !!this.components[serviceName];
  }
}
/**组件解析服务抽象类 */
export class ComponentsBaseService {
  constructor(serviceName) {
    this.serviceName = serviceName;
  }
}
