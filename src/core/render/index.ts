import Vue, { VNode } from "Vue";
import { FormElemntConfig, ISuerDefineProps } from "../define";
import componentsPack from "../services/index.js";
import componentRegister from "../defaultComponents/index";
import { initVmodel, initFormEl } from "./creator";

const copy = (e: any) => JSON.parse(JSON.stringify(e));
/**
 *
 * @param h
 * @param formConfig
 * @param formMap
 * @this {Vue}
 * @returns { VNode }
 */
export function renderItem(h: Vue.CreateElement, formConfig: FormElemntConfig, formMap: any): Vue.VNode {
  let { tagName, serviceName = tagName, __layoutConfig__ = {}, __formItemConfig__ = {}, __controlConfig__ = {} as any } = formConfig;
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
  let autoGenerateProps: { userDefineProps?: ISuerDefineProps; [key: string]: any } = __controlConfig__?.userDefineProps ? { userDefine: __controlConfig__.userDefineProps } : {};
  if (autoGenerateProps.userDefine?.optionType) {
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
      props: { ...__layoutConfig__.props },
      attrs: { ...__layoutConfig__.attrs },
      class: __layoutConfig__.class,
      style: formConfig.isShow === false ? `display:none;${__layoutConfig__.style}` : __layoutConfig__.style
    },
    [
      h(
        "el-form-item",
        {
          key: uuid,
          props: { ...formItemConfig.props },
          attrs: { ...formItemConfig.attrs },
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
                  props: { ...controlConfig.props, ...autoGenerateProps },
                  attrs: { ...controlConfig.attrs },
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

export function renderCollection(h: Vue.CreateElement, formConfigList: FormElemntConfig[]): Vue.VNode[] {
  let { formMap } = this;
  return formConfigList
    .map(formConfig => {
      return formConfig.isRender === false ? null : renderChild.call(this, h, formConfig, formConfigList, formMap);
    })
    .fill((v: VNode | null) => !!v);
}

export function renderChild(h: Vue.CreateElement, formConfig: FormElemntConfig, formConfigList: any, formMap: any): Vue.VNode {
  let { __layout__ } = formConfig;
  if (__layout__ === "rowFormItem") {
    return renderRow.call(this, h, formConfig, formMap, formConfigList);
  }
  if (__layout__ === "colFormItem") {
    return renderItem.call(this, h, formConfig, formMap, formConfigList);
  }
}

export function renderRow(h: Vue.CreateElement, formConfig: FormElemntConfig, formMap: any) {
  let { __layoutConfig__ = {}, __controlConfig__ = {} as any } = formConfig;
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
export function directRender(h: Vue.CreateElement, formConfig: FormElemntConfig) {
  let { tagName, __controlConfig__ = {} as any } = formConfig;

  return h(tagName, {
    props: { ...__controlConfig__.props }
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
