import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class FavIcon extends Component {

    render() {
        const { theme } = this.props;
        return (
            <TouchableOpacity
                style={{ padding: 6 }}
                underlayColor='transparent'
                onPress={() => this.onPressFavorite()}>
                <MaterialIcons
                    name={this.state.isFavorite ? 'star' : 'star-border'}
                    size={26}
                    style={{ color: theme.themeColor }}
                />
            </TouchableOpacity>
        )
    }
}
