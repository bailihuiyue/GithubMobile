import React, { Component } from 'react';
// import { Text, View, Alert } from 'react-native';
import NavigationUtil from "../navigator/NavigationUtil";
import SplashScreen from 'react-native-splash-screen';
// import actions from "../action";
// import {connect} from "react-redux";

type Props = {};

export default class WelcomePage extends Component<Props> {
    componentDidMount() {
        console.log('componentDidMount', this.props);
        // this.props.onThemeInit();
        this.timer = setTimeout(() => {
            SplashScreen.hide();
            NavigationUtil.resetToHomPage({
                navigation: this.props.navigation
            })
        }, 200);

        // this.props.navigation.navigate('Home')
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return null;
    }
}
// const mapDispatchToProps = dispatch => ({
//     onThemeInit: () => dispatch(actions.onThemeInit()),
// });

// export default connect(null, mapDispatchToProps)(WelcomePage);