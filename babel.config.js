module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  // 实测没用,注释了也不报错
  "plugins": [
    ["import", { libraryName: "@ant-design/react-native" }] // 与 Web 平台的区别是不需要设置 style
  ]
};
