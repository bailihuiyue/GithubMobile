import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GlobalStyles from "../common/style/GlobalStyles";
import { MyPageTxt } from "../utils/MyPageTxt";
import { MenuItem } from '../components/MenuItem';
import Header from '../components/Header';
import NavigationUtil from "../navigator/NavigationUtil";
import CustomTheme from './CustomTheme';

//TODO:删掉
console.disableYellowBox = true;

export default class My extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTheme: false
    };
  }

  handleClickMenu(type) {
    let RouteName = "";
    switch (type) {
      case "About_Project":
        RouteName = 'AboutProject';
        break;
      case "Custom_Key":
        break;
      case "Sort_Key":
        break;
      case "Remove_Key":
        break;
      case "Custom_Language":
        break;
      case "Sort_Language":
        break;
      case "Custom_Theme":
        this.setState({ showTheme: true });
        break;
      case "Night_Mode":
        break;
      case "About_Author":
        break;
    }
    if (RouteName) {
      NavigationUtil.goPage(this.props.navigation, RouteName);
    }
  }

  onCloseTheme() {
    this.setState({ showTheme: false })
  }

  render() {
    const { showTheme } = this.state;
    return (
      <View style={GlobalStyles.root_container}>
        <Header title="我的" />
        <ScrollView>
          <TouchableOpacity
            style={styles.item}
            onPress={this.handleClickMenu.bind(this, "About_Project")}
          >
            <View style={styles.about_left}>
              <Ionicons
                name={MyPageTxt.About_Project.icon}
                size={40}
                style={{
                  marginRight: 10,
                  //TODO: color: theme.themeColor,
                }}
              />
              <Text>{MyPageTxt.About_Project.name}</Text>
            </View>
            <Ionicons
              name='ios-arrow-forward'
              size={16}
              style={{
                marginRight: 10,
                alignSelf: 'center',
                // color: theme.themeColor,
              }} />
          </TouchableOpacity>
          <Text style={styles.groupTitle}>自定义热门语言</Text>
          <MenuItem menu={MyPageTxt.Custom_Key} onClick={this.handleClickMenu.bind(this, "Custom_Key")} />
          <View style={GlobalStyles.line} />
          <MenuItem menu={MyPageTxt.Sort_Key} onClick={this.handleClickMenu.bind(this, "Sort_Key")} />
          <View style={GlobalStyles.line} />
          <MenuItem menu={MyPageTxt.Remove_Key} onClick={this.handleClickMenu.bind(this, "Remove_Key")} />
          <Text style={styles.groupTitle}>自定义趋势语言</Text>
          <MenuItem menu={MyPageTxt.Custom_Language} onClick={this.handleClickMenu.bind(this, "Custom_Language")} />
          <View style={GlobalStyles.line} />
          <MenuItem menu={MyPageTxt.Sort_Language} onClick={this.handleClickMenu.bind(this, "Sort_Language")} />
          <Text style={styles.groupTitle}>设置</Text>
          <MenuItem menu={MyPageTxt.Custom_Theme} onClick={this.handleClickMenu.bind(this, "Custom_Theme")} />
          <View style={GlobalStyles.line} />
          <MenuItem menu={MyPageTxt.Night_Mode} onClick={this.handleClickMenu.bind(this, "Night_Mode")} />
        </ScrollView>
        {/* 颜色选择器 */}
        <CustomTheme showTheme={showTheme} onClose={this.onCloseTheme.bind(this)} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30
  },
  about_left: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  item: {
    backgroundColor: 'white',
    padding: 10,
    height: 90,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  groupTitle: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 12,
    color: 'gray'
  },
  themeModal: {
    position: "absolute",
    top: 50,
    bottom: 50,
    left: 30,
    right: 30,
    backgroundColor: "#fff"
  },
  colorBtn: {
    width: "33.3%"
  }
});
