import React, { Component } from 'react';
import { DeviceInfo, Modal, TouchableHighlight, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { themeColor } from '../../../utils/ThemeColor';
import GlobalStyles from "../../../common/style/GlobalStyles";
import { connect } from "react-redux";
export default class CustomTheme extends Component {
    render() {
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}
