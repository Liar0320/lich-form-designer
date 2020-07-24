import { ComponentsBaseService } from "./services";
import componentRegister from "../defaultComponents/index";
import { initVmodel } from "../render/creator";
export default class LElSelect extends ComponentsBaseService {
  constructor() {
    super(...arguments);
    this.serviceName = "LElSelect";
  }
  render(h, formConfig, formMap) {
    let { __controlConfig__ } = formConfig;
    let controlConfig = JSON.parse(JSON.stringify(__controlConfig__));
    initVmodel.call(this, { controlConfig, formConfig }, formMap);
    return h(componentRegister.get("LElSelect"), {
      key: JSON.stringify(formConfig),
      props: {
        value: formMap[formConfig.model],
        formMap: formMap,
        controlConfig: __controlConfig__,
        userDefine: __controlConfig__.userDefineProps,
        key: JSON.stringify(formConfig)
      },
      on: controlConfig.on
    });
  }
}
