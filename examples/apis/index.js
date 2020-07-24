import { templateJSON, updateFormList, formList } from "./source";

export const getTemplateJson = all => {
  return new Promise(resolve => {
    resolve(all ? templateJSON : templateJSON[0]);
  });
};

/**提供一个表结构容器存储案例 */
export const insertOrUpdateForm = ({ name, struct }) => {
  updateFormList({ name, struct });
};

/**提供一个表结构容器存储案例 */
export const selectForm = name => {
  return new Promise(resolve => {
    resolve(name ? formList.find(form => form.name === name) : formList);
  });
};

/**提供一个表结构容器存储案例 */
export const deleteForm = name => {
  return new Promise(resolve => {
    let form = formList.find(form => form.name === name);
    if (form) {
      formList.splice(formList.indexOf(form), 1);
    }
    localStorage.setItem("formList", JSON.stringify(formList));
    resolve(!!form);
  });
};
