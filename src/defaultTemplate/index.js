export const templateJSON = [
  {
    formConfig: {
      "label-width": "80px"
    },
    fields: [
      {
        isRender: true,
        isShow: true,
        isAnalysis: false,
        children: [],
        __layoutConfig__: {
          style: "",
          props: {
            span: 24
          },
          attrs: {},
          on: {},
          userDefineProps: {}
        },
        __formItemConfig__: {
          props: {
            label: "活动名称",
            rules: [],
            required: true
          },
          prop: "name"
        },
        __controlConfig__: {
          props: {},
          attrs: {},
          userDefineProps: {}
        },
        tagName: "el-input",
        __layout__: "colFormItem",
        id: 1593757474090,
        model: "name",
        name: "单行文框",
        tagIcon: "input",
        controlPanel: "el-input",
        uuid: "el-input-0",
        sortNum: 0
      },
      {
        isRender: true,
        isShow: true,
        isAnalysis: false,
        children: [],
        __layoutConfig__: {
          style: "",
          props: {
            span: 24
          },
          attrs: {},
          on: {},
          userDefineProps: {}
        },
        __formItemConfig__: {
          props: {
            label: "活动区域",
            rules: [],
            required: true
          },
          prop: "region"
        },
        __controlConfig__: {
          props: {},
          attrs: {},
          userDefineProps: {
            optionType: "static",
            optionCollection: [
              {
                label: "区域一",
                value: "shanghai"
              },
              {
                label: "区域二",
                value: "beijing"
              }
            ]
          }
        },
        tagName: "LElSelect",
        __layout__: "colFormItem",
        id: 1593757559172,
        model: "region",
        name: "选择框",
        tagIcon: "select",
        serviceName: "LElSelect",
        controlPanel: "LElSelect",
        uuid: "LElSelect-3",
        document: "https://element.eleme.cn/#/zh-CN/component/select",
        sortNum: 1
      },
      {
        isRender: true,
        isShow: true,
        isAnalysis: false,
        children: [],
        __layoutConfig__: {
          style: "",
          props: {
            span: 24
          },
          attrs: {},
          on: {},
          userDefineProps: {}
        },
        __formItemConfig__: {
          props: {
            label: "活动时间",
            rules: [],
            required: true
          },
          prop: "datetime"
        },
        __controlConfig__: {
          props: {},
          attrs: {
            style: "width:100%",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            "value-format": "yyyy-MM-dd HH:mm:ss"
          },
          userDefineProps: {}
        },
        tagName: "el-date-picker",
        __layout__: "colFormItem",
        id: 1593757620681,
        model: "datetime",
        name: "日期选择",
        tagIcon: "date",
        controlPanel: "el-date-picker",
        uuid: "el-date-picker-7",
        sortNum: 2
      },
      {
        isRender: true,
        isShow: true,
        isAnalysis: false,
        children: [],
        __layoutConfig__: {
          style: "",
          props: {
            span: 24
          },
          attrs: {},
          on: {},
          userDefineProps: {}
        },
        __formItemConfig__: {
          props: {
            label: "特殊资源",
            rules: [],
            required: true
          },
          prop: "resource"
        },
        __controlConfig__: {
          props: {},
          attrs: {},
          userDefineProps: {
            optionType: "static",
            optionCollection: [
              {
                label: "线上品牌商赞助",
                value: "线上品牌商赞助"
              },
              {
                label: "线下场地免费",
                value: "线下场地免费"
              }
            ]
          }
        },
        tagName: "LElRadioGroup",
        __layout__: "colFormItem",
        id: 1593758691965,
        model: "resource",
        name: "单选框组合",
        tagIcon: "radio",
        controlPanel: "LElSelect",
        uuid: "LElRadioGroup-7",
        sortNum: 3
      },
      {
        isRender: true,
        isShow: true,
        isAnalysis: false,
        children: [],
        __layoutConfig__: {
          style: "",
          props: {
            span: 24
          },
          attrs: {},
          on: {},
          userDefineProps: {}
        },
        __formItemConfig__: {
          props: {
            label: "即时配送",
            rules: [],
            required: false
          },
          prop: "delivery"
        },
        __controlConfig__: {
          props: {},
          attrs: {},
          userDefineProps: {}
        },
        tagName: "el-switch",
        __layout__: "colFormItem",
        id: 1593757689726,
        model: "delivery",
        name: "开关",
        tagIcon: "switch",
        controlPanel: "el-switch",
        uuid: "el-switch-11",
        sortNum: 4
      },
      {
        isRender: true,
        isShow: true,
        isAnalysis: false,
        children: [],
        __layoutConfig__: {
          style: "",
          props: {
            span: 24
          },
          attrs: {},
          on: {},
          userDefineProps: {}
        },
        __formItemConfig__: {
          props: {
            label: "活动性质",
            rules: [],
            required: true
          },
          prop: "type"
        },
        __controlConfig__: {
          props: {},
          attrs: {},
          userDefineProps: {
            optionType: "static",
            optionCollection: [
              {
                label: "美食/餐厅线上活动",
                value: "美食/餐厅线上活动"
              },
              {
                label: "地推活动",
                value: "地推活动"
              },
              {
                label: "线下主题活动",
                value: "线下主题活动"
              },
              {
                label: "单纯品牌曝光",
                value: "单纯品牌曝光"
              }
            ]
          }
        },
        tagName: "LElCheckboxGroup",
        __layout__: "colFormItem",
        id: 1593757725934,
        model: "type",
        name: "多选框组合",
        tagIcon: "checkbox",
        controlPanel: "LElSelect",
        uuid: "LElCheckboxGroup-6",
        sortNum: 5
      },
      {
        isRender: true,
        isShow: true,
        isAnalysis: false,
        children: [],
        __layoutConfig__: {
          style: "",
          props: {
            span: 24
          },
          attrs: {},
          on: {},
          userDefineProps: {}
        },
        __formItemConfig__: {
          props: {
            label: "活动形式",
            rules: [],
            required: true
          },
          prop: "desc"
        },
        __controlConfig__: {
          props: {},
          attrs: {
            type: "textarea"
          },
          userDefineProps: {}
        },
        tagName: "el-input",
        __layout__: "colFormItem",
        id: 1593757826711,
        model: "desc",
        name: "多行本框",
        tagIcon: "textarea",
        controlPanel: "el-input",
        uuid: "el-input-1",
        sortNum: 6
      }
    ],
    formApiValid: []
  }
];
