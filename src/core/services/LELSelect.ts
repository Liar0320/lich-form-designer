import { ComponentsBaseService } from "./services";
import { FormElemntConfig } from "../define";
import componentRegister from "../defaultComponents/index";
import { initVmodel } from "../render/creator";

export default class LElSelect extends ComponentsBaseService {
  serviceName = "LElSelect";

  render(h: Vue.CreateElement, formConfig: FormElemntConfig, formMap: { [x: string]: any }) {
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
