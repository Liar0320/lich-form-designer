<template>
  <div class="right-board">
    <el-tabs v-model="currentTab" class="center-tabs" @tab-click="changeTab">
      <el-tab-pane label="组件属性" name="field" />
      <el-tab-pane label="表单属性" name="form" />
    </el-tabs>
    <div class="field-box">
      <a class="document-link" target="_blank" :href="documentLink" title="查看组件文档">
        <i class="el-icon-link" />
      </a>
      <el-scrollbar class="right-scrollbar">
        <el-collapse v-model="activeNames">
          <template v-if="currentTab === 'field'">
            <template v-if="activeData">
              <template v-if="activeData.tagName !== 'el-row'">
                <el-collapse-item title="通用属性" name="normal">
                  <common-panel v-model="activeData" />
                </el-collapse-item>
                <el-collapse-item title="组件属性" name="attrs">
                  <component :is="currentComponentName" v-model="activeData.__controlConfig__.attrs" />
                </el-collapse-item>
                <el-collapse-item title="Col Attributes" name="3">
                  <el-col-panel v-model="activeData.__layoutConfig__.props" />
                </el-collapse-item>
                <el-collapse-item title="Form-Item Attributes" name="2">
                  <form-item-panel v-model="activeData.__formItemConfig__.props"></form-item-panel>
                </el-collapse-item>
                <!-- <el-collapse-item title="组件props属性">
                  <elInputPanel v-model="activeData.__controlConfig__.props" v-if="activeData.tagName === 'el-input'" />
                  <elSelectPanel v-model="activeData.__controlConfig__.props" v-if="activeData.tagName === 'LElSelect'" />
                </el-collapse-item> -->
              </template>
              <template v-else>
                <el-collapse-item title="Col Attributes" name="13">
                  <el-col-panel v-model="activeData.__layoutConfig__.props" />
                </el-collapse-item>
                <el-collapse-item title="Row Attributes" name="14">
                  <el-row-panel v-model="activeData.__controlConfig__.props"></el-row-panel>
                </el-collapse-item>
              </template>
            </template>
            <div v-else>
              请选择需要配置的组件
            </div>
          </template>

          <template v-if="currentTab === 'form'">
            <el-collapse-item title="表单属性" name="2">
              <form-panel v-model="formConf" />
              <form-api-valid v-model="formApiValid" />
            </el-collapse-item>
          </template>
        </el-collapse>
        <!-- <template v-if="currentTab === 'field'">
          <form-item-panel v-model="activeData.__formItemConfig__.props"></form-item-panel>
          <form-item-panel v-model="activeData.__layoutConfig__.props"></form-item-panel>
        </template> -->
        <!-- <formPanel v-show="currentTab === 'form'" v-model="formConf" /> -->
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import formPanel from "./formPanel";
import formItemPanel from "./formItemPanel";
import elColPanel from "./elColPanel";
import elRowPanel from "./elRowPanel";
import elInputPanel from "./elInputPanel";
import elSelectPanel from "./elSelectPanel";
import elDatePicker from "./elDatePicker.vue";
import formApiValid from "./formApiValid.vue";
import commonPanel from "./commonPanel";
import TinymcePanel from "./TinymcePanel";
export default {
  props: ["formConf", "activeData", "formApiValid"],
  components: {
    formPanel,
    commonPanel,
    formApiValid,
    formItemPanel,
    elColPanel,
    elRowPanel,
    "c-el-input": elInputPanel,
    "c-LElSelect": elSelectPanel,
    "c-el-date-picker": elDatePicker,
    "c-Tinymce": TinymcePanel
  },
  data() {
    return {
      activeNames: ["2"],
      currentTab: "form"
    };
  },
  mounted() {
    console.log(this.formConf);
  },
  methods: {
    changeTab(tab) {
      if (tab.name === "form") {
        this.activeNames = ["2"];
      } else if (tab.name === "field") {
        this.activeNames = ["normal"];
      } else {
        this.activeNames = ["2"];
      }
    }
  },
  computed: {
    documentLink() {
      return this.activeData?.document || "https://element.eleme.cn/#/zh-CN/component/installation";
    },
    currentComponentName() {
      let name = this.activeData.controlPanel || this.activeData.tagName;

      console.log(name, this.activeData);
      return "c-" + name;
    }
  }
};
</script>

<style lang="scss" scoped>
.right-board {
  width: 350px;
  position: absolute;
  right: 0;
  top: 0;
  padding-top: 3px;
  .field-box {
    position: relative;
    height: calc(100vh - 42px);
    box-sizing: border-box;
    overflow: hidden;
  }
  .el-scrollbar {
    height: 100%;
  }
}
</style>
