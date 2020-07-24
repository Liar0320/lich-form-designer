<script>
/*
 * @Author: lich
 * @Date: 2019-09-22 21:52:43
 * @Last Modified by: lich
 * @Last Modified time: 2020-07-07 15:24:42
 */
import { Message } from "element-ui";
import { renderCollection } from "@/lib/render/index";

import { decoratorSubmit } from "./utils";
import * as http from "@/lib/httpService";
export default {
  name: "lichFormParser",
  props: ["formConfig", "formData"],
  data() {
    return {
      isLoading: true,
      formMap: {},
      formConfigCopy: null,
      formApiValid: [],
      submitConfig: {
        before: [],
        after: [],
        apiValid: []
      }
    };
  },
  watch: {
    formData: {
      immediate: true,
      handler(formData) {
        this.formMap = formData;
      }
    },
    formConfig: {
      immediate: true,
      handler(value) {
        if (!value) {
          this.isLoading = true;
        } else {
          this.isLoading = false;
          let copyStruct = JSON.parse(JSON.stringify(value));
          this.formConfigCopy = copyStruct.formConfig;
          this.fieldsCopy = copyStruct.fields;
          this.formApiValid = copyStruct.formApiValid;
        }
      }
    },
    formApiValid: {
      immediate: true,
      handler(value) {
        this.submitConfig.apiValid = [];
        this.submitConfig.apiValid.push.apply(
          this.submitConfig.apiValid,
          value.map(validApi => () => http[validApi.type](validApi.name, this.formMap))
        );
      }
    }
  },
  provide() {
    return {
      /**提供一个提交接口之前的验证api */
      beforeSubmit: this.submitConfig.before,
      /**提供一个提交接口之后的操作api */
      submited: this.submitConfig.after
    };
  },
  methods: {
    submitForm(formName = "validateForm") {
      this.$refs[formName].validate(valid => {
        /**表单规则验证 */
        if (valid) {
          /**提交接口之前的调用 */
          decoratorSubmit(this.submitConfig.before.concat(this.submitConfig.apiValid)).then(apiValid => {
            if (apiValid) {
              console.log(this.formMap);
              this.$emit("onSubmit", this.formMap, resultForm => {
                /**提交接口之后的回调 */
                decoratorSubmit(this.submitConfig.after, resultForm);
              });
            }
          });
        } else {
          Message({
            message: "表单没有填完整",
            type: "error",
            duration: 5 * 1000
          });
          return false;
          // console.log('error submit!!')
          // return false
        }
      });
    },
    resetForm(formName = "validateForm") {
      this.$refs[formName].resetFields();
    }
  },
  /**
   * @param {Vue.CreateElement} createElement
   */
  render(h) {
    let formConfCopy = this.formConfigCopy;

    if (this.isLoading) {
      return <div v-loading="true" style="height:150px"></div>;
    } else {
      if (!formConfCopy["name"]) formConfCopy["name"] = "formName";

      return h(
        "el-form",
        {
          ref: formConfCopy.name,
          props: { model: this.formMap, ...formConfCopy },
          class: "baseForm"
        },
        [
          <el-row>{[renderCollection.call(this, h, this.fieldsCopy)]}</el-row>,
          <el-form-item class="autoFormPack__btnGroup">
            <el-button
              type="primary"
              onClick={() => {
                this.submitForm(formConfCopy["name"]);
              }}
            >
              立即创建
            </el-button>
            <el-button
              onClick={() => {
                this.resetForm(formConfCopy["name"]);
              }}
            >
              重置
            </el-button>
          </el-form-item>
        ]
      );
    }
  }
};

// <el-form-item>
//     <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
//     <el-button @click="resetForm('ruleForm')">重置</el-button>
//   </el-form-item>
</script>
<style lang="scss">
.autoFormPack__btnGroup {
  text-align: center;
  margin-top: 15px;
}
</style>
