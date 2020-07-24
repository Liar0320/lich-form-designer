# 开发日志

## 功能列表

- [ x ] 提供一个服务注入，提供一个参数字段生成左边菜单。

## 功能开发设计

### 规则校验的开发

为每一个字段添加 rule 校验 `{type:string,message:''}`

[async-validator](https://github.com/yiminghe/async-validator)

### BUFFIX

- [ ] 解决填充字段的初始化

## 整理

ComponentRegister 组件注册 提供一个组件注册工具 根据定义的组件 type 会优先从此获取组件

ComponentsPack 组件注册解析服务
ComponentsService 组件解析服务抽象类

registerApi 注册 api 接口

FormElemntConfig 表单元素构造类

registerHttpService 请求服务注册

ComponentListService 注册默认组件
