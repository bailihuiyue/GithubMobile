import { combineReducers } from 'redux';
import login from './login';
import logout from './logout';
import { RootNavigator, AppWithNavigationState } from '../../navigator/AppNavigators';

export default reducer = combineReducers({
    nav: RootNavigator,
    login,
    logout
});