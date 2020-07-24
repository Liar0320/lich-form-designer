const httpService = {
  get(url: string, params: { [x: string]: string }) {
    if (params) {
      let paramsArray: string[] = [];
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
  post(url: string, params: any) {
    return fetch(url, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(params), // data can be `string` or {object}!
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
export const registerHttpService = ({ get, post }: { [key: string]: () => Promise<any> }) => {
  if (get) httpService.get = get;
  if (post) httpService.post = post;
};
