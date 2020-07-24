import { VNodeData } from "vue/types/vnode";
// import { defaultConfig } from "./defaultConfig";
export interface IBaseElemntConfig extends VNodeData {
  /**表单名称 */
  name?: string;
  /**元素标签 */
  tagName?: string;
  /**绑定的字段 */
  model?: string;
  /**子集 */
  children?: IBaseElemntConfig[];
  [key: string]: any;
}
// interface IVnodeConfig {
//   style?: string | object[] | object;
//   props?: { [key: string]: any };
//   attrs?: { [key: string]: any };
// }

export interface ISuerDefineProps {
  /**默认值 */
  defaultValue?: any;
  /**选项类型 */
  optionType?: "static" | "dynamic";
  /**选项值 */
  optionCollection?: object[];
  /**选项值对应的label */
  optionLabel?: string;
  /**选项值对应的value */
  optionValue?: string;
  /**通过后台获取的接口名 */
  apiStringName?: string;
  /**通过后台获取的接口参数 */
  apiStringParams?: string;
  /**填充字段，将回调数据进行匹配赋值 */
  fillFields?: string | object | Array<string>;

  [key: string]: any;
}

class defaultConfig {
  /**css样式 */
  style: string | object[] | object;
  /**类样式 */
  class: any;
  /**props属性配置 */
  props: { [key: string]: any } = {};
  /**attrs属性配置 */
  attrs: { [key: string]: any } = {};
  /**监听事件 */
  on: { [key: string]: Function | Function[] } = {};

  userDefineProps: ISuerDefineProps = {};

  constructor(params = {}) {
    Object.assign(this, params);
  }
}
export class FormElemntConfig implements IBaseElemntConfig {
  /**组件唯一id */
  id: any;
  /**组件标签名 */
  tagName: string;
  /**组件标号 */
  control: number;
  /**组件配置组件界面 */
  controlPanel: string;
  /**是否前端渲染组件 等同于v-if */
  isRender: boolean = true;
  /**是否前端显示组件 等同于v-show */
  isShow: boolean = true;
  /**预留字段 如果后端采用自定义 是否后端解析该组件 */
  isAnalysis: boolean = false;
  /**解析组件的方式，参考render */
  serviceName: string;
  /**组件名称 */
  name: string;
  /**组件字段名 */
  model: string;
  /**组件所有子节点 */
  children: IBaseElemntConfig[] = [];
  /**案例图标 */
  tagIcon: string;
  /**官方文档 */
  document: string;
  /**组件布局方式 是列还是行 */
  __layout__: "colFormItem" | "rowFormItem";
  /**组件布局方式的配置 */
  __layoutConfig__: {
    style?: string | object[] | object;
    props?: { [key: string]: any };
    attrs?: { [key: string]: any };
    class?: any;
  } = new defaultConfig({ props: { span: 24 } });

  /**el-form-item如果是表单元素 则进行配置 */
  __formItemConfig__: defaultConfig = new defaultConfig();
  /**el-[control] 控件配置 */
  __controlConfig__: defaultConfig = new defaultConfig();

  /**自定义键值 */
  [key: string]: any;

  constructor(tagName: string, params: IBaseElemntConfig) {
    this.tagName = tagName;
    if (this.tagName === "el-row") {
      this.__layout__ = "rowFormItem";
    } else {
      this.__layout__ = "colFormItem";
    }

    Object.assign(this, FormElemntConfig.createUnique(), {}, params);
  }
  // /**更新字段 */
  // updateField(field: string | number, value: any) {
  //   this[field] = value;
  // }

  /**添加子集 */
  pushChild(el: IBaseElemntConfig) {
    this.children.push(el);
  }

  static createUnique() {
    return {
      id: new Date().getTime() + Math.floor(Math.random() * 100),
      model: "random" + Math.floor(Math.random() * 100)
    };
  }

  static clone(formElemntConfig: any) {
    let cloneformElemntConfig = JSON.parse(JSON.stringify(formElemntConfig));
    Object.assign(cloneformElemntConfig, FormElemntConfig.createUnique());
    return cloneformElemntConfig;
  }
}
