import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Tabs } from '@ant-design/react-native';
import ItemList from '../components/ItemList';
import Header from '../components/Header';

class Favorite extends Component {

  render() {
    const { favoritePopular, favoriteTrending, navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Header
          title="收藏"
        />
        <Tabs tabs={[{ title: "热门" }, { title: "趋势" }]}>
          <ItemList tabName="热门" type="favorite" data={favoritePopular} navigation={navigation} />
          <ItemList tabName="趋势" type="favorite" data={favoriteTrending} navigation={navigation} />
        </Tabs>
      </View>
    )
  }
}
//TODO:修改或删除
const mapStateToProps = state => ({
  favoritePopular: state.reducers.favoritePopular,
  favoriteTrending: state.reducers.favoriteTrending,
});

export default connect(mapStateToProps)(Favorite);

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