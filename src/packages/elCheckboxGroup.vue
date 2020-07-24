<script>
/**多选框组件
 *  静态数据渲染
 *  动态数据渲染
 *      实现模板绑定，  todo 不使用watch 使用自定义事件中心触发。来解决组件第一次渲染时，数据改变导致的，
 * change回调
 */
import { mixins } from "./mixin";

export default {
  name: "LElCheckboxGroup",
  mixins: [mixins],
  methods: {
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
        let modelList = this.modelValue ? this.modelValue.split(",") : [];
        let row = this.rawOptions.filter(v => modelList.includes(v[this.optionValue])) || [];
        fillFields.forEach(v => {
          let result = row.map(item => item[v]).join(",");
          this.$set(this.formMap, v, result || "");
        });
      } else if (fillFields instanceof Object && Object.keys(fillFields).length) {
        // let row = this.rawOptions.find(v => v[this.optionValue] === this.modelValue) || {};
        let modelList = this.modelValue ? this.modelValue.split(",") : [];
        let row = this.rawOptions.filter(v => modelList.includes(v[this.optionValue])) || [];
        Object.entries(fillFields).forEach(([key, value]) => {
          let result = row.map(item => item[value]).join(",");
          this.$set(this.formMap, key, result || "");
        });
      }
    }
  },
  render(h) {
    let that = this;
    let value = that.value ? that.value.split(",") : [];
    let userDefine = that.controlConfig.userDefineProps;
    // let name = "checkbox-" + Math.floor(Math.random() * 1000);
    return h(
      `el-checkbox-group`,
      {
        props: { ...that.controlConfig.props, value: value },
        attrs: { ...that.controlConfig.attrs },
        class: that.controlConfig.class,
        style: that.controlConfig.style,
        on: {
          input(e) {
            that.modelValue = e ? e.join(",") : "";
          },
          change: that.modelChange
        }
      },
      that.rawOptions.map(item => {
        return userDefine.isBtn ? (
          <el-checkbox-button key={item[that.optionValue]} label={item[that.optionValue]}>
            {item[that.optionLabel]}
          </el-checkbox-button>
        ) : (
          <el-checkbox key={item[that.optionValue]} label={item[that.optionValue]} border={userDefine.isBorder}>
            {item[that.optionLabel]}
          </el-checkbox>
        );
      })
    );
  }
};
</script>
