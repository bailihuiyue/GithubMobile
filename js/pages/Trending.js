import React, { Component } from 'react';
import { View, StyleSheet, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { Tabs } from '@ant-design/react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ItemList from '../components/ItemList';
import Header from '../components/Header';
import NavigationUtil from '../navigator/NavigationUtil';
class Trending extends Component {

  constructor(props) {
    super(props);
    this.state = {
      language: "monthly"
    };
  }

  onValueChange = (itemValue, itemIndex) => {
    this.setState({ language: itemValue })
  }

  render() {
    const { visiableCustomLanguage, navigation } = this.props;
    const { language } = this.state;
    const tabs = visiableCustomLanguage.map(item => {
      return {
        title: item.name,
        query: item.path
      }
    });
    return (
      <View style={{ flex: 1 }}>
        <Header
          title="趋势"
          button={
            <Picker
              selectedValue={language}
              mode="dialog"
              style={{ width: 60, color: "#FFF", fontSize: 50 }}
              itemStyle={{ color: "red", backgroundColor: "red" }}
              onValueChange={this.onValueChange}>
              <Picker.Item label="今日" value="daily" />
              <Picker.Item label="本周" value="weekly" />
              <Picker.Item label="本月" value="monthly" />
            </Picker>
          }
        />
        <Tabs tabs={tabs}>
          {tabs.map(({ title, query }, i) => <ItemList key={title + "i"} tabName={title} query={query} type="trending" timeSpan={language} navigation={navigation} />)}
        </Tabs>
      </View>
    )
  }
}
//TODO:修改或删除
const mapStateToProps = state => ({
  visiableCustomLanguage: state.reducers.visiableCustomLanguage
});

export default connect(mapStateToProps)(Trending);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabStyle: {
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