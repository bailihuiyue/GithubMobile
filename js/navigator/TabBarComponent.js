import React, { Component } from 'react'
import { BottomTabBar } from 'react-navigation-tabs';
import { connect } from 'react-redux';

class TabBarComponent extends Component {
    render() {
        const { themeColor } = this.props;
        return (
            <BottomTabBar {...this.props} activeTintColor={themeColor} />
        )
    }
}

const mapStateToProps = state => ({
    themeColor: state.reducers.theme.color
});

export default connect(mapStateToProps)(TabBarComponent);