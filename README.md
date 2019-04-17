## GitHub Popular  API

- URL:https://api.github.com/search/repositories?
- 查询所有的:q=stars:>1&sort=stars
- 分类查询：q=ios&sort=stars

## Usage:

// var API_URL ='https://api.github.com/search/repositories?q=ios&sort=stars';

// var API_URL ='https://api.github.com/search/repositories?q=stars:>1&sort=stars';

需要link:react-native-gesture-helper

报错:Error:Execution failed for task ':app:processDebugResources
解决方法:将android项目build目录下的所有文件删除掉，然后重新编译一下android app

安装react-native-gesture-handler之后报错Module AppRegistry is not a registered callable module
解决方法:目前未知(重启电脑后好了???)

报错500 Cannot find .index in xxxxx(node_module文件夹)
解决方法:1.react-native start --reset-cache 2.react-native run-android

react-native-splash-screen的安装一定要严格按照github上的文档安装,丝毫不能差错,
有问题看issue,里面人蹚的挺全的

rn的settimeout有bug,在使用chrome remote debugger时,setTimeout的超时时间只能设置为0,否则永远不执行

关于react-navigation-redux-helpers:在使用 React Navigation 的项目中，想要集成 redux 就必须要引入 react-navigation-redux-helpers 这个库。参考网址:http://www.imooc.com/article/283337