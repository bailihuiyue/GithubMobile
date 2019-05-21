import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from "react-navigation";
import { BackHandler } from 'react-native';
import AppNavigators from "../navigator/AppNavigators";
import actionTypes from '../redux/actionTypes';

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

    componentWillMount() {
        const { getTheme, getCustomKeysAndLang } = this.props;
        getCustomKeysAndLang();
        getTheme();
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

const mapStateToProps = state => ({
    nav: state.nav,
    theme: state.reducers.theme
});

const mapDispatchToProps = dispatch => ({
    back: () => dispatch(NavigationActions.back()),
    getTheme: () => dispatch({ type: actionTypes.GET_THEME }),
    getCustomKeysAndLang: () => dispatch({ type: "getCustomKeysAndLang" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
