<template>
  <section id="elInputPanel">
    <el-form :model="formData" label-width="100px" size="small">
      <el-form-item label="类型">
        <el-input v-model="formData['type']" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="最大输入长度">
        <el-input-number v-model="formData['maxlength']" placeholder=""></el-input-number>
      </el-form-item>
      <el-form-item label="最小输入长度">
        <el-input-number v-model="formData['minlength']" placeholder=""></el-input-number>
      </el-form-item>
      <el-tooltip content="是否显示输入字数统计，只在 type = 'text' 或 type = 'textarea' 时有效" placement="top">
        <el-form-item label="计数">
          <el-checkbox v-model="formData['show-word-limit']"></el-checkbox>
          <!-- <el-input v-model="formData['show-word-limit']" placeholder=""></el-input> -->
        </el-form-item>
      </el-tooltip>
      <el-form-item label="占位文本">
        <el-input v-model="formData['placeholder']" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="禁用">
        <el-checkbox v-model="formData['disabled']"></el-checkbox>
      </el-form-item>
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
