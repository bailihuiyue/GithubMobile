# GitHub Mobile RN

一个使用React Native制作的Github移动版,用来查看最热项目

项目参考慕课网教程https://coding.imooc.com/class/304.html制作

适合初学RN的同学,由于时间有限,app还有许多功能有待完善,也有很多bug,

#### UI界面:

![图1](https://github.com/bailihuiyue/GithubMobileRN/raw/master/doc/1.png)
![图2](https://github.com/bailihuiyue/GithubMobileRN/raw/master/doc/1.png)
![图3](https://github.com/bailihuiyue/GithubMobileRN/raw/master/doc/1.png)
![图4](https://github.com/bailihuiyue/GithubMobileRN/raw/master/doc/1.png)
扫描二维码可以下载APP进行体验
![图5](https://github.com/bailihuiyue/GithubMobileRN/raw/master/doc/qrcode.png)

##### Popular  API

- URL:https://api.github.com/search/repositories?
- 查询所有的:q=stars:>1&sort=stars
- 分类查询：q=ios&sort=stars
##### Trending  API
https://github.com/trending/css?since=daily weekly monthly
#### 以下是遇到的问题:


0.启动报500 unable to resolve module `./index` :
解决方法:react-native start --reset-cache,或者npm start 然后在新窗口运行react-native run-android

1.报错:Error:Execution failed for task ':app:processDebugResources
解决方法:将android项目build目录下的所有文件删除掉，然后重新编译一下android app

2.安装react-native-gesture-handler之后报错Module AppRegistry is not a registered callable module
解决方法:目前未知(重启电脑后好了???)

3.报错500 Cannot find .index in xxxxx(node_module文件夹)
解决方法:1.react-native start --reset-cache 2.react-native run-android

4.react-native-splash-screen的安装一定要严格按照github上的文档安装,丝毫不能差错,
有问题看issue,里面人蹚的挺全的

5.rn的settimeout有bug,在使用chrome remote debugger时,setTimeout的超时时间只能设置为0,否则永远不执行

6.关于react-navigation-redux-helpers:在使用 React Navigation 的项目中，想要集成 redux 就必须要引入 react-navigation-redux-helpers 这个库。参考网址:http://www.imooc.com/article/283337


图标库使用:
https://blog.csdn.net/j550341130/article/details/81205701
https://oblador.github.io/react-native-vector-icons/

7.react-navigation实在复杂,无奈换了ant-design-mobile-rn感觉好多了

8.报错:Redux-DevTools Error: It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function
解决方法:看起来新版本又更新了方法, 以前 createStore 集成 redux-devtool 的时候提供 3 个参数, 现在需要将后面的 middleware 全部包裹起来
http://szhshp.org/tech/2018/11/15/Itlookslikeyouarepassingseveralstoreenh.html

9.问题:react-navigation中navigation.navigate();无法跳转
解决方法:经过大佬解答,一个app一般只有一个路由入口即一个createAppContainer,改后正常

10.问题:有时候会报一些莫名其妙的错误比如:cannot find module 945,
解决方法:一般是缓存问题,刷新或者重启项目就能解决

11.问题:build 报错:Execution failed for task ':app:mergeReleaseResources'.
解决方法:删除如下文件,然后再看报错内容:

​                android/app/src/main/res/drawable-mdpi/
​                android/app/src/main/res/drawable-xhdpi/
​                android/app/src/main/res/drawable-xxhdpi/

页面路由结构
<Root/>包含所有(<AppNavigators/>)
Welcome
Main
    Popular
    Trending
    Favorite
    My
        about
            AboutAuthor
            AboutProject
        SetPopularKey
        SortPopularKey
        -------------    
​        CustomTheme

##### TODO:

1.codepush
2.社会化分享

##### BUG:

1.首次进入系统时热门和收藏都没有数据,是因为asyncStorage中是空的,在设置中选择一下语言即可

2.趋势页面star显示undefined

3.小米8趋势时间下拉显示不正常,红米3没事

4.tab选择过多时会变形