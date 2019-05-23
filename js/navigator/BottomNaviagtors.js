import React from 'react';
import { createBottomTabNavigator } from "react-navigation";
import TabBarComponent from './TabBarComponent';
import Popular from '../pages/Popular';
import Trending from '../pages/Trending';
import Favorite from '../pages/Favorite';
import My from '../pages/My';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const tabs = {//在这里配置页面的路由
    PopularPage: {
        screen: Popular,
        navigationOptions: {
            tabBarLabel: "热门",
            tabBarIcon: ({ tintColor, focused }) => (
                <MaterialIcons
                    name={'whatshot'}
                    size={26}
                    style={{ color: tintColor }}
                />
            )
        }
    },
    TrendingPage: {
        screen: Trending,
        navigationOptions: {
            tabBarLabel: "趋势",
            tabBarIcon: ({ tintColor, focused }) => (
                <MaterialIcons
                    name={'trending-up'}
                    size={26}
                    style={{ color: tintColor }}
                />
            )
        }
    },
    FavoritePage: {
        screen: Favorite,
        navigationOptions: {
            tabBarLabel: "收藏",
            tabBarIcon: ({ tintColor, focused }) => (
                <MaterialIcons
                    name={'favorite'}
                    size={26}
                    style={{ color: tintColor }}
                />
            )
        }
    },
    MyPage: {
        screen: My,
        navigationOptions: {
            tabBarLabel: "我的",
            tabBarIcon: ({ tintColor, focused }) => (
                <MaterialIcons
                    name={'people'}
                    size={26}
                    style={{ color: tintColor }}
                />
            )
        }
    }
};

export default createBottomTabNavigator(
    tabs,
    {
        initialRouteName: "TrendingPage",
        tabBarComponent: props =>
            <TabBarComponent
                {...props}
                style={{ borderTopColor: '#605F60' }}
            />,
    },
)
