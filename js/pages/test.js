import React, { Component } from 'react';
import actionTypes from '../redux/actionTypes';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

class Test extends Component {
    render() {
        const { setLoginType, setLoginTypeAsync1, setLoginTypeAsync2, isLogin, isLogout, logout } = this.props;
        // setLoginType({ isLogin: 'setLoginType' });
        // console.log(isLogin);
        // setLoginTypeAsync1();
        // setLoginTypeAsync2();
        // console.log(isLogin);
        logout();
        // console.log(isLogout);
        return (
            <View>
                <Text>test Text</Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLogin: state.login.isLogin,
        // isLogout: state.logout.isLogout
    }
}

const mapDispatchToProps = (dispatch) => ({
    setLoginType: (payload) => dispatch({ type: actionTypes.CHANGE_LOGIN, payload }),
    logout: (payload) => { dispatch({ type: actionTypes.CHANGE_LOGIN, payload }) },
    //TODO:tip:这里可以起个名字,方便调用saga
    setLoginTypeAsync1: (payload) => { dispatch({ type: 'changeLogin_async1', payload }) },
    setLoginTypeAsync2: (payload) => { dispatch({ type: 'changeLogin_async2', payload }) }
});

export default connect(mapStateToProps, mapDispatchToProps)(Test);