import Vue from "Vue";
import { FormElemntConfig, ISuerDefineProps } from "../define";
import componentsPack from "../services/index";

import draggable from "vuedraggable";
import componentRegister from "../defaultComponents/index";

const isEmpty = (e: any) => typeof e === "undefined" || e === null;

const copy = (e: any) => JSON.parse(JSON.stringify(e));

/**将字符串 切割为 数组 */
const SPLITEXPRESSION = /^(\w+)\s+([>|<|=]=?)\s+(\w+)$/;

const components = {
  itemBtns(h: Vue.CreateElement, element: any, parent: string | any[]) {
    const { copyItem, deleteItem } = this.$listeners;
    return [
      h(
        "span",
        {
          class: "drawing-item-copy",
          attrs: { title: "复制" },
          on: {
            click(event: { stopPropagation: () => void }) {
              copyItem(element, parent);
              event.stopPropagation();
            }
          }
        },
        [h("i", { class: "el-icon-copy-document" })]
      ),
      h(
        "span",
        {
          class: "drawing-item-delete",
          attrs: { title: "删除" },
          on: {
            click(event: { stopPropagation: () => void }) {
              deleteItem(parent.indexOf(element), parent);
              event.stopPropagation();
            }
          }
        },
        [h("i", { class: "el-icon-delete" })]
      )
    ];
  }
};

/**
 *
 * @param h
 * @param formConfig
 * @param formMap
 * @this {Vue}
 * @returns { VNode }
 */
export function renderItem(h: Vue.CreateElement, formConfig: FormElemntConfig, formMap: any, parent: any): Vue.VNode {
  const { activeItem } = this.$listeners;

  let { tagName, serviceName = tagName, __layoutConfig__ = {}, __formItemConfig__ = {}, __controlConfig__ = {} } = formConfig as any;

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

  let className = this.activeId === formConfig.id ? "drawing-item active-from-item" : "drawing-item";

  let clone__layoutConfig__ = `${formConfig.__layoutConfig__?.class || ""} ${className}`;

  /**根据配置参数 生成是否需要绑定formMap 和 controlConfig */
  let autoGenerateProps: { userDefineProps?: ISuerDefineProps; [key: string]: any } = __controlConfig__.userDefineProps ? { userDefine: __controlConfig__.userDefineProps } : {};
  if (autoGenerateProps.userDefine?.optionType) {
    autoGenerateProps.formMap = formMap;
    autoGenerateProps.controlConfig = controlConfig;
  }

  /**
   * @TODO: rules:${JSON.stringify(formItemConfig.props.rules || [])} 解决requiredExpression改变后组件没有重新渲染
   */
  let uuid = JSON.stringify(formConfig) + `rules:${JSON.stringify(formItemConfig.props.rules || [])}`;

  // let controlKey = JSON.stringify(formConfig);
  // console.log(JSON.stringify(formConfig));
  // nativeOnClick={event => { activeItem(element); event.stopPropagation() }}>
  return h(
    "el-col",
    {
      /**@FIXME:修复组件复用dom元素，导致dom元素上的事件没有清空 */
      key: formConfig.id,
      props: { ...__layoutConfig__.props },
      attrs: { ...__layoutConfig__.attrs },
      nativeOn: {
        click(event: { stopPropagation: () => void }) {
          activeItem(formConfig);
          event.stopPropagation();
        }
      },
      class: clone__layoutConfig__ || __layoutConfig__.class,
      style: __layoutConfig__.style
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
      ),
      components.itemBtns.call(this, h, formConfig, parent)
    ]
  );
}

export function renderCollection(h: Vue.CreateElement, formConfigList: FormElemntConfig[], formMap: any): Vue.VNode[] {
  return formConfigList.map(formConfig => {
    return renderChild.call(this, h, formConfig, formConfigList, formMap);
  });
}

export function renderChild(h: Vue.CreateElement, formConfig: FormElemntConfig, formConfigList: any, formMap: any): Vue.VNode {
  let { __layout__ } = formConfig;
  if (__layout__ === "rowFormItem") {
    // let className = this.activeId === formConfig.id ? "drawing-row-item active-from-item" : "drawing-row-item";
    // formConfig.__controlConfig__ = {};
    // formConfig.__controlConfig__.class = `${formConfig.__controlConfig__.class || ""} ${className}`;
    return renderRow.call(this, h, formConfig, formMap, formConfigList);
  }
  if (__layout__ === "colFormItem") {
    // let className = this.activeId === formConfig.id ? "drawing-item active-from-item" : "drawing-item";
    // formConfig.__layoutConfig__.class = `${formConfig.__layoutConfig__.class || ""} ${className}`;
    return renderItem.call(this, h, formConfig, formMap, formConfigList);
  }
}

export function renderRow(h: Vue.CreateElement, formConfig: FormElemntConfig, formMap: any, parent: any) {
  const { activeItem } = this.$listeners;

  let { __layoutConfig__ = {}, __controlConfig__ = {} as any } = formConfig;
  let children = formConfig.children || [];
  let childrenNode = renderCollection.call(this, h, children, formMap);

  let className = this.activeId === formConfig.id ? "drawing-row-item active-from-item" : "drawing-row-item";
  let clone__controlConfig__class = `${formConfig.__controlConfig__?.class || ""} ${className}`;

  return h(
    "el-col",
    {
      props: __layoutConfig__.props,
      attrs: __layoutConfig__.attrs,
      class: __layoutConfig__.class,
      style: __layoutConfig__.style,
      nativeOn: {
        click(event: { stopPropagation: () => void }) {
          activeItem(formConfig);
          event.stopPropagation();
        }
      }
    },
    [
      h(
        "el-row",
        {
          props: __controlConfig__.props,
          attrs: __controlConfig__.attrs,
          class: clone__controlConfig__class || __controlConfig__.class,
          style: __controlConfig__.style
        },
        [
          h(
            "span",
            {
              class: "component-name"
            },
            [formConfig.id]
          ),
          h(
            draggable,
            {
              props: { list: children, animation: 340 },
              attrs: { group: "componentsGroup" },
              class: "drag-wrapper"
            },
            [childrenNode]
          ),
          components.itemBtns.call(this, h, formConfig, parent)
        ]
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

/**
 * 初始化v-model事件
 * 根据defaultValue绑定初始值
 * @param param0
 * @param formMap
 */
export const initVmodel = function({ controlConfig, formConfig }: any, formMap: { [x: string]: any }) {
  controlConfig.props = controlConfig.props || {};
  controlConfig.on = controlConfig.on || {};
  controlConfig.props["value"] = formMap[formConfig.model] || controlConfig.defaultValue;

  controlConfig.on["input"] = (e: any) => {
    this.$set(formMap, formConfig.model, e || null);
  };

  return controlConfig;
};

/**
 * 默认绑定props验证属性为当前model
 * 默认根据required生成验证规则
 * @param param0
 */
export const initFormEl = ({ formItemConfig, formConfig, userDefine, formMap }: any) => {
  if (isEmpty(formItemConfig.props["prop"])) formItemConfig.props["prop"] = formConfig.model;
  let required = formItemConfig.props.required;

  if (!required && userDefine?.requiredExpression) {
    let requiredExpression = userDefine.requiredExpression || "";
    let expression = requiredExpression.match(SPLITEXPRESSION) || [];
    let operator = expression[2];
    let currentValue = formMap[expression[1]];
    let targetValue = expression[3];
    if (typeof targetValue !== "undefined") {
      switch (operator) {
        case "==":
          required = currentValue == targetValue;
          break;
        case ">":
          required = currentValue > targetValue;
          break;
        case "<":
          required = currentValue < targetValue;
          break;
        case ">=":
          required = currentValue >= targetValue;
          break;
        case "<=":
          required = currentValue <= targetValue;
          break;
        default:
          required = false;
          break;
      }
    }
  }
  if (required) {
    formItemConfig.props.rules.push({
      required: true,
      message: `请输入${formItemConfig.props.label}`,
      trigger: ["blur", "change"]
    });
  }
};
