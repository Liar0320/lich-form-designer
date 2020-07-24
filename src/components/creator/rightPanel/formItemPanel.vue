<template>
  <section id="formItemPanel">
    <el-form :model="formData" label-width="100px" size="small">
      <el-form-item label="标签文本">
        <el-input v-model="formData['label']" placeholder=""></el-input>
      </el-form-item>
      <el-tooltip content="表单域标签的宽度" placement="top">
        <el-form-item label="标签宽度">
          <el-input v-model="formData['label-width']" placeholder=""></el-input>
        </el-form-item>
      </el-tooltip>
      <el-form-item label="必填">
        <el-checkbox v-model="formData['required']"></el-checkbox>
      </el-form-item>
      <el-form-item label="错误信息">
        <el-input v-model="formData['error']" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="校验错误信息">
        <el-checkbox v-model="formData['show-message']"></el-checkbox>
      </el-form-item>
      <el-tooltip content="是否以行内形式展示校验信息" placement="top">
        <el-form-item label="inlineMessage">
          <el-checkbox v-model="formData['inline-message']"></el-checkbox>
        </el-form-item>
      </el-tooltip>
      <el-form-item label="尺寸">
        <el-select v-model="formData['size']" placeholder="尺寸">
          <el-option key="medium" label="中" value="medium"> </el-option>
          <el-option key="small" label="小" value="small"> </el-option>
          <el-option key="mini" label="大" value="mini"> </el-option>
        </el-select>
      </el-form-item>

      <el-divider>正则校验</el-divider>
      <div v-for="(item, index) in formData.rules" :key="index" class="reg-item">
        <span class="close-btn" @click="formData.rules.splice(index, 1)">
          <i class="el-icon-close" />
        </span>
        <el-form-item label="表达式">
          <el-input v-model="item.pattern" placeholder="请输入正则" />
        </el-form-item>
        <el-form-item label="错误提示" style="margin-bottom:0">
          <el-input v-model="item.message" placeholder="请输入错误提示" />
        </el-form-item>
      </div>
      <div style="margin-left: 20px">
        <el-button icon="el-icon-circle-plus-outline" type="text" @click="formData.rules.push({})">
          添加规则
        </el-button>
      </div>
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
