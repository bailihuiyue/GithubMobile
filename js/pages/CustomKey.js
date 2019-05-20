import React, { Component } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import CheckBox from 'react-native-check-box';
import Ionicons from 'react-native-vector-icons/Ionicons'
import SafeAreaViewPlus from "../utils/SafeAreaViewPlus";
import Header from '../components/Header';
import { MyPageTxt } from '../utils/MyPageTxt';
import { trendingLang, popularLang } from '../service/mock';
class CustomKey extends Component {
    // title, noTitle, leftButton, rightButton, themeColor

    onClick(data, index) {
        data.checked = !data.checked;
        ArrayUtil.updateArray(this.changeValues, data);
        this.state.keys[index] = data;//更新state以便显示选中状态
        this.setState({
            keys: this.state.keys
        })
    }

    //TODO:代码优化:checkedImage,renderCheckBox,renderView完成checkbox的渲染,可提取到一个组件中
    checkedImage(checked) {
        const { themeColor } = this.props;
        return <Ionicons
            name={checked ? 'ios-checkbox' : 'md-square-outline'}
            size={20}
            style={{
                color: themeColor,
            }} />
    }

    renderCheckBox(data, index) {
        return <CheckBox
            style={{ flex: 1, padding: 10 }}
            onClick={() => this.onClick(data, index)}
            isChecked={data.checked}
            leftText={data.name}
            checkedImage={this.checkedImage(true)}
            unCheckedImage={this.checkedImage(false)}
        />
    }

    renderView() {
        let dataArray = this.state.keys;
        if (!dataArray || dataArray.length === 0) return;
        let len = dataArray.length;
        let views = [];
        for (let i = 0, l = len; i < l; i += 2) {
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(dataArray[i], i)}
                        {i + 1 < len && this.renderCheckBox(dataArray[i + 1], i + 1)}
                    </View>
                    <View style={styles.line} />
                </View>
            )
        }
        return views;
    }

    render() {
        const { themeColor, navigation } = this.props;
        const type = navigation.state.params.type;
        const data = type === "CustomKey" ? popularLang : trendingLang;
        return <SafeAreaViewPlus
            style={styles.container}
            topColor={themeColor}
        >
            <Header title={
                type === "CustomKey" ?
                    MyPageTxt.Custom_Key.name
                    : MyPageTxt.Custom_Language.name
            } />
            <ScrollView>
                {/* {this.renderView()} */}
            </ScrollView>
        </SafeAreaViewPlus>
    }
}

const mapStateToProps = state => ({
    themeColor: state.reducers.theme.color
});
const mapDispatchToProps = dispatch => ({
    getTheme: () => dispatch({ type: actionTypes.GET_THEME })
});
export default connect(mapStateToProps, mapDispatchToProps)(CustomKey);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flexDirection: 'row',
    },
    line: {
        flex: 1,
        height: 0.3,
        backgroundColor: 'darkgray',
    }
});