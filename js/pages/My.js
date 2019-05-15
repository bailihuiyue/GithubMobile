import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import GlobalStyles from "../common/style/GlobalStyles";
import { MyPageTxt } from "../utils/MyPageTxt";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { MenuItem } from '../utils/MenuItem'

export default class My extends Component {
  handleClickMenu() {

  }

  render() {
    return (
      <View style={GlobalStyles.root_container}>
        <ScrollView>
          <TouchableOpacity
            style={styles.item}
            onPress={() => this.handleClickMenu(MORE_MENU.About)}
          >
            <View style={styles.about_left}>
              <Ionicons
                name={MyPageTxt.About.icon}
                size={40}
                style={{
                  marginRight: 10,
                  //TODO: color: theme.themeColor,
                }}
              />
              <Text>{MyPageTxt.About.name}</Text>
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
          <MenuItem menu={MyPageTxt.Custom_Key} onClick={this.handleClickMenu} color="" />
          <View style={GlobalStyles.line} />
          <MenuItem menu={MyPageTxt.Sort_Key} onClick={this.handleClickMenu} color="" />
          <View style={GlobalStyles.line} />
          <MenuItem menu={MyPageTxt.Remove_Key} onClick={this.handleClickMenu} color="" />
          <Text style={styles.groupTitle}>自定义趋势语言</Text>
          <MenuItem menu={MyPageTxt.Custom_Language} onClick={this.handleClickMenu} color="" />
          <View style={GlobalStyles.line} />
          <MenuItem menu={MyPageTxt.Sort_Language} onClick={this.handleClickMenu} color="" />
          <Text style={styles.groupTitle}>设置</Text>
          <MenuItem menu={MyPageTxt.Custom_Theme} onClick={this.handleClickMenu} color="" />
          <View style={GlobalStyles.line} />
          <MenuItem menu={MyPageTxt.Night_Mode} onClick={this.handleClickMenu} color="" />
          <View style={GlobalStyles.line} />
          <MenuItem menu={MyPageTxt.About_Author} onClick={this.handleClickMenu} color="" />
        </ScrollView>
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
  }
});
