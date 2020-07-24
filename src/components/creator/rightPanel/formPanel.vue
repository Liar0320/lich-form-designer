<template>
  <section id="formPanel">
    <el-form :model="formData" label-width="120px" size="small">
      <el-tooltip content="Top center" placement="top">
        <el-form-item label="行内表单模式">
          <el-checkbox v-model="formData.inline"></el-checkbox>
        </el-form-item>
      </el-tooltip>
      <el-tooltip content="表单域标签的位置" placement="top">
        <el-form-item label="labelPosition">
          <el-select v-model="formData['label-position']" placeholder="">
            <el-option key="right" label="right" value="right"> </el-option>
            <el-option key="left" label="left" value="left"> </el-option>
            <el-option key="top" label="top" value="top"> </el-option>
          </el-select>
        </el-form-item>
      </el-tooltip>

      <el-form-item label="表单域标签宽度">
        <el-input v-model="formData['label-width']" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="表单域标签后缀">
        <el-input v-model="formData['label-suffix']" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="不展示必填标志">
        <el-checkbox v-model="formData['hide-required-asterisk']"></el-checkbox>
      </el-form-item>
      <el-tooltip content="是否显示校验错误信息" placement="top">
        <el-form-item label="showMessage">
          <el-checkbox v-model="formData['show-message']"></el-checkbox>
        </el-form-item>
      </el-tooltip>
      <el-tooltip content="是否以行内形式展示校验信息" placement="top">
        <el-form-item label="inlineMessage">
          <el-checkbox v-model="formData['inline-message']"></el-checkbox>
        </el-form-item>
      </el-tooltip>
      <el-form-item label="尺寸">
        <el-select v-model="formData['size']" placeholder="尺寸">
          <el-option key="medium" label="中" value="medium"> </el-option>
          <el-option key="small" label="小" value="small"> </el-option>
          <el-option key="mini" label="特小" value="mini"> </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
// import { debounce } from "throttle-debounce";

export default {
  props: {
    value: Object
  },
  data() {
    return {
      formData: {}
      // updateValue: debounce(340, this.update.bind(this))
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.formData = value;
      }
    },
    formData(value) {
      this.update(value);
    }
  },
  methods: {
    update(value) {
      console.log(value);
      this.$emit("change", value);
    }
  }
};
</script>

<style></style>
