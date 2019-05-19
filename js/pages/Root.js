import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from "react-navigation";
import { BackHandler } from 'react-native';
import AppNavigators from "../navigator/AppNavigators";

class Root extends Component {
    handleBackPress = () => {
        const { nav, back } = this.props;
        if (nav.index <= 1) {
            //TODO:return false不管用
            return false;
        } else {
            back();
            return true;
        }
    }

    render() {
        return <AppNavigators />
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
    back: () => dispatch(NavigationActions.back())
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
