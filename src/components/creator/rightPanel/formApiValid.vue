<template>
  <section id="formItemPanel">
    <p>提交验证接口</p>
    <draggable :list="value" :animation="340" group="selectItem" handle=".option-drag">
      <div v-for="(item, index) in value" :key="item + index" class="select-item">
        <div class="select-line-icon option-drag">
          <i class="el-icon-s-operation" />
        </div>
        <el-input v-model="value[index].name" placeholder="接口名" size="small">
          <template slot="prepend">
            <el-select v-model="value[index].type" style="width: 75px;">
              <el-option key="get" label="get" value="get"> </el-option>
              <el-option key="post" label="post" value="post"> </el-option>
            </el-select>
          </template>
        </el-input>
        <div class="close-btn select-line-icon" @click="value.splice(index, 1)">
          <i class="el-icon-remove-outline" />
        </div>
      </div>
    </draggable>
    <div style="margin-left: 20px;">
      <el-button style="padding-bottom: 0" icon="el-icon-circle-plus-outline" type="text" @click="value.push({ type: 'post' })">
        添加接口
      </el-button>
    </div>
    <!-- </el-form> -->
  </section>
</template>

<script>
// import { debounce } from "throttle-debounce";
import draggable from "vuedraggable";
export default {
  components: { draggable },
  props: ["value"]
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
.select-line-icon {
  line-height: 32px;
  font-size: 22px;
  padding: 0 4px;
  color: #777;
}
</style>
