<template>
  <section id="elRowPanel">
    <el-form :model="formData" label-width="100px" size="small">
      <el-form-item label="栅格间隔">
        <el-input-number v-model="formData['gutter']" placeholder="栅格间隔"></el-input-number>
      </el-form-item>
      <el-tooltip content="布局模式，可选 flex，现代浏览器下有效" placement="top">
        <el-form-item label="布局模式">
          <el-input v-model="formData['type']" placeholder=""></el-input>
        </el-form-item>
      </el-tooltip>
      <el-tooltip content="flex 布局下的水平排列方式" placement="top">
        <el-form-item label="justify">
          <el-select v-model="formData['justify']" placeholder="flex 布局下的水平排列方式">
            <el-option key="start" label="start" value="start"> </el-option>
            <el-option key="end" label="end" value="end"> </el-option>
            <el-option key="center" label="center" value="center"> </el-option>
            <el-option key="space-around" label="space-around" value="space-around"> </el-option>
            <el-option key="space-between" label="space-between" value="space-between"> </el-option>
          </el-select>
        </el-form-item>
      </el-tooltip>
      <el-tooltip content="flex 布局下的垂直排列方式" placement="top">
        <el-form-item label="align">
          <el-select v-model="formData['align']" placeholder="flex 布局下的垂直排列方式">
            <el-option key="top" label="top" value="top"> </el-option>
            <el-option key="middle" label="middle" value="middle"> </el-option>
            <el-option key="bottom" label="bottom" value="bottom"> </el-option>
          </el-select>
        </el-form-item>
      </el-tooltip>
      <el-form-item label="tag">
        <el-input v-model="formData['tag']" placeholder=""></el-input>
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
