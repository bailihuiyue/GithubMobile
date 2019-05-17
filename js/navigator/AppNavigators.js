import { createStackNavigator, createSwitchNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
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

const MainNavigator = createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
            }
        },
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
        },
        // Details: DetailsScreen
    },
    {
        initialRouteName: "Home"
    }
);

// const tabs = {//在这里配置页面的路由
//     PopularPage: {
//         screen: Popular,
//         navigationOptions: {
//             tabBarLabel: "热门",
//             tabBarIcon: ({ tintColor, focused }) => (
//                 <MaterialIcons
//                     name={'whatshot'}
//                     size={26}
//                     style={{ color: tintColor }}
//                 />
//             )
//         }
//     },
//     TrendingPage: {
//         screen: Trending,
//         navigationOptions: {
//             tabBarLabel: "趋势",
//             tabBarIcon: ({ tintColor, focused }) => (
//                 <MaterialIcons
//                     name={'trending-up'}
//                     size={26}
//                     style={{ color: tintColor }}
//                 />
//             )
//         }
//     },
//     FavoritePage: {
//         screen: Favorite,
//         navigationOptions: {
//             tabBarLabel: "收藏",
//             tabBarIcon: ({ tintColor, focused }) => (
//                 <MaterialIcons
//                     name={'favorite'}
//                     size={26}
//                     style={{ color: tintColor }}
//                 />
//             )
//         }
//     },
//     MyPage: {
//         screen: My,
//         navigationOptions: {
//             tabBarLabel: "我的",
//             tabBarIcon: ({ tintColor, focused }) => (
//                 <MaterialIcons
//                     name={'people'}
//                     size={26}
//                     style={{ color: tintColor }}
//                 />
//             )
//         }
//     }
// };

// const TabBarComponent = (props) => (<BottomTabBar {...props} />);

// const BottomTab = createBottomTabNavigator(
//     tabs,
//     {
//         initialRouteName: "MyPage",
//         tabBarComponent: props =>
//             <TabBarComponent
//                 {...props}
//                 style={{ borderTopColor: '#605F60' }}
//             />,
//     },
// )

export const RootNavigator = createAppContainer(createSwitchNavigator({
    Init: InitNavigator,
    Main: BottomTab,
    // Main:MainNavigator,
    // Bottom: bottomTab
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