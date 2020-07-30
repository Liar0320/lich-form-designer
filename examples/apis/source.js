export const sourceStream = fetch("./index.json")
  .then(v => {
    return v.json();
  })
  .then(formStructRemote => {
    let formStructStroage = null;
    try {
      formStructStroage = JSON.parse(localStorage.getItem("formStruct") || "{}");
      if (!(formStructStroage.list instanceof Array)) {
        formStructStroage.list = [];
      }
    } catch (error) {
      formStructStroage = { list: [] };
    }
    updateLocalStorage(formStructRemote, formStructStroage);
    return formStructRemote.list;
  });

function updateLocalStorage(newSource = {}, oldSource = { list: [] }) {
  if (newSource.version !== oldSource.version) {
    let newNameList = newSource.list.map(v => v.name);
    for (let i = 0; i < oldSource.list.length; i++) {
      const item = oldSource.list[i];
      if (newNameList.indexOf(item.name) === -1) {
        newSource.push(item);
      }
    }
    localStorage.setItem("formStruct", JSON.stringify(newSource));
  }
}

export const updateFormList = ({ name, struct }) => {
  sourceStream.then(v => {
    const formList = v;

    let form = formList.find(form => form.name === name);
    if (form) {
      form.struct = struct;
    } else {
      form = {
        name,
        struct,
        sort: formList.length
      };
      formList.push(form);
    }
    formList.sort((formPrev, formNext) => formPrev.sortNum - formNext.sortNum);
    let formStruct = JSON.parse(localStorage.getItem("formStruct"));
    formStruct.list = formList;
    localStorage.setItem("formStruct", JSON.stringify(formStruct));
  });
};
