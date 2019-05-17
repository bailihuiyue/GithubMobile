import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { MenuItem } from '../../components/MenuItem';
import { MyPageTxt } from "../../utils/MyPageTxt";
import { AboutIndex } from "./AboutIndex";
import { withNavigation } from 'react-navigation';

class AboutProject extends Component {
  render() {
    let params = {};
    params.avatar="../../common/image/GtiHub.png"
    params.backgroundImg="../../common/image/GtiHub_background.jpg";
    params.name="GitHub Mobile RN"
    params.description="一个可以在手机上查看热门仓库以及趋势仓库的github APP"
    return (
      <AboutIndex params={params}>
        <MenuItem menu={MyPageTxt.About_Author} onClick={this.handleClickMenu.bind(this, "About_Author")} />
        <View style={GlobalStyles.line} />
        <MenuItem menu={MyPageTxt.Feedback} onClick={this.handleClickMenu.bind(this, "Feedback")} />
        <View style={GlobalStyles.line} />
      </AboutIndex>
    )
  }
}
export default withNavigation(AboutProject);