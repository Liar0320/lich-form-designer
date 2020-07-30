// import { templateJSON, updateFormList, formList } from "./source";

import { sourceStream, updateFormList } from "./source";

export const getTemplateJson = all => {
  return sourceStream.then(list => {
    return all ? list : list[0];
  });
};

/**提供一个表结构容器存储案例 */
export const insertOrUpdateForm = ({ name, struct }) => {
  updateFormList({ name, struct });
};

/**提供一个表结构容器存储案例 */
export const selectForm = name => {
  return sourceStream.then(list => {
    return name ? list.find(form => form.name === name) : list;
  });
};

/**提供一个表结构容器存储案例 */
export const deleteForm = name => {
  return sourceStream.then(list => {
    let form = list.find(form => form.name === name);
    if (form) {
      list.splice(list.indexOf(form), 1);
    }
    let formStruct = JSON.parse(localStorage.getItem("formStruct"));
    formStruct.list = list;
    localStorage.setItem("formStruct", JSON.stringify(formStruct));
    return !!form;
  });
};
