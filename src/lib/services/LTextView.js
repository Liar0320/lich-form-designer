import { ComponentsBaseService } from "./services";
export default class LTextView extends ComponentsBaseService {
  constructor() {
    super(...arguments);
    this.serviceName = "LTextView";
  }
  render(h, formConfig, formMap) {
    let value = formMap[formConfig["__controlConfig__"]["userDefineProps"]["textModel"]] || formConfig.defaultValue;
    return h("div", {}, value);
  }
}
