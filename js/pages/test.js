import React, { Component } from 'react';
import actionTypes from '../redux/actionTypes';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

class Test extends Component {
    render() {
        const { dispatch } = this.props;
        return (
            <View>
                <Text>test Text</Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLogin: state.isLogin
    }
}

const mapDispatchToProps = (dispatch) => ({
    setLoginType: () => dispatch({ type: actionTypes.CHANGE_LOGIN, payload: true })
});

export default connect(mapStateToProps, mapDispatchToProps)(Test)