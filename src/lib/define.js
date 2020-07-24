class defaultConfig {
  constructor(params = {}) {
    /**props属性配置 */
    this.props = {};
    /**attrs属性配置 */
    this.attrs = {};
    /**监听事件 */
    this.on = {};
    this.userDefineProps = {};
    Object.assign(this, params);
  }
}
export class FormElemntConfig {
  constructor(tagName, params) {
    /**是否前端渲染组件 等同于v-if */
    this.isRender = true;
    /**是否前端显示组件 等同于v-show */
    this.isShow = true;
    /**预留字段 如果后端采用自定义 是否后端解析该组件 */
    this.isAnalysis = false;
    /**组件所有子节点 */
    this.children = [];
    /**组件布局方式的配置 */
    this.__layoutConfig__ = new defaultConfig({ props: { span: 24 } });
    /**el-form-item如果是表单元素 则进行配置 */
    this.__formItemConfig__ = new defaultConfig();
    /**el-[control] 控件配置 */
    this.__controlConfig__ = new defaultConfig();
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
  pushChild(el) {
    this.children.push(el);
  }
  static createUnique() {
    return {
      id: new Date().getTime() + Math.floor(Math.random() * 100),
      model: "random" + Math.floor(Math.random() * 100)
    };
  }
  static clone(formElemntConfig) {
    let cloneformElemntConfig = JSON.parse(JSON.stringify(formElemntConfig));
    Object.assign(cloneformElemntConfig, FormElemntConfig.createUnique());
    return cloneformElemntConfig;
  }
}
