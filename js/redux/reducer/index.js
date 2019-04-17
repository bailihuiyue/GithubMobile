import { combineReducers } from 'redux';
import login from './login';
import logout from './logout';
import {rootCom, RootNavigator} from '../../navigator/AppNavigators';

//1.指定默认state
const navState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams(rootCom));

/**
 * 2.创建自己的 navigation reducer，
 */
const navReducer = (state = navState, action) => {
    const nextState = RootNavigator.router.getStateForAction(action, state);
    // 如果`nextState`为null或未定义，只需返回原始`state`
    return nextState || state;
};

export default reducer = combineReducers({
    nav: navReducer,
    login,
    logout
});