import React, { Component } from 'react';
import { DeviceInfo, Modal, TouchableHighlight, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from "react-redux";
import themeColor from '../utils/ThemeColor';
import GlobalStyles from "../common/style/GlobalStyles";
import actionTypes from '../redux/actionTypes';

class CustomTheme extends Component {

    onSelectTheme(themeKey) {
        const { onClose, setTheme } = this.props;
        setTheme(themeColor[themeKey]);
        onClose();
    }

    themeItem(themeKey) {
        return (
            <TouchableHighlight
                style={{ flex: 1 }}
                underlayColor='white'
                onPress={() => this.onSelectTheme(themeKey)}
            >
                <View style={[{ backgroundColor: themeColor[themeKey] }, styles.themeItem]}>
                    <Text style={styles.themeText}>{themeKey}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    renderThemePage() {
        // TODO:抄的,待优化
        const views = [];
        for (let i = 0, keys = Object.keys(themeColor), l = keys.length; i < l; i += 3) {
            const key1 = keys[i], key2 = keys[i + 1], key3 = keys[i + 2];
            views.push(<View key={i} style={{ flexDirection: 'row' }}>
                {this.themeItem(key1)}
                {this.themeItem(key2)}
                {this.themeItem(key3)}
            </View>)
        }
        return views;
    }

    renderContent() {
        const { showTheme, onClose } = this.props;
        return (
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={showTheme}
                onRequestClose={onClose}
            >
                <View style={styles.modalContainer}>
                    <ScrollView>
                        {this.renderThemePage()}
                    </ScrollView>
                </View>
            </Modal>
        )
    }

    render() {
        const { showTheme } = this.props;
        let view = showTheme ? <View style={GlobalStyles.root_container}>
            {this.renderContent()}
        </View> : null;
        return view;
    }
}

const mapStateToProps = state => ({
    theme: state
});

const mapDispatchToProps = dispatch => ({
    setTheme: (theme) => dispatch({ type: actionTypes.SET_THEME, payload: { theme } })
});
// TODO:tip:connect里面有两个参数,所以就算不需要state也得写上占位
export default connect(mapStateToProps, mapDispatchToProps)(CustomTheme);

const styles = StyleSheet.create({
    themeItem: {
        flex: 1,
        height: 120,
        margin: 3,
        padding: 3,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        margin: 10,
        marginBottom: 10 + (DeviceInfo.isIPhoneX_deprecated ? 24 : 0),
        marginTop: Platform.OS === 'ios' ? 20 + (DeviceInfo.isIPhoneX_deprecated ? 24 : 0) : 10,
        backgroundColor: 'white',
        borderRadius: 3,
        shadowColor: 'gray',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        padding: 3
    },
    themeText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16
    }
});