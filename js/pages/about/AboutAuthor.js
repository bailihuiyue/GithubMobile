import React, { Component } from 'react'
import { View } from 'react-native'
import MenuItem from '../../components/MenuItem';
import { MyPageTxt } from "../../utils/MyPageTxt";
import AboutIndex from "./AboutIndex";
import GlobalStyles from "../../common/style/GlobalStyles";
import NavigationUtil from "../../navigator/NavigationUtil";

export default class AboutAuthor extends Component {

  handleClickMenu(type) {
    const { navigation } = this.props;
    let RouteName = "";
    switch (type) {
      case "About_Author":
        RouteName = 'AboutAuthor';
        break;
      case "Feedback":
        break;
    }
    if (RouteName) {
      NavigationUtil.goPage(navigation, RouteName);
    }
  }

  render() {
    const { navigation } = this.props;
    let params = {};
    params.type = "author";
    params.name = "Ones";
    params.description = "从事前端开发,喜欢用程序解决生活中的问题";
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
