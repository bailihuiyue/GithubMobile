import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Tabs } from '@ant-design/react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ItemList from '../components/ItemList';
import Header from '../components/Header';
import NavigationUtil from '../navigator/NavigationUtil';
class Popular extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  handleSearch = () => {
    const { navigation } = this.props;
    NavigationUtil.goPage(navigation, "SearchPopular");
  }

  render() {
    const { visiableCustomKey, themeColor } = this.props;
    const theme = {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    };
    const tabs = visiableCustomKey.map(item => {
      return {
        title: item.name,
        query: item.path
      }
    });
    return (
      <View style={{ flex: 1 }}>
        <Header
          title="最热"
          rightButton={
            <TouchableOpacity>
              <Ionicons
                name="ios-search"
                size={40}
                style={{
                  marginRight: 10,
                  color: "#FFF",
                }}
                onPress={this.handleSearch}
              />
            </TouchableOpacity>
          }
          // TODO:bug:只有rightButton时,右按钮会在左边,放一个做按钮占位用
          leftButton={<Ionicons />}
        />
        <Tabs tabs={tabs}>
          {tabs.map(({ title, query }, i) => <ItemList key={title + "i"} tabName={title} query={query} type="popular" />)}
        </Tabs>
      </View>
    )
  }
}
//TODO:修改或删除
const mapStateToProps = state => ({
  popularData: state.reducers.popularData,
  visiableCustomKey: state.reducers.visiableCustomKey,
  themeColor: state.reducers.theme.color,
});

const mapDispatchToProps = dispatch => ({
  getTheme: () => dispatch({ type: actionTypes.GET_THEME })
});

export default connect(mapStateToProps, mapDispatchToProps)(Popular);

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