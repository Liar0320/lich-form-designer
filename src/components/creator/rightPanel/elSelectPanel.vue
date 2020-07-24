<template>
  <section id="elSelectPanel">
    <el-form :model="formData" label-width="100px" size="small">
      <el-form-item label="占位文本">
        <el-input v-model="formData['placeholder']" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="尺寸">
        <el-select v-model="formData['size']" placeholder="尺寸" :clearable="true">
          <el-option key="medium" label="中" value="medium"> </el-option>
          <el-option key="small" label="小" value="small"> </el-option>
          <el-option key="mini" label="特小" value="mini"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否可清空">
        <el-checkbox v-model="formData['clearable']"></el-checkbox>
      </el-form-item>
      <el-form-item label="是否可搜索">
        <el-checkbox v-model="formData['filterable']"></el-checkbox>
      </el-form-item>
      <el-tooltip content="是否允许用户创建新条目，需配合 filterable 使用" placement="top">
        <el-form-item label="allow-create">
          <el-checkbox v-model="formData['allow-create']"></el-checkbox>
        </el-form-item>
      </el-tooltip>
      <el-tooltip content="多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词" placement="top">
        <el-form-item label="reserve-keyword">
          <el-checkbox v-model="formData['reserve-keyword']"></el-checkbox>
        </el-form-item>
      </el-tooltip>
      <el-tooltip content="在输入框按下回车，选择第一个匹配项。需配合 filterable 或 remote 使用" placement="top">
        <el-form-item label="default-first-option">
          <el-checkbox v-model="formData['default-first-option']"></el-checkbox>
        </el-form-item>
      </el-tooltip>
      <el-tooltip content="是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false" placement="top">
        <el-form-item label="body">
          <el-checkbox v-model="formData['popper-append-to-body']"></el-checkbox>
        </el-form-item>
      </el-tooltip>
      <el-tooltip content="对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单" placement="top">
        <el-form-item label="automatic-dropdown">
          <el-checkbox v-model="formData['automatic-dropdown']"></el-checkbox>
        </el-form-item>
      </el-tooltip>
      <el-form-item label="禁用">
        <el-checkbox v-model="formData['disabled']"></el-checkbox>
      </el-form-item>
      <el-tooltip content="多选时是否将选中值按文字的形式展示" placement="top">
        <el-form-item label="collapseTags">
          <el-checkbox v-model="formData['collapse-tags']"></el-checkbox>
        </el-form-item>
      </el-tooltip>
      <el-tooltip content="搜索条件无匹配时显示的文字，也可以使用slot='empty'设置" placement="top">
        <el-form-item label="nomatchtext">
          <el-input v-model="formData['no-match-text']" placeholder=""></el-input>
        </el-form-item>
      </el-tooltip>
      <el-tooltip content="选项为空时显示的文字，也可以使用slot='empty'设置" placement="top">
        <el-form-item label="nodatatext">
          <el-input v-model="formData['no-data-text']" placeholder=""></el-input>
        </el-form-item>
      </el-tooltip>
      <el-tooltip content="Select 下拉框的类名" placement="top">
        <el-form-item label="popperClass">
          <el-input v-model="formData['popper-class']" placeholder=""></el-input>
        </el-form-item>
      </el-tooltip>
      <el-form-item label="多选">
        <el-checkbox v-model="formData['multiple']"></el-checkbox>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
export default {
  props: {
    value: Object
  },
  data() {
    return {
      formData: {}
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.formData = value;
      }
    }
  }
};
</script>

<style></style>
