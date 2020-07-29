import componentsPack from "../services/index.js";
import componentRegister from "../defaultComponents/index";
import { initVmodel, initFormEl } from "./creator";
const copy = e => JSON.parse(JSON.stringify(e));
/**
 *
 * @param h
 * @param formConfig
 * @param formMap
 * @this {Vue}
 * @returns { VNode }
 */
export function renderItem(h, formConfig, formMap) {
  var _a;
  let { tagName, serviceName = tagName, __layoutConfig__ = {}, __formItemConfig__ = {}, __controlConfig__ = {} } = formConfig;
  let children = formConfig.children || [];
  let isUserAnalysis = null;
  /**检查是否含有自定义解析service */
  if (componentsPack.has(serviceName)) {
    isUserAnalysis = componentsPack.getService(serviceName).apply(this, arguments);
  }
  let controlConfig = copy(__controlConfig__);
  let formItemConfig = copy(__formItemConfig__);
  /**如果存在组件model，初始化组件的v-model
   * @TODO:待优化，采用vue内部的v-model解析方式
   */
  if (!isUserAnalysis && formConfig.model) {
    initVmodel.call(this, { controlConfig, formConfig }, formMap);
  }
  initFormEl({ formItemConfig, formConfig, userDefine: controlConfig.userDefineProps, formMap: formMap });
  /**根据配置参数 生成是否需要绑定formMap 和 controlConfig */
  let autoGenerateProps = (__controlConfig__ === null || __controlConfig__ === void 0 ? void 0 : __controlConfig__.userDefineProps) ? { userDefine: __controlConfig__.userDefineProps } : {};
  if ((_a = autoGenerateProps.userDefine) === null || _a === void 0 ? void 0 : _a.optionType) {
    autoGenerateProps.formMap = formMap;
    autoGenerateProps.controlConfig = controlConfig;
  }
  /**
   * @TODO: rules:${JSON.stringify(formItemConfig.props.rules || [])} 解决requiredExpression改变后组件没有重新渲染
   */
  let uuid = JSON.stringify(formConfig) + `rules:${JSON.stringify(formItemConfig.props.rules || [])}`;
  return h(
    "el-col",
    {
      /**@FIXME:修复组件复用dom元素，导致dom元素上的事件没有清空 */
      key: formConfig.id,
      props: Object.assign({}, __layoutConfig__.props),
      attrs: Object.assign({}, __layoutConfig__.attrs),
      class: __layoutConfig__.class,
      style: formConfig.isShow === false ? `display:none;${__layoutConfig__.style}` : __layoutConfig__.style
    },
    [
      h(
        "el-form-item",
        {
          key: uuid,
          props: Object.assign({}, formItemConfig.props),
          attrs: Object.assign({}, formItemConfig.attrs),
          class: formItemConfig.class,
          style: formItemConfig.style
        },
        [
          isUserAnalysis
            ? isUserAnalysis
            : h(
                componentRegister.get(tagName) || tagName,
                {
                  key: uuid,
                  props: Object.assign(Object.assign({}, controlConfig.props), autoGenerateProps),
                  attrs: Object.assign({}, controlConfig.attrs),
                  class: controlConfig.class,
                  style: controlConfig.style,
                  on: controlConfig.on
                },
                children.map(fc => directRender.call(this, h, fc, formMap))
              )
        ]
      )
    ]
  );
}
export function renderCollection(h, formConfigList) {
  let { formMap } = this;
  return formConfigList
    .map(formConfig => {
      return formConfig.isRender === false ? null : renderChild.call(this, h, formConfig, formConfigList, formMap);
    })
    .filter(v => !!v);
}
export function renderChild(h, formConfig, formConfigList, formMap) {
  let { __layout__ } = formConfig;
  if (__layout__ === "rowFormItem") {
    return renderRow.call(this, h, formConfig, formMap, formConfigList);
  }
  if (__layout__ === "colFormItem") {
    return renderItem.call(this, h, formConfig, formMap, formConfigList);
  }
}
export function renderRow(h, formConfig, formMap) {
  let { __layoutConfig__ = {}, __controlConfig__ = {} } = formConfig;
  let children = formConfig.children || [];
  let childrenNode = renderCollection.call(this, h, children, formMap);
  return h(
    "el-col",
    {
      props: __layoutConfig__.props,
      attrs: __layoutConfig__.attrs,
      class: __layoutConfig__.class,
      style: __layoutConfig__.style
    },
    [
      h(
        "el-row",
        {
          props: __controlConfig__.props,
          attrs: __controlConfig__.attrs,
          class: __controlConfig__.class,
          style: __controlConfig__.style
        },
        [childrenNode]
      )
    ]
  );
}
/**
 *直接渲染tag节点
 * @param h
 * @param formConfig
 * @param formMap
 * @this {Vue}
 */
export function directRender(h, formConfig) {
  let { tagName, __controlConfig__ = {} } = formConfig;
  return h(tagName, {
    props: Object.assign({}, __controlConfig__.props)
  });
}
// function createOptions(options: any[], keyValue) {
//   return options.map(v => {
//     return v.tagName
//       ? v
//       : new FormElemntConfig("el-option", {
//           __controlConfig__: {
//             props: {
//               label: v[keyValue.key || "label"],
//               value: v[keyValue.value || "value"]
//             }
//           }
//         });
//   });
// }
