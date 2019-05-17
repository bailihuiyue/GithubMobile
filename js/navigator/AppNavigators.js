import { createStackNavigator, createSwitchNavigator, createAppContainer } from "react-navigation";
import Home from '../pages/Home';
import { connect } from 'react-redux';
import { createReactNavigationReduxMiddleware, createReduxContainer } from 'react-navigation-redux-helpers';

import WelcomePage from '../pages/Welcome';
import BottomTab from './BottomNaviagtors';

import AboutMe from '../pages/about/AboutMe';
import AboutProject from '../pages/about/AboutProject';

export const rootCom = 'Init';//设置根路由


// TODO:两个createStackNavigator的写法不一致
const InitNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
        }
    }
});

const Pages = createStackNavigator(
    {
        AboutMe: {
            screen: AboutMe,
            navigationOptions: {
                header: null
            }
        },
        AboutProject: {
            screen: AboutProject,
            navigationOptions: {
                header: null
            }
        }
    }
);

export const RootNavigator = createAppContainer(createSwitchNavigator({
    Init: InitNavigator,
    Main: BottomTab,
    Pages
}, {
        initialRouteName: "Init",
        navigationOptions: {
            header: null
        }
    })
);

/**
 * 1.初始化react-navigation与redux的中间件，
 * 该方法的一个很大的作用就是为createAppContainer的key设置actionSubscribers(行为订阅者)
 * @type {Middleware}
 */
export const navigatorMiddleware = createReactNavigationReduxMiddleware(
    state => state.nav,
    'root'
);

/**
 * 2.将根导航器组件传递给 createReduxContainer 函数,
 * 并返回一个将navigation state 和 dispatch 函数作为 props的新组件；
 * 注意：要在createReactNavigationReduxMiddleware之后执行
 */
const AppWithNavigationState = createReduxContainer(RootNavigator, 'root');

/**
 * State到Props的映射关系
 * @param state
 */
const mapStateToProps = state => ({
    state: state.nav
});
/**
 * 3.连接 React 组件与 Redux store
 */
export default connect(mapStateToProps)(AppWithNavigationState);