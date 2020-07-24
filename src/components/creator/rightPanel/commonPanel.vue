<template>
  <div>
    <template>
      <el-divider>通用</el-divider>
      <div>
        <el-form :model="formData" label-width="100px" size="small">
          <el-form-item label="是否展示">
            <el-checkbox v-model="formData['isRender']"></el-checkbox>
          </el-form-item>
          <el-form-item label="控件类型">
            <el-select v-model="formData['uuid']" placeholder="" @change="controlChange" :filterable="true">
              <el-option v-for="item in controlList" :key="item.uuid" :label="item.name" :value="item.uuid"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="formData['__formItemConfig__']['props']['label']" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="表单栅格">
            <el-slider v-model="formData['__layoutConfig__']['props']['span']" :max="24" :min="1" :marks="{ 12: '' }" />
          </el-form-item>
          <el-form-item label="model值" v-if="isModel">
            <el-input v-model="formData['model']" placeholder="" @change="modelChange"></el-input>
          </el-form-item>
          <el-form-item label="必填" v-if="isModel">
            <el-checkbox v-model="formData['__formItemConfig__']['props']['required']" :key="JSON.stringify(formData)"></el-checkbox>
          </el-form-item>

          <el-tooltip content="model123 = true" placement="top" v-if="isModel">
            <el-form-item
              label="必填表达式"
              prop="__controlConfig__.userDefineProps.requiredExpression"
              :rules="{ pattern: /^\w+\s+[>|<|=]=?\s+\w+$/, message: '表达式输入错误，例 [a] == [b]' }"
              v-if="[53].indexOf(formData.control) === -1 && !formData['__formItemConfig__']['props']['required']"
            >
              <el-input v-model="formData['__controlConfig__']['userDefineProps']['requiredExpression']"></el-input>
            </el-form-item>
          </el-tooltip>

          <el-form-item label="默认值">
            <el-input :value="setDefaultValue(formData['defaultValue'])" placeholder="请输入默认值" @input="onDefaultValueInput" />
          </el-form-item>

          <el-tooltip content="表单域标签的宽度" placement="top">
            <el-form-item label="标签宽度">
              <el-input v-model="formData['__formItemConfig__']['props']['label-width']" placeholder=""></el-input>
            </el-form-item>
          </el-tooltip>
          <el-tooltip content="width:100%" placement="top">
            <el-form-item label="行样式">
              <el-input v-model="formData['__controlConfig__']['style']" placeholder=""></el-input>
            </el-form-item>
          </el-tooltip>
          <el-tooltip content="classNameA" placement="top">
            <el-form-item label="样式类">
              <el-input v-model="formData['__controlConfig__']['class']" placeholder=""></el-input>
            </el-form-item>
          </el-tooltip>
          <!-- 
          <template v-if="[53].indexOf(formData.controlPanel) > -1">
            <el-divider>消息文本</el-divider>
            <draggable :list="formData.tipMsg" :animation="340" group="selectItem" handle=".option-drag">
              <div v-for="(item, index) in formData.tipMsg" :key="index" class="select-item">
                <div class="select-line-icon option-drag">
                  <i class="el-icon-s-operation" />
                </div>
                <el-input v-model="formData.tipMsg[index]" placeholder="" size="small" />
                <div class="close-btn select-line-icon" @click="formData.tipMsg.splice(index, 1)">
                  <i class="el-icon-remove-outline" />
                </div>
              </div>
            </draggable>
            <div style="margin-left: 20px;">
              <el-button style="padding-bottom: 0" icon="el-icon-circle-plus-outline" type="text" @click="formData.tipMsg.push('')">
                添加一行
              </el-button>
            </div>
          </template> -->

          <el-form-item label="textModel值" v-if="['LTextView'].indexOf(formData.tagName) > -1">
            <el-input v-model="formData['__controlConfig__']['userDefineProps']['textModel']" placeholder="定义的获取字段的来源"></el-input>
          </el-form-item>

          <template v-if="['LElSelect'].indexOf(formData.controlPanel) > -1">
            <el-form-item label="是否可搜索">
              <el-checkbox v-model="formData['__controlConfig__']['attrs']['filterable']"></el-checkbox>
            </el-form-item>
            <el-form-item label="是否可清除">
              <el-checkbox v-model="formData['__controlConfig__']['attrs']['clearable']"></el-checkbox>
            </el-form-item>
          </template>

          <template v-if="['LElCheckboxGroup', 'LElRadioGroup'].indexOf(formData.tagName) > -1">
            <el-form-item label="按钮样式">
              <el-checkbox v-model="formData['__controlConfig__']['userDefineProps']['isBtn']"></el-checkbox>
            </el-form-item>
            <el-form-item label="带有边框">
              <el-checkbox v-model="formData['__controlConfig__']['userDefineProps']['isBorder']"></el-checkbox>
            </el-form-item>
          </template>

          <template v-if="['LElSelect', 'el-checkbox-group'].indexOf(formData.controlPanel) > -1">
            <el-divider>选项</el-divider>
            <el-form-item label="数据类型">
              <el-radio-group v-model="formData['__controlConfig__']['userDefineProps']['optionType']" size="small">
                <el-radio-button label="dynamic">
                  动态数据
                </el-radio-button>
                <el-radio-button label="static">
                  静态数据
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
            <template v-if="formData['__controlConfig__']['userDefineProps']['optionType'] === 'dynamic'">
              <div>
                <el-form-item label="后台接口地址">
                  <el-input v-model="formData['__controlConfig__']['userDefineProps'].apiStringName" placeholder="后台接口名">
                    <template slot="prepend">
                      <el-select v-model="formData['__controlConfig__']['userDefineProps'].apiRequestType" style="width: 75px;">
                        <el-option key="get" label="get" value="get"> </el-option>
                        <el-option key="post" label="post" value="post"> </el-option>
                      </el-select>
                    </template>
                  </el-input>
                  <!-- <el-input :value="formData.apiNameString" @input="updateField('apiNameString', $event)" placeholder="后台接口名" /> -->
                </el-form-item>
                <el-form-item label="key名称">
                  <el-input v-model="formData['__controlConfig__']['userDefineProps'].optionValue" placeholder="后台接口名" />
                </el-form-item>
                <el-form-item label="value名称">
                  <el-input v-model="formData['__controlConfig__']['userDefineProps'].optionLabel" placeholder="后台接口名" />
                </el-form-item>
                <el-tooltip content='json字符串类似:{"MMSI":"mmsi","SHIP_FIRSTREG_NO":"shipFirstregNo"}' placement="top">
                  <el-form-item label="后台接口参数">
                    <el-input v-model="formData['__controlConfig__']['userDefineProps'].apiStringParams" placeholder="后台接口名" />
                  </el-form-item>
                </el-tooltip>
                <el-tooltip content='{"MMSI":"mmsi","SHIP_FIRSTREG_NO":"shipFirstregNo"}' placement="top">
                  <el-form-item label="填充字段名">
                    <el-input v-model="formData['__controlConfig__']['userDefineProps'].fillFields" placeholder="返回填充字段名" />
                  </el-form-item>
                </el-tooltip>
              </div>
            </template>
            <template v-if="formData['__controlConfig__']['userDefineProps']['optionType'] === 'static'">
              <draggable :list="formData['__controlConfig__']['userDefineProps'].optionCollection" :animation="340" group="selectItem" handle=".option-drag">
                <div v-for="(item, index) in formData['__controlConfig__']['userDefineProps'].optionCollection" :key="item.value + index" class="select-item">
                  <div class="select-line-icon option-drag">
                    <i class="el-icon-s-operation" />
                  </div>
                  <el-input v-model="item.label" placeholder="选项名" size="small" />
                  <el-input placeholder="选项值" size="small" v-model="item.value" />
                  <!-- <el-input placeholder="选项值" size="small" :value="item.value" @input="setOptionValue(item, $event)" /> -->
                  <div class="close-btn select-line-icon" @click="formData['__controlConfig__']['userDefineProps'].optionCollection.splice(index, 1)">
                    <i class="el-icon-remove-outline" />
                  </div>
                </div>
              </draggable>
              <div style="margin-left: 20px;">
                <el-button style="padding-bottom: 0" icon="el-icon-circle-plus-outline" type="text" @click="addSelectItem">
                  添加选项
                </el-button>
              </div>
            </template>
          </template>
        </el-form>
      </div>
    </template>
  </div>
</template>
<script>
function isNumberStr(str) {
  return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str);
}
// import { debounce } from "throttle-debounce";
import draggable from "vuedraggable";
import defaultElement from "@/lib/defaultElement";
import { FormElemntConfig } from "@/lib/define";

export default {
  components: {
    draggable
  },
  props: {
    value: Object
  },
  computed: {
    isModel() {
      return this.formData.isAnalysis === undefined || this.formData.isAnalysis === true;
    }
  },
  data() {
    return {
      formData: {},
      // controlId: null,
      controlList: defaultElement.collection
      // updateValue: debounce(340, this.update.bind(this))
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.formData = value;
        // if (!value["formControlProps"]) {
        //   value["formControlProps"] = { label: this.formData["label"] || "" };
        // }
      }
    }
    // formData(value) {
    //   this.update(value);
    // }
  },
  methods: {
    addSelectItem() {
      this.formData["__controlConfig__"]["userDefineProps"].optionCollection.push({
        label: "",
        value: ""
      });
    },
    setOptionValue(item, val) {
      item.value = isNumberStr(val) ? +val : val;
    },
    modelChange() {
      this.formData["__formItemConfig__"]["prop"] = this.formData["model"];
    },
    onDefaultValueInput(str) {
      if (this.formData.defaultValue instanceof Array) {
        // 数组
        this.$set(
          this.formData,
          "defaultValue",
          str.split(",").map(val => (isNumberStr(val) ? +val : val))
        );
      } else if (["true", "false"].indexOf(str) > -1) {
        // 布尔
        this.$set(this.formData, "defaultValue", JSON.parse(str));
      } else {
        // 字符串和数字
        this.$set(this.formData, "defaultValue", isNumberStr(str) ? +str : str);
      }
    },
    setDefaultValue(val) {
      if (Array.isArray(val)) {
        return val.join(",");
      }
      // if (['string', 'number'].indexOf(typeof val) > -1) {
      //   return val
      // }
      if (typeof val === "boolean") {
        return `${val}`;
      }
      return val;
    },
    updateField(field, $event) {
      this.$set(this.formData, field, $event);
    },
    controlChange() {
      let newFieldControl = new FormElemntConfig(this.formData["control"], this.formData);
      let formData = Object.assign({}, this.formData, newFieldControl);
      this.rightPanelChange({ activeData: formData });
    },
    showFieldJSON(value) {
      return typeof value === "string" ? value : JSON.stringify(value);
    },
    updateFieldJSON(field, $event) {
      let result = null;
      try {
        result = JSON.parse($event);
      } catch (error) {
        result = $event;
      }
      this.$set(this.formData, field, result);
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
