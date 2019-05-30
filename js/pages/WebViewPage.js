import React, { Component } from 'react'
import { WebView, StyleSheet, DeviceInfo } from 'react-native'
import { connect } from 'react-redux';
import Header from '../components/Header';
import { LeftBackButton } from '../components/Buttons';
import SafeAreaViewPlus from "../utils/SafeAreaViewPlus";
import NavigationUtil from '../navigator/NavigationUtil';
import GlobalStyles from "../common/style/GlobalStyles";

class WebViewPage extends Component {

    handleClick() {
        const { navigation } = this.props;
        NavigationUtil.goBack(navigation)
    }

    render() {
        const { themeColor, navigation } = this.props;
        const { state: { params: { name, path } } } = navigation;
        return (
            <SafeAreaViewPlus
                style={GlobalStyles.root_container}
                topColor={themeColor}
            >
                <Header
                    title={name}
                    leftButton={<LeftBackButton onClick={this.handleClick.bind(this)} />}
                />
                <WebView
                    source={{ uri: path }}
                    style={{ marginTop: 20 }}
                />
            </SafeAreaViewPlus>
        )
    }
}

const mapStateToProps = state => ({
    themeColor: state.reducers.theme.color,
});

export default connect(mapStateToProps)(WebViewPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0
    },
});
