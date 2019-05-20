import { createStackNavigator, createSwitchNavigator, createAppContainer } from "react-navigation";
import { connect } from 'react-redux';
import { createReactNavigationReduxMiddleware, createReduxContainer, createNavigationReducer } from 'react-navigation-redux-helpers';

import WelcomePage from '../pages/Welcome';
import BottomTab from './BottomNaviagtors';

import AboutAuthor from '../pages/about/AboutAuthor';
import AboutProject from '../pages/about/AboutProject';
import CustomKey from '../pages/CustomKey';

const Pages = createStackNavigator(
    {
        WelcomePage: {
            screen: WelcomePage,
            navigationOptions: {
                header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
            }
        },
        //TODO:tip:看来createStackNavigator中还可以包含createBottomTabNavigator
        Main: BottomTab,
        AboutAuthor: {
            screen: AboutAuthor,
            navigationOptions: {
                header: null
            }
        },
        AboutProject: {
            screen: AboutProject,
            navigationOptions: {
                header: null
            }
        },
        CustomKey:{
            screen: CustomKey,
            navigationOptions: {
                header: null
            } 
        }
    },
    {
        defaultNavigationOptions: {
            header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
        }
    }
);

export const RootNavigator = createNavigationReducer(Pages);



/**
 * 1.初始化react-navigation与redux的中间件，
 * 该方法的一个很大的作用就是为createAppContainer的key设置actionSubscribers(行为订阅者)
 * @type {Middleware}
 */
export const navigatorMiddleware = createReactNavigationReduxMiddleware(state => state.nav)

/**
 * 2.将根导航器组件传递给 createReduxContainer 函数,
 * 并返回一个将navigation state 和 dispatch 函数作为 props的新组件；
 * 注意：要在createReactNavigationReduxMiddleware之后执行
 */
export const AppWithNavigationState = createReduxContainer(Pages);

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