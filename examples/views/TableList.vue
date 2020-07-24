<template>
  <div class="container">
    <div>
      <el-button size="mini" type="primary" @click="insertForm()">新增表单</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" max-height="250">
      <el-table-column prop="name" label="表单名称"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="140">
        <template slot-scope="scope">
          <el-button @click.native.prevent="onViewForm(scope.row)" type="text" size="small">
            查看
          </el-button>
          <el-button @click.native.prevent="onEditForm(scope.row)" type="text" size="small">
            编辑
          </el-button>
          <el-button @click.native.prevent="deleteForm(scope.row)" type="text" size="small">
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { selectForm, deleteForm } from "../apis";
export default {
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    this.selectForm();
  },
  methods: {
    selectForm() {
      selectForm().then(result => {
        this.tableData = result;
      });
    },
    insertForm() {
      this.$router.push({ name: "creator" });
    },
    deleteForm(rows) {
      this.$confirm(`确定要删除<<${rows.name}>>表单?`)
        .then(result => {
          if (result) {
            deleteForm(rows.name).then(res => {
              if (res) {
                this.$message("删除成功");
              }
            });
          }
        })
        .catch(() => {
          this.$message("取消操作");
        });
    },
    onEditForm(rows) {
      this.$router.push({ name: "creator", query: { name: rows.name } });
    },
    onViewForm(rows) {
      this.$router.push({ name: "parser", query: { name: rows.name } });
    }
  }
};
</script>

<style lang="scss" scoped>
.tc {
  text-align: center;
}
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 1em;
  margin-top: 10vh;
}
</style>
