export default class NavigationUtil {
    /**
     * 跳转到指定页面
     * @param params 要传递的参数
     * @param page 要跳转的页面名
     **/
    static goPage(navigation, page) {
        if (!navigation) {
            console.log('navigation can not be null')
            return;
        }
        navigation.navigate(page);
    }

    /**
     * 返回上一页
     * @param navigation
     */
    static goBack(navigation) {
        navigation.goBack();
    }

    /**
     * 重置到首页
     * @param navigation
     */
    static resetToHomPage(navigation) {
        navigation.navigate("Main");
    }

}