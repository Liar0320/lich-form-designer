import { post, get } from "./httpService";
const apiCollection = {};
/**根据api字段名 通过结构获取 数据 */
export const getApiSourceByKey = (apiStringName, params) => {
  let apiFnc = apiCollection[apiStringName];
  if (typeof apiFnc === "undefined") throw new Error(`不存在当前接口:${apiStringName}`);
  return apiFnc(params);
};
/**如果存在已经注册的接口，则直接获取。
 * 如果存在requestType;则发起请求
 */
export const getApiResult = (apiStringName, params, type) => {
  let promiseSource = null;
  if (type === "post") {
    promiseSource = post(apiStringName, params);
  } else if (type === "get") {
    promiseSource = get(apiStringName, params);
  } else {
    promiseSource = getApiSourceByKey(apiStringName, params);
  }
  return promiseSource;
};
/**
 * 注册api接口
 * @param name 当前注册api的名称
 * @param excuteFnc 当前注册api请求的Promise
 * @param isReplace 如果已经存在当前api是否进行替换
 */
export const registerApi = (name, excuteFnc, isReplace) => {
  if (!isReplace && apiCollection[name]) {
    return console.error("已经注册过当前api");
  } else {
    apiCollection[name] = excuteFnc;
  }
};
