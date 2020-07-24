// const FINDREG = /{{[^{}]*}}/g;
/**
`{"hsjgdm":"{{HSJG_DM}}","hsjgdmdd":"{{name}}"}`.match(/{{[^{}]*}}/g).map(v=>v.replace(/[{{|}}]/g,''))
 * 模板字符串解析 {"hsjgdm":"{{HSJG_DM}}"},
 * 首先从字符串模板中 截取 需要 监听的对象，
 * 在需要使用字符串时，使用template给字符串赋值
 * 传给后台
 */
const FINDFIELDREG = /{{[^{}]*}}/g;
const FOMMATREFIELDREG = /[{{|}}]/g;
export class HandleTemplate {
  /**原始字符串 */
  oldStr: string;
  /**解析成功后的fileds列表 */
  fields: string[];
  /**解析字符串 */
  str: string;
  // constructor(str) {
  //   this.str = str;
  //   this.fields = [];
  // }
  /**设置需要解析的字符串 */
  setFieldsStr(str = "") {
    this.str = str;
    this.oldStr = str;
    this.fields = [];
  }

  /**该字符串是否包含自定义字段 */
  isTemplateFields() {
    return !!this.fields.length;
  }

  /**通过对象来解析字符串 */
  getTemplate(obj: { [x: string]: any }) {
    this.str = this.oldStr.replace(FINDFIELDREG, function(match) {
      let field = match.replace(FOMMATREFIELDREG, "");
      return obj[field] || "";
    });
  }

  /**获取所有的自定义字段 */
  getWatchField() {
    this.fields = (this.str.match(FINDFIELDREG) || []).map(v => v.replace(FOMMATREFIELDREG, ""));
    return this.fields;
  }

  /**将字符串解析为对象 */
  getObjStr() {
    if (!this.str) return this.str;
    let result = {};
    try {
      result = JSON.parse(this.str);
    } catch (error) {
      console.error(error);
    }
    return result;
  }

  /**启动整个流程 */
  start(str: string, formMap: any) {
    this.setFieldsStr(str);
    this.getTemplate(formMap);
    return this.getObjStr();
  }
}
