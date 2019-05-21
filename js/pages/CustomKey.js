import React, { Component } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import CheckBox from 'react-native-check-box';
import Ionicons from 'react-native-vector-icons/Ionicons'
import SafeAreaViewPlus from "../utils/SafeAreaViewPlus";
import Header from '../components/Header';
import { MyPageTxt } from '../utils/MyPageTxt';
import mock from '../service/mock';
import actionTypes from '../redux/actionTypes';
import ArrayUtil from "../utils/ArrayUtil";

class CustomKey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trendingData: [],
            popularData: []
        }
    }

    onClick(data, index) {
        const { navigation, setCustomKey } = this.props;
        const { keys, trendingData, popularData } = this.state;
        const type = navigation.state.params.type;
        let tempArr = [];
        let tempData = { ...data };
        tempData.checked = !tempData.checked;
        if (type === "CustomKey") {
            tempArr = [...popularData];
            tempArr[index] = tempData;
            this.setState({ popularData: tempArr });
        } else {
            tempArr = [...trendingData];
            tempArr[index] = tempData;
            this.setState({ trendingData: tempArr });
        }
        setCustomKey(type, tempArr);
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
            onClick={this.onClick.bind(this, data, index)}
            isChecked={data.checked}
            leftText={data.name}
            checkedImage={this.checkedImage(true)}
            unCheckedImage={this.checkedImage(false)}
        />
    }

    renderView() {
        const { navigation } = this.props;
        const { trendingData, popularData } = this.state;
        const type = navigation.state.params.type;
        const dataArray = type === "CustomKey" ? popularData : trendingData;
        if (!dataArray || dataArray.length === 0) return;
        const len = dataArray.length;
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

    componentWillMount() {
        const { trendingData, popularData } = this.props;
        this.setState({
            trendingData: trendingData.length > 0 ? trendingData : mock.trendingLang,
            popularData: popularData.length > 0 ? popularData : mock.popularLang
        });
    }

    render() {
        const { themeColor, navigation } = this.props;
        const type = navigation.state.params.type;
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
                {this.renderView()}
            </ScrollView>
        </SafeAreaViewPlus>
    }
}

const mapStateToProps = state => ({
    themeColor: state.reducers.theme.color,
    trendingData: state.reducers.trendingData,
    popularData: state.reducers.popularData,
});
const mapDispatchToProps = dispatch => ({
    setCustomKey: (type, arr) => dispatch({ type: actionTypes.SET_CUSTOM_KEY, payload: { type, arr } })
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