import { IComponentService, EComponentType, EElCompoents } from "./types";
const initComponentsConfig: IComponentService[] = [
  {
    name: "单行文框",
    tag: EElCompoents.El_input,
    icon: "input",
    type: EComponentType.FormComponent,
    controlPanel: EElCompoents.El_input
  },
  {
    name: "多行本框",
    tag: EElCompoents.El_input,
    icon: "textarea",
    type: EComponentType.FormComponent,
    attrs: { type: "textarea" },
    controlPanel: EElCompoents.El_input
  },
  {
    name: "密码",
    tag: EElCompoents.El_input,
    icon: "password",
    type: EComponentType.FormComponent,
    attrs: { type: "password", "show-password": true, placeholder: "请输入密码" },
    controlPanel: EElCompoents.El_input
  },
  {
    name: "选择框",
    tag: "LElSelect" || EElCompoents.El_select,
    serviceName: "LElSelect",
    icon: "select",
    type: EComponentType.FormComponent,
    userDefineProps: {
      optionType: "static",
      optionCollection: [
        {
          label: "参数值一",
          value: "1"
        },
        {
          label: "参数值二",
          value: "2"
        }
      ]
    },
    document: "https://element.eleme.cn/#/zh-CN/component/select",
    controlPanel: "LElSelect"
  },
  {
    name: "数字框",
    tag: EElCompoents.El_input_number,
    icon: "number",
    type: EComponentType.FormComponent,
    controlPanel: EElCompoents.El_input_number
  },
  {
    name: "开关",
    tag: EElCompoents.El_switch,
    icon: "switch",
    type: EComponentType.FormComponent,
    controlPanel: EElCompoents.El_switch
  },

  {
    name: "多选框组合",
    tag: "LElCheckboxGroup" || EElCompoents.El_checkbox_group,
    icon: "checkbox",
    type: EComponentType.FormComponent,
    userDefineProps: {
      optionType: "static",
      optionCollection: [
        {
          label: "参数值一",
          value: "1"
        },
        {
          label: "参数值二",
          value: "2"
        }
      ]
    },
    controlPanel: "LElSelect"
  },
  {
    name: "单选框组合",
    tag: "LElRadioGroup" || EElCompoents.El_radio_group,
    icon: "radio",
    type: EComponentType.FormComponent,
    userDefineProps: {
      optionType: "static",
      optionCollection: [
        {
          label: "参数值一",
          value: "1"
        },
        {
          label: "参数值二",
          value: "2"
        }
      ]
    },
    controlPanel: "LElSelect"
  },
  {
    name: "是否选择器",
    tag: EElCompoents.El_checkbox,
    icon: "checkbox",
    type: EComponentType.FormComponent,
    controlPanel: EElCompoents.El_checkbox
  },
  {
    name: "滑块",
    tag: EElCompoents.El_slider,
    icon: "slider",
    type: EComponentType.FormComponent,
    controlPanel: EElCompoents.El_slider
  },
  {
    name: "日期选择",
    tag: EElCompoents.El_date_picker,
    icon: "date",
    type: EComponentType.FormComponent,
    attrs: { style: "width:100%" },
    controlPanel: EElCompoents.El_date_picker
  },
  {
    name: "日期范围",
    tag: EElCompoents.El_date_picker,
    icon: "date-range",
    type: EComponentType.FormComponent,
    attrs: { type: "daterange", "range-separator": "至", style: "width:100%" },
    controlPanel: EElCompoents.El_date_picker
  },
  {
    name: "时间选择",
    tag: EElCompoents.El_time_picker,
    icon: "time",
    type: EComponentType.FormComponent,
    attrs: { style: "width:100%" },
    controlPanel: EElCompoents.El_time_picker
  },
  {
    name: "时间范围",
    tag: EElCompoents.El_time_picker,
    icon: "time-range",
    type: EComponentType.FormComponent,
    attrs: { "is-range": true, "range-separator": "至", placeholder: "选择时间范围", style: "width:100%" },
    controlPanel: EElCompoents.El_time_picker
  },

  {
    name: "颜色选择",
    tag: EElCompoents.El_color_picker,
    icon: "color",
    type: EComponentType.FormComponent,
    controlPanel: EElCompoents.El_color_picker
  },
  {
    name: "评分",
    tag: EElCompoents.El_rate,
    icon: "rate",
    type: EComponentType.FormComponent,
    controlPanel: EElCompoents.El_rate
  },

  {
    name: "行容器",
    tag: EElCompoents.El_row,
    icon: "row",
    type: EComponentType.BasicComponent,
    document: "https://element.eleme.cn/#/zh-CN/component/layout",
    controlPanel: EElCompoents.El_row
  },
  {
    name: "文字渲染器",
    tag: "LTextView",
    serviceName: "LTextView",
    isAnalysis: false,
    icon: "input",
    type: EComponentType.DefineComponents,
    document: "https://element.eleme.cn/#/zh-CN/component/layout",
    controlPanel: null
  }
];

export interface IdefaultElementService {
  collection: Array<IComponentService>;
  initService(type: IComponentService): void;
  createUUid(type: IComponentService, index: any): string;
}

/**
 * 1.提供一个基础的维护组件
 * 2.提供一个外部注入组件的方式
 */
class DefaultElementService {
  collection = initComponentsConfig.map((v: any, index: any) => {
    v.uuid = DefaultElementService.createUUid(v, index);
    return v;
  });
  /**注入一个新的组件 */
  initService(type: IComponentService) {
    type.uuid = DefaultElementService.createUUid(type, this.collection.length);
    this.collection.push(type);
  }

  static createUUid(type: IComponentService, index: any) {
    return type.tag + "-" + index;
  }
}

export default new DefaultElementService();
