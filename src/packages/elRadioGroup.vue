<script>
/**单选框组件
 *  静态数据渲染
 *  动态数据渲染
 *      实现模板绑定，  todo 不使用watch 使用自定义事件中心触发。来解决组件第一次渲染时，数据改变导致的，
 * change回调
 */
import { mixins } from "./mixin";

export default {
  name: "LElRadioGroup",
  mixins: [mixins],
  render(h) {
    let that = this;
    let value = that.value;
    let userDefine = that.controlConfig.userDefineProps;
    return h(
      `el-radio-group`,
      {
        props: { ...that.controlConfig.props, value: value },
        attrs: { ...that.controlConfig.attrs },
        class: that.controlConfig.class,
        style: that.controlConfig.style,
        on: {
          input(e) {
            that.modelValue = e;
          },
          change: that.modelChange
        }
      },
      that.rawOptions.map(item => {
        return userDefine.isBtn ? (
          <el-radio-button key={item[that.optionValue]} label={item[that.optionValue]}>
            {item[that.optionLabel]}
          </el-radio-button>
        ) : (
          <el-radio key={item[that.optionValue]} label={item[that.optionValue]} border={userDefine.isBorder}>
            {item[that.optionLabel]}
          </el-radio>
        );
      })
    );
  }
};
</script>
