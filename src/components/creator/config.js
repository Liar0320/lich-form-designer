import { FormElemntConfig } from "@/lib/define";
import { EComponentType } from "@/lib/types";
import defaultElement from "@/lib/defaultElement";
import { templateJSON } from "@/defaultTemplate/index";

// 表单属性【右面板】
export const formConf = {
  formRef: "elForm",
  formModel: "formData",
  size: "medium",
  labelPosition: "right",
  labelWidth: 100,
  formRules: "rules",
  gutter: 15,
  disabled: false,
  span: 24,
  formBtns: true
};

let basicComponentCollection = defaultElement.collection.filter(v => v.type === EComponentType.BasicComponent);

let formComponentCollection = defaultElement.collection.filter(v => v.type === EComponentType.FormComponent);

let defineComponentsCollection = defaultElement.collection.filter(v => v.type === EComponentType.DefineComponents);
const createCreatorComponent = v => {
  return new FormElemntConfig(v.tag, {
    name: v.name,
    tagIcon: v.icon,
    serviceName: v.serviceName,
    controlPanel: v.controlPanel,
    uuid: v.uuid,
    isAnalysis: v.isAnalysis === undefined ? true : v.isAnalysis,
    __formItemConfig__: {
      props: {
        label: v.name,
        rules: []
      }
    },
    __controlConfig__: {
      props: v.props || {},
      attrs: v.attrs || {},
      userDefineProps: v.userDefineProps || {}
    },
    document: v.document
  });
};

// 基础组件 【左面板】
export const basicComponent = basicComponentCollection.map(createCreatorComponent);

// 表单 【左面板】
export const formComponent = formComponentCollection.map(createCreatorComponent);

export const defineComponent = defineComponentsCollection.map(createCreatorComponent);

export const defaultList = templateJSON[0].fields;
