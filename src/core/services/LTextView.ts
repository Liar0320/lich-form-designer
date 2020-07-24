import Vue from "Vue";
import { ComponentsBaseService } from "./services";
import { FormElemntConfig } from "../define";

export default class LTextView extends ComponentsBaseService {
  serviceName = "LTextView";
  render(h: Vue.CreateElement, formConfig: FormElemntConfig, formMap: { [x: string]: any }) {
    let value = formMap[formConfig["__controlConfig__"]["userDefineProps"]["textModel"]] || formConfig.defaultValue;
    return h("div", {}, value);
  }
}
