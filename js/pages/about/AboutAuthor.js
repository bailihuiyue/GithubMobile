import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Clipboard, Alert, Linking } from 'react-native'
import AboutIndex from "./AboutIndex";
import { connect } from 'react-redux';
import NavigationUtil from "../../navigator/NavigationUtil";
import { Accordion, List } from '@ant-design/react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ItemList from '../../components/ItemList';
class AboutAuthor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSections: [],
    };
  }

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

  handleChangeAccordion = activeSections => {
    this.setState({ activeSections });
  }

  AccordionTitle = (icon, title) => {
    const { themeColor } = this.props;
    return (
      <View style={styles.AccordionTitle}>
        <Ionicons
          name={icon}
          size={20}
          style={{
            width: 35,
            marginVertical: 10,
            padding: 5,
            alignSelf: 'center',
            color: themeColor || 'black',
          }}
        />
        <Text
          style={{
            flex: 1,
            marginVertical: 10,
            padding: 5,
            alignSelf: 'center',
            color: 'black',
            fontSize: 18
          }}>{title}</Text>
      </View>
    )
  }

  renderItem = (txt, name) => {
    return (
      <List.Item>
        <TouchableOpacity onPress={this.setWebView.bind(this, name)}>
          <Text style={styles.AccordionListItem}>
            {txt}
          </Text>
        </TouchableOpacity>
      </List.Item>
    );
  }

  setWebView = (name) => {
    const { navigation } = this.props;
    switch (name) {
      case "cnblogs":
        NavigationUtil.goPage(navigation, "WebViewPage", { name, path: `https://www.cnblogs.com/ones` });
        break;
      case "github":
        NavigationUtil.goPage(navigation, "WebViewPage", { name, path: `https://github.com/bailihuiyue` });
        break;
      case "qq":
        Clipboard.setString("964981348");
        Alert.alert(
          '提示',
          '已复制到剪切板。',
          [
            { text: 'OK' },
          ]
        )
        break;
      case "mail":
        const url = 'mailto://964981348@qq.com';
        //TODO:多处使用,可以封装
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
      default:
        break;
    }
    console.log(name);
  }

  render() {
    const { navigation, themeColor } = this.props;
    const { activeSections } = this.state;
    let params = {};
    params.type = "author";
    params.name = "Ones";
    params.description = "大富靠命, 小富考勤";
    return (
      <AboutIndex params={params} navigation={navigation}>
        <Accordion
          onChange={this.handleChangeAccordion}
          activeSections={activeSections}
        >
          <Accordion.Panel
            header={
              this.AccordionTitle('md-laptop', '技术博客')
            }>
            <List style={styles.AccordionList}>
              {this.renderItem("博客园", "cnblogs")}
              {this.renderItem("Github", "github")}
            </List>
          </Accordion.Panel>
          <Accordion.Panel
            header={
              this.AccordionTitle('ios-code-working', '开源项目')
            }>
            <ItemList type="my" navigation={navigation} />
          </Accordion.Panel>
          <Accordion.Panel
            header={
              this.AccordionTitle('ios-contacts', '联系方式')
            }>
            <List style={styles.AccordionList}>
              {this.renderItem("QQ:964981348", "qq")}
              {this.renderItem("Email:964981348@qq.com", "mail")}
            </List>
          </Accordion.Panel>
        </Accordion>
      </AboutIndex>
    )
  }
}

const mapStateToProps = state => ({
  themeColor: state.reducers.theme.color
});

export default connect(mapStateToProps)(AboutAuthor);

const styles = StyleSheet.create({
  AccordionTitle: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  AccordionList: {
    borderBottomColor: "#ffffff",
    borderBottomWidth: 5
  },
  AccordionListItem: {
    marginLeft: 40,
    borderBottomColor: "#ffffff",
    borderBottomWidth: 5,
    fontSize: 18
  }
});