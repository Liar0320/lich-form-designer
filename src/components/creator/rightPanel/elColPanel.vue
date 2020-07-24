<template>
  <section id="elColPanel">
    <el-form :model="formData" label-width="100px" size="small">
      <el-form-item label="栅格占据列数">
        <el-input-number v-model="formData['span']" placeholder=""></el-input-number>
      </el-form-item>
      <el-tooltip content="栅格左侧的间隔格数" placement="top">
        <el-form-item label="offset">
          <el-input-number v-model="formData['offset']" placeholder=""></el-input-number>
        </el-form-item>
      </el-tooltip>
      <el-tooltip content="栅格向右移动格数" placement="top">
        <el-form-item label="push">
          <el-input-number v-model="formData['push']" placeholder=""></el-input-number>
        </el-form-item>
      </el-tooltip>
      <el-tooltip content="栅格向左移动格数" placement="top">
        <el-form-item label="pull">
          <el-input-number v-model="formData['pull']" placeholder=""></el-input-number>
        </el-form-item>
      </el-tooltip>
      <el-form-item label="xs">
        <el-input-number v-model="formData['xs']" placeholder=""></el-input-number>
      </el-form-item>
      <el-form-item label="sm">
        <el-input-number v-model="formData['sm']" placeholder=""></el-input-number>
      </el-form-item>
      <el-form-item label="md">
        <el-input-number v-model="formData['md']" placeholder=""></el-input-number>
      </el-form-item>
      <el-form-item label="lg">
        <el-input-number v-model="formData['lg']" placeholder=""></el-input-number>
      </el-form-item>
      <el-form-item label="xl">
        <el-input-number v-model="formData['xl']" placeholder=""></el-input-number>
      </el-form-item>
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
