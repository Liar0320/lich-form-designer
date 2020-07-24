import { HandleTemplate } from "@/lib/utils";
import { getApiResult } from "@/lib/apiCollection";
import { debounce } from "throttle-debounce";

export const mixins = {
  props: ["value", "formMap", "userDefine", "controlConfig"],
  data() {
    let handleTemplate = new HandleTemplate();
    return {
      modelValue: "",
      optionLabel: "label",
      optionValue: "value",
      rawOptions: [],
      watcherCollections: [],
      handlerFields: handleTemplate
    };
  },
  watch: {
    userDefine: {
      immediate: true,
      handler() {
        this.debounceHandle();
      }
    },
    value: {
      immediate: true,
      handler() {
        this.modelValue = this.value;
      }
    }
  },
  mounted() {
    this.debounceHandle = debounce(350, this.debounceHandle);
  },
  methods: {
    setOptions() {
      let userDefine = this.userDefine;
      /**默认给绑定的options */
      let optionsResult = [];
      /**如果存在optionType */
      if (userDefine.optionType === "static") {
        optionsResult = userDefine.optionCollection || [];
      } else if (userDefine.optionType === "dynamic") {
        if (!userDefine.apiStringName) throw new Error("异步数据，缺少绑定的请求接口");

        let params = this.handlerFields.start(userDefine.apiStringParams, this.formMap);
        let optPromise = getApiResult(userDefine.apiStringName, params, userDefine.apiRequestType);
        if (optPromise) {
          optPromise.then(v => {
            this.rawOptions = v;
            this.rawOptions.map(v => (v[this.optionValue] = String(v[this.optionValue])));
            if (!this.rawOptions.find(v => v[this.optionValue] === this.modelValue)) {
              this.modelValue = "";
              this.modelChange();
            }
          });
        }
      }
      this.rawOptions = optionsResult;
    },
    modelChange() {
      this.$emit("input", this.modelValue);
      let fillFields = this.userDefine.fillFields;
      if (typeof fillFields === "string") {
        try {
          fillFields = JSON.parse(fillFields);
        } catch (error) {
          fillFields = null;
          return;
        }
      }
      if (fillFields instanceof Array && fillFields.length) {
        let row = this.rawOptions.find(v => v[this.optionValue] === this.modelValue) || {};
        fillFields.forEach(v => {
          this.$set(this.formMap, v, row[v] || "");
        });
      } else if (fillFields instanceof Object && Object.keys(fillFields).length) {
        let row = this.rawOptions.find(v => v[this.optionValue] === this.modelValue) || {};
        Object.entries(fillFields).forEach(([key, value]) => {
          this.$set(this.formMap, key, row[value] || "");
        });
      }
    },
    /**监听需要改变的字段 */
    listenerFields(fields) {
      if (fields instanceof Array && fields.length) {
        this.watcherCollections = fields.map(field => {
          return this.$watch(
            () => this.formMap[field],
            () => {
              this.setOptions();
            }
          );
        });
      }
    },
    /**当结构发现改变需要重新渲染和加载options */
    debounceHandle() {
      if (this.userDefine) {
        this.handlerFields.setFieldsStr(this.userDefine.apiParamsString);
        while (this.watcherCollections.length) {
          this.watcherCollections.pop()();
        }
        this.listenerFields(this.handlerFields.getWatchField());
        this.setOptions();

        this.optionLabel = this.userDefine.optionLabel || this.optionLabel;
        this.optionValue = this.userDefine.optionValue || this.optionValue;
      }
    }
  },
  destroyed() {
    while (this.watcherCollections.length) {
      this.watcherCollections.pop()();
    }
  }
};
