<template>
  <div class="container">
    <div class="left-board">
      <div class="logo-wrapper">
        <div class="logo">
          <!-- <img :src="logo" alt="logo" />  -->
          Form Generator
          <a class="github" href="https://github.com/Liar0320/lich-form-designer" target="_blank">
            <img src="https://github.githubassets.com/pinned-octocat.svg" alt />
          </a>
        </div>
      </div>
      <el-scrollbar>
        <div class="components-list">
          <div v-for="(item, listIndex) in leftComponents" :key="listIndex">
            <div class="components-title">
              <svg-icon icon-class="component"></svg-icon>
              {{ item.title }}
            </div>
            <draggable
              class="components-draggable"
              :list="item.list"
              :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
              :clone="cloneComponent"
              draggable=".components-item"
              :sort="false"
              @end="onEnd"
            >
              <div v-for="(element, index) in item.list" :key="index" class="components-item">
                <div class="components-body">
                  <svg-icon :icon-class="element.tagIcon" />
                  {{ element.name }}
                </div>
              </div>
            </draggable>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="center-board">
      <div class="action-bar">
        <el-button icon="el-icon-video-play" type="text" @click="save" v-if="defaultSource">
          保存
        </el-button>
        <el-button icon="el-icon-video-play" type="text" @click="run">
          运行
        </el-button>
        <el-button icon="el-icon-view" type="text" @click="showJson">
          查看json
        </el-button>
        <el-button icon="el-icon-download" type="text" click="download">
          导出vue文件
        </el-button>
        <el-button class="copy-btn-main" icon="el-icon-document-copy" type="text" click="copy">
          复制代码
        </el-button>
        <el-button class="delete-btn" icon="el-icon-delete" type="text" @click="empty">
          清空
        </el-button>
      </div>
      <el-scrollbar class="center-scrollbar">
        <el-row class="center-board-row" :gutter="15">
          <el-form
            :ref="formConf['ref']"
            :label-width="formConf['label-width']"
            :inline="formConf[' inline']"
            :label-position="formConf['label-position']"
            :label-suffix="formConf['label-suffix']"
            :hide-required-asterisk="formConf['hide-required-asterisk']"
            :show-message="formConf['show-message']"
            :status-icon="formConf['status-icon']"
            :size="formConf['size']"
            :disabled="formConf['disabled']"
            :model="formData"
          >
            <draggable class="drawing-board" :list="drawingList" :animation="340" group="componentsGroup">
              <draggable-item
                v-for="(element, index) in drawingList"
                :element="element"
                :key="element.id"
                :drawing-list="drawingList"
                :index="index"
                :formData="formData"
                :activeId="activeId"
                @activeItem="activeFormItem"
                @copyItem="drawingItemCopy"
                @deleteItem="drawingItemDelete"
              />

              <!-- <draggable-item
                v-for="(element, index) in drawingList"
                :key="element.renderKey"
                :drawing-list="drawingList"
                :element="element"
                :index="index"
                :active-id="activeId"
                :form-conf="formConf"
                @activeItem="activeFormItem"
                @copyItem="drawingItemCopy"
                @deleteItem="drawingItemDelete"
              />
               -->
            </draggable>

            <div v-show="!drawingList.length" class="empty-info">
              从左侧拖入或点选组件进行表单设计
            </div>
          </el-form>
        </el-row>
      </el-scrollbar>
    </div>

    <right-panel :active-data="activeData" :form-conf="formConf" :formApiValid="formApiValid" />

    <json-drawer size="60%" :visible.sync="jsonDrawerVisible" :json-str="JSON.stringify(prevJson)" @refresh="refreshJson" :append-to-body="true" />

    <el-dialog title="表单预览" :visible.sync="showPrevModal" width="70%" @close="showPrevModal = false">
      <parser
        v-if="showPrevModal"
        :form-config="
          JSON.parse(
            JSON.stringify({
              formConfig: formConf,
              fields: drawingList,
              formApiValid: formApiValid,
            })
          )
        "
        :form-data="{}"
      />
      <!-- <span slot="footer">
        <el-button @click="showPrevModal = false">取 消</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { basicComponent, formComponent, defineComponent, defaultList } from "./config";
import draggableItem from "./DraggableItem";
import { FormElemntConfig } from "../../lib/define";
// import JsonDrawer from "./JsonDrawer";
import JsonDrawer from "../JsonDrawer/JsonDrawer";

import rightPanel from "./rightPanel";

import parser from "../parser";

const copy = (e) => JSON.parse(JSON.stringify(e));

import svgIcon from "@/components/svgIcon/svgIcon"; // svg component

export default {
  name: "lichFormCreator",
  props: ["defaultSource"],
  components: {
    draggable,
    draggableItem,
    JsonDrawer,
    rightPanel,
    parser,
    svgIcon,
  },
  computed: {
    activeId() {
      return this.activeData?.id || null;
    },
  },
  mounted() {
    console.log("creator");
    //      this.drawingItemCopy(this.drawingList[0], this.drawingList);
  },
  data() {
    return {
      activeData: null,
      formConf: {
        "label-width": "80px",
      },
      formApiValid: [],
      formData: {},
      prevJson: null,
      drawingList: this.defaultSource || JSON.parse(JSON.stringify(defaultList)),
      leftComponents: [
        {
          title: "基础型组件",
          list: basicComponent,
        },
        {
          title: "表单组件",
          list: formComponent,
        },
        {
          title: "自定义组件",
          list: defineComponent,
        },
      ],
      jsonDrawerVisible: false,
      showPrevModal: false,
    };
  },
  provide: {
    updateData() {
      return this.updateAcitveData;
    },
  },
  watch: {
    defaultSource(value = {}) {
      this.formConf = value.formConfig || {};
      this.drawingList = value.fields || [];
      this.formApiValid = value.formApiValid || [];
    },
  },
  methods: {
    cloneComponent(origin) {
      return FormElemntConfig.clone(origin);
    },
    onEnd(obj) {
      if (obj.from !== obj.to) {
        // this.activeData = tempActiveData;
        // this.activeId = this.idGlobal;
        console.log("end", obj);
      }
    },
    activeFormItem(element) {
      this.activeData = element;
    },
    empty() {
      this.$confirm("确定要清空所有组件吗？", "提示", { type: "warning" }).then(() => {
        this.drawingList = [];
      });
    },
    drawingItemCopy(item, parent) {
      let clone = FormElemntConfig.clone(item);
      // console.log(clone, parent);
      // clone = this.createIdAndKey(clone);
      parent.push(clone);
      this.activeFormItem(clone);
    },
    drawingItemDelete(index, parent) {
      parent.splice(index, 1);
      this.$nextTick(() => {
        const len = this.drawingList.length;
        if (len) {
          this.activeFormItem(this.drawingList[len - 1]);
        }
      });
    },
    refreshJson(value) {
      console.log(value);
      this.prevJson = value;
      this.formConf = value.formConfig;
      this.drawingList = value.fields;
      this.formApiValid = value.formApiValid;
    },
    showJson() {
      this.prevJson = this.getResult();
      this.jsonDrawerVisible = true;
    },
    getResult() {
      this.drawingList.forEach((v, index) => (v.sortNum = index));
      let result = copy({
        formConfig: this.formConf,
        fields: this.drawingList,
        formApiValid: this.formApiValid,
        // btnControl: this.btnControl
      });
      // if (!result.btnControl) delete result.btnControl;
      return result;
    },
    run() {
      this.showPrevModal = true;
    },
    updateAcitveData(key, value) {
      this.$set(this.activeData, key, value);
    },
    save() {
      this.$emit("change", this.getResult());
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/home";
</style>
