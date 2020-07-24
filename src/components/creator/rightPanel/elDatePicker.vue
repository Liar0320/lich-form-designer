<template>
  <section id="formPanel">
    <el-form :model="formData" label-width="120px" size="small">
      <el-form-item label="完全只读">
        <el-checkbox v-model="formData['readonly']"></el-checkbox>
      </el-form-item>
      <el-form-item label="禁用">
        <el-checkbox v-model="formData['disabled']"></el-checkbox>
      </el-form-item>
      <el-form-item label="文本框可输入">
        <el-checkbox v-model="formData['editable']"></el-checkbox>
      </el-form-item>
      <el-form-item label="是否显示清除按钮">
        <el-checkbox v-model="formData['clearable']"></el-checkbox>
      </el-form-item>
      <el-form-item label="尺寸">
        <el-select v-model="formData['size']" placeholder="尺寸">
          <el-option key="medium" label="中" value="medium"> </el-option>
          <el-option key="small" label="小" value="small"> </el-option>
          <el-option key="mini" label="特小" value="mini"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="formData['type']" placeholder="类型" @change="changePlaceholder">
          <el-option key="year" label="年" value="year"> </el-option>
          <el-option key="month" label="月" value="month"> </el-option>
          <el-option key="date" label="年月日" value="date"> </el-option>
          <el-option key="dates" label="多个日期" value="dates"> </el-option>
          <el-option key="week" label="星期" value="week"> </el-option>
          <el-option key="datetime" label="年月日时分秒" value="datetime"> </el-option>
          <el-option key="datetimerange" label="年月日时分秒范围" value="datetimerange"> </el-option>
          <el-option key="daterange" label="日期范围" value="daterange"> </el-option>
          <el-option key="monthrange" label="月份范围" value="monthrange"> </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="占位内容" v-show="!isRange">
        <el-input v-model="formData['placeholder']" placeholder="如:选择日期"></el-input>
      </el-form-item>
      <el-form-item label="开始日期占位内容" v-show="isRange">
        <el-input v-model="formData['start-placeholder']" placeholder="如:开始日期"></el-input>
      </el-form-item>
      <el-form-item label="结束日期占位内容" v-show="isRange">
        <el-input v-model="formData['end-placeholder']" placeholder="如:结束日期"></el-input>
      </el-form-item>
      <el-form-item label="显示在输入框中的格式">
        <el-input v-model="formData['format']" placeholder="如:yyyy-MM-dd"></el-input>
      </el-form-item>
      <el-form-item label="绑定值的格式">
        <el-input v-model="formData['value-format']" placeholder="如:yyyy-MM-dd"></el-input>
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
      formData: {
        editable: true,
        clearable: true
      },
      isRange: false
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.formData = value;
      }
    }
  },
  methods: {
    changePlaceholder() {
      if (this.formData.type == "datetimerange" || this.formData.type == "daterange" || this.formData.type == "monthrange") {
        this.isRange = true;
      } else {
        this.isRange = false;
      }

      let format = this.formData.format;
      switch (this.formData.type) {
        case "year":
          format = "yyyy";
          break;
        case "month":
          format = "MM";
          break;
        case "date":
          format = "yyyy-MM-dd";
          break;
        case "dates":
          format = "yyyy-MM-dd";
          break;
        case "daterange":
          format = "yyyy-MM-dd";
          break;
        case "datetime":
          format = "yyyy-MM-dd HH:mm:ss";
          break;
        case "datetimerange":
          format = "yyyy-MM-dd HH:mm:ss";
          break;
        case "monthrange":
          format = "yyyy-MM";
          break;
        default:
          break;
      }

      this.$set(this.formData, "format", format);
      this.$set(this.formData, "value-format", format);
    }
  }
};
</script>

<style></style>
