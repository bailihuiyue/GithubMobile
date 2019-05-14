import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import BottomNavigator from "../navigator/BottomNaviagtors";

export default class Home extends Component {

    render() {
        return <BottomNavigator/>
    }
}

const mapStateToProps = state => ({
    // theme: state.theme.theme,
});

// export default connect(mapStateToProps)(BottomNavigator);
