import React, { Component } from 'react'
import { Text, View, StatusBar, StyleSheet, Platform, DeviceInfo } from 'react-native'
import { connect } from 'react-redux';

const NAV_BAR_HEIGHT_IOS = 44;//导航栏在iOS中的高度
const NAV_BAR_HEIGHT_ANDROID = 50;//导航栏在Android中的高度
const STATUS_BAR_HEIGHT = DeviceInfo.isIPhoneX_deprecated ? 0 : 20;//状态栏的高度

class Header extends Component {
    render() {
        const { title, noTitle, leftButton, rightButton, themeColor, button } = this.props;
        const Title =
            <View style={styles.navBar}>
                {leftButton}
                {
                    noTitle ?
                        null :
                        <View style={styles.navBarTitleContainer}>
                            {button}
                            {title ? <Text ellipsizeMode="head" numberOfLines={1} style={styles.title}>{title}</Text> : null}
                        </View>
                }
                {rightButton}
            </View>;

        return (
            <View style={{ backgroundColor: themeColor }}>
                <StatusBar barStyle="light-content" hidden={false} style={{ backgroundColor: themeColor, }} />
                {Title}
            </View >
        )
    }
}

const mapStateToProps = state => ({
    themeColor: state.reducers.theme.color
});

export default connect(mapStateToProps)(Header);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2196f3'
    },
    navBarButton: {
        alignItems: 'center'
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
    },
    navBarTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 40,
        right: 40,
        top: 0,
        bottom: 0
    },
    title: {
        fontSize: 20,
        color: 'white',
    },
    statusBar: {
        height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0,
    }
});