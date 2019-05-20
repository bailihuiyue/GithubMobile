import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Tabs } from '@ant-design/react-native';
import ItemList from '../components/itemList';
class Popular extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount() {
    const { getTheme } = this.props;
    getTheme();
  }


  render() {
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
        <Tabs tabs={tabs}>
          {tabs.map(({ title }) => <ItemList key={title} tabName={title} />)}
        </Tabs>
      </View>
    )
  }

  componentDidMount() {
    const { navigation, themeColor } = this.props;
  }
}
//TODO:修改或删除
const mapStateToProps = state => ({
  themeColor: state.reducers.theme.color
  // customThemeViewVisible: state.theme.customThemeViewVisible,
  // theme: state.theme.theme,
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