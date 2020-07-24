export function decoratorSubmit(arr, params) {
  return new Promise((resolve, reject) => {
    if (arr?.length > 0) {
      // Promise.all(arr.map(v => v(params)))
      Promise.all(arr.map(v => (v instanceof Promise ? v : v(params))))
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          reject(false);
        });
    } else {
      resolve(true);
    }
  });
}
