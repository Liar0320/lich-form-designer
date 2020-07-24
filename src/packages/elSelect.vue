<script>
/**下拉组件控件
 *  静态数据渲染
 *  动态数据渲染
 *      实现模板绑定，  todo 不使用watch 使用自定义事件中心触发。来解决组件第一次渲染时，数据改变导致的，
 * change回调
 */
import { mixins } from "./mixin";

export default {
  name: "LElSelect",
  mixins: [mixins],
  render(h) {
    let that = this;
    return h(
      `el-select`,
      {
        props: { value: that.value, ...that.controlConfig.props },
        attrs: { ...that.controlConfig.attrs },
        class: that.controlConfig.class,
        style: that.controlConfig.style,
        on: {
          input(e) {
            that.modelValue = e;
            //   that.$emit("input", e);
          },
          change: that.modelChange
        }
      },
      that.rawOptions.map(item => {
        return <el-option key={item[that.optionValue]} label={item[that.optionLabel]} value={item[that.optionValue]}></el-option>;
      })
    );
  }
};
</script>
