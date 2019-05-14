import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Tabs } from '@ant-design/react-native';
import ItemList from '../components/itemList';
// import { loadItemList } from '../service/api';
export default class Popular extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }
  // getTabs(keys, theme = "") {
  //   const tabs = {};
  //   keys.forEach((item, index) => {
  //     if (item.checked) {
  //       tabs[`tab${index}`] = {
  //         screen: props => <PopularTabPage {...props} tabLabel={item.name} theme={theme} />,
  //         navigationOptions: {
  //           title: item.name
  //         }
  //       }
  //     }
  //   });
  //   return tabs;
  // }

  changeTab = (tab, index) => {
    //q=ios&sort=stars
    const query = `q=${tab}&sort=stars`
    // loadItemList(tab)
  }

  render() {
    // const { keys, theme } = this.props;
    // const keys = [{ name: "ios" }, { name: "java" }];
    const theme = {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    };
    const tabs = [
      { title: 'ios' },
      { title: 'java' },
      { title: 'vue' },
    ];
    return (
      <View style={{ flex: 1 }}>
        <Tabs tabs={tabs} onChange={this.changeTab}>
          {
            tabs.map(({ title }) => <ItemList key={title} tabName={title} pageNo="1" />)
          }
        </Tabs>
        <Text> Popular </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabStyle: {
    // minWidth: 50 //fix minWidth会导致tabStyle初次加载时闪烁
    padding: 0
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white'
  },
  labelStyle: {
    fontSize: 13,
    margin: 0,
  },
  indicatorContainer: {
    alignItems: "center"
  },
  indicator: {
    color: 'red',
    margin: 10
  }
});