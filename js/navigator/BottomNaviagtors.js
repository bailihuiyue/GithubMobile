import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { BottomTabBar } from 'react-navigation-tabs';
import Popular from '../pages/Popular';
import Trending from '../pages/Trending';
import Favorite from '../pages/Favorite';
import My from '../pages/My';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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

// TODO:颜色得改
// const Tab = createAppContainer(createBottomTabNavigator(
//     tabs,
//     {
//         initialRouteName: "MyPage",
//         tabBarComponent: props =>
//             <TabBarComponent
//                 {...props}
//                 style={{ borderTopColor: '#605F60' }}
//             />,
//     },
// ));

class BottomNavigator extends Component {
    handleChange = (prevState, newState, action) => {
        // debugger
    }
    render() {
        // return <Tab
        //     onNavigationStateChange={this.handleChange}
        // />
    }
}

const mapStateToProps = state => ({
    // theme: state.theme.theme,
});

export default connect(mapStateToProps)(BottomNavigator);
