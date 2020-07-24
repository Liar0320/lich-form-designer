<template>
  <div>
    <lichFormCreator :default-source="source" @change="change" />
  </div>
</template>
<script>
import { lichFormCreator } from "lichFormDesigner";
import { getTemplateJson, selectForm, insertOrUpdateForm } from "../apis";
export default {
  components: {
    lichFormCreator
  },
  data() {
    return {
      source: null,
      name: null
    };
  },
  watch: {
    "$route.query.name": {
      immediate: true,
      handler(value) {
        if (!value) return;

        this.name = value;
        selectForm(this.name).then(form => {
          this.source = form.struct || {};
        });
      }
    }
  },
  mounted() {
    console.log(this.$route.query);
    if (this.name === null) {
      getTemplateJson(true).then(list => {
        this.source = list[1];
      });
    }
  },
  methods: {
    change(form) {
      console.log(form);
      this.$prompt("请输入表单名称", {
        inputValue: this.name,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose(action, instance, done) {
          if (!instance.inputValue) {
            this.$message("请输入名单名称");
          } else {
            done();
          }
          // console.log(action, , done);
        }
      })
        .then(({ value }) => {
          insertOrUpdateForm({ name: value, struct: form });

          this.$message({
            type: "success",
            message: "保存表单成功: " + value
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    }
  }
};
</script>
