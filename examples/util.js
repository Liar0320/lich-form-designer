/*
 * @Author: lich
 * @Date: 2020-07-30 09:53:34
 * @Last Modified by: lich
 * @Last Modified time: 2020-07-30 10:45:26
 * 制作一个localStroage版本更新器
 */

/**
 * @typedef { object } IStroageData
 * @property { string } version
 * @property { array } list
 * @property { data }  data
 * @property { string | number | boolean | any }  raw
 */

class StroageDataControl {
  version = null;
  name = "stroageDataControl";
  /**@type {IStroageData} */
  storage = null;

  constructor() {
    this.getStroage();
  }

  /**创建一个初始化数据 */
  createEmpty({ version, list, data, raw }) {
    return {
      version: version || "1.0.0",
      list: list || [],
      data: data || {},
      raw: raw || null
    };
  }

  /**获取数据 */
  getStroage() {
    this.storage = null;
    try {
      let resultString = localStorage.getItem(this.name);
      this.storage = typeof resultString === "string" ? JSON.parse(resultString) : new Error();
    } catch (error) {
      this.storage = this.createEmpty();
      localStorage.setItem(this.name, JSON.stringify(this.storage));
    }
    return this.storage;
  }

  update() {
    localStorage.setItem("formStruct", JSON.stringify(this.storage));
  }

  updateLocalStorage(oldSource, newSource = this.storage) {
    if (newSource.version !== oldSource.version) {
      let newNameList = newSource.list.map(v => v.name);
      for (let i = 0; i < oldSource.list.length; i++) {
        const item = oldSource.list[i];
        if (newNameList.indexOf(item.name) === -1) {
          newSource.push(item);
        }
      }
    }
  }
}
