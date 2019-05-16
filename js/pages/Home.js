import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from "react-navigation";
import { BackHandler } from 'react-native';
import BottomNavigator from "../navigator/BottomNaviagtors";

class Home extends Component {
    handleBackPress = () => {
        const { dispatch, nav } = this.props;
        if (nav.routes[1].index === 0) {
            //TODO:return false不管用
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    }

    render() {
        return <BottomNavigator />
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
}

//TODO:修改或删除
const mapStateToProps = state => ({
    nav: state.nav,
    // customThemeViewVisible: state.theme.customThemeViewVisible,
    // theme: state.theme.theme,
});

const mapDispatchToProps = dispatch => ({
    // onShowCustomThemeView: (show) => dispatch(actions.onShowCustomThemeView(show)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
