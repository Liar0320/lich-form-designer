<template>
  <div>
    <div class="form" v-if="source">
      <h3 class="tc">{{ source.name }}</h3>
      <lichFormParser :formConfig="source.struct" :formData="formData" @onSubmit="onSubmit" />
    </div>
    <div v-else style="text-align:center;margin-top:15vh;">
      <router-link to="creator">
        请先创建表单
      </router-link>
    </div>
  </div>
</template>
<script>
import { lichFormParser } from "lichFormDesigner";
import { selectForm } from "../apis";
export default {
  components: {
    lichFormParser
  },
  data() {
    return {
      name: null,
      formData: {},
      source: null
    };
  },
  watch: {
    "$route.query.name": {
      immediate: true,
      handler(value) {
        if (!value) return;

        this.name = value;
        selectForm(this.name).then(form => {
          this.source = form || {};
        });
      }
    }
  },
  methods: {
    onSubmit(formMap) {
      console.log("submit!", formMap);
      this.$message(`提交的字段 ${JSON.stringify(formMap)}`);
    }
  }
  // render() {
  //   return (
  //     <div class="form">
  //       <h3 class="tc">测试表单</h3>
  //       <parser formConfig={this.formConfig} formData={this.formData} on-onSubmit={this.onSubmit} />
  //     </div>
  //   );
  // }
};
</script>

<style lang="scss" scoped>
.tc {
  text-align: center;
}
$form-bg: #13232f;
.form {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 1em;
}
</style>
