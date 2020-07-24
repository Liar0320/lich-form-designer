const httpService = {
  get(url, params) {
    if (params) {
      let paramsArray = [];
      //拼接参数
      Object.keys(params).forEach(key => paramsArray.push(key + "=" + params[key]));
      if (url.search(/\?/) === -1) {
        url += "?" + paramsArray.join("&");
      } else {
        url += "&" + paramsArray.join("&");
      }
    }
    return fetch(url).then(v => v.json());
  },
  post(url, params) {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(params),
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      mode: "no-cors"
    }).then(v => v.json());
  }
};
export const get = httpService.get;
export const post = httpService.post;
// 请求服务注册
export const registerHttpService = ({ get, post }) => {
  if (get) httpService.get = get;
  if (post) httpService.post = post;
};
