<template>
  <section id="TinymcePanel">
    <el-form :model="formData" label-width="100px" size="small">
      <el-form-item label="菜单栏">
        <el-input type="textarea" v-model="formData['menubar']"></el-input>
      </el-form-item>
      <el-form-item label="高度">
        <el-input v-model="formData['height']"></el-input>
      </el-form-item>
      <el-form-item label="宽度">
        <el-input v-model="formData['width']"></el-input>
      </el-form-item>
      <el-form-item label="语言">
        <!-- <el-input v-model="formData['language']"></el-input> -->
        <el-select v-model="formData['language']">
          <el-option value="en">en</el-option>
          <el-option value="zh_CN">zh_CN</el-option>
          <el-option value="es_MX">es_MX</el-option>
          <el-option value="ja">ja</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工具栏">
        <draggable :list="formData.toolbar" :animation="340" group="selectItem" handle=".option-drag">
          <div v-for="(item, index) in formData.toolbar" :key="index" class="select-item">
            <div class="select-line-icon option-drag">
              <i class="el-icon-s-operation" />
            </div>
            <el-input type="textarea" rows="9" v-model="formData.toolbar[index]" placeholder="工具栏子项" size="small" />
            <div class="close-btn select-line-icon" @click="formData.toolbar.splice(index, 1)">
              <i class="el-icon-remove-outline" />
            </div>
          </div>
        </draggable>
        <div style="margin-left: 20px;">
          <el-button style="padding-bottom: 0" icon="el-icon-circle-plus-outline" type="text" @click="addSelectItem">
            添加选项
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
// import { debounce } from "throttle-debounce";
import draggable from "vuedraggable";
export default {
  props: {
    value: Object
  },
  components: { draggable },
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
    },
    addSelectItem() {
      this.formData["toolbar"].push("");
    }
  }
};
</script>

<style lang="scss" scoped>
.select-item {
  display: flex;
  border: 1px dashed #fff;
  box-sizing: border-box;
  & .close-btn {
    cursor: pointer;
    color: #f56c6c;
  }
  & .el-input + .el-input {
    margin-left: 4px;
  }
}
.select-item + .select-item {
  margin-top: 4px;
}
.select-item.sortable-chosen {
  border: 1px dashed #409eff;
}
// .el-select-dropdown {
//   z-index: 3050 !important;
// }
</style>
