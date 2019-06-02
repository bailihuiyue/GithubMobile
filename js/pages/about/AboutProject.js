import React, { Component } from 'react'
import { View, Linking, Alert } from 'react-native'
import MenuItem from '../../components/MenuItem';
import { MyPageTxt } from "../../utils/MyPageTxt";
import AboutIndex from "./AboutIndex";
import GlobalStyles from "../../common/style/GlobalStyles";
import NavigationUtil from "../../navigator/NavigationUtil";

export default class AboutProject extends Component {

  handleClickMenu(type) {
    let RouteName = "";
    switch (type) {
      case "About_Author":
        RouteName = 'AboutAuthor';
        break;
      case "Feedback":
        const url = 'mailto://964981348@qq.com';
        Linking.canOpenURL(url)
          .then(support => {
            if (!support) {
              Alert.alert(
                '提示',
                '系统暂不支持发送邮件!',
                [
                  { text: 'OK' },
                ]
              )
            } else {
              Linking.openURL(url);
            }
          }).catch(e => {
            console.error('An error occurred', e);
          });
        break;
    }
    if (RouteName) {
      NavigationUtil.goPage(this.props.navigation, RouteName);
    }
  }

  render() {
    const { navigation } = this.props;
    let params = {};
    params.type = "project";
    params.name = "GitHub Mobile RN";
    params.description = "一个可以在手机上查看热门仓库以及趋势仓库的github APP";
    return (
      <AboutIndex params={params} navigation={navigation}>
        <MenuItem menu={MyPageTxt.About_Author} onClick={this.handleClickMenu.bind(this, "About_Author")} />
        <View style={GlobalStyles.line} />
        <MenuItem menu={MyPageTxt.Feedback} onClick={this.handleClickMenu.bind(this, "Feedback")} />
        <View style={GlobalStyles.line} />
      </AboutIndex>
    )
  }
}