import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Tabs } from '@ant-design/react-native';
import ItemList from '../components/ItemList';
import Header from '../components/Header';
class Popular extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { visiableCustomKey } = this.props;
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
        <Header title="最热" />
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
  visiableCustomKey: state.reducers.visiableCustomKey
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