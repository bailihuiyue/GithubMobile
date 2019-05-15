import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class FavIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFavorite: false
        };
    }

    onPressFavorite() {
        console.log(1)
    }

    render() {
        const { theme } = this.props;
        const { isFavorite } = this.state;
        return (
            <TouchableOpacity
                style={{ padding: 6 }}
                underlayColor='transparent'
                onPress={() => this.onPressFavorite()}>
                <MaterialIcons
                    name={isFavorite ? 'star' : 'star-border'}
                    size={26}
                    style={{ color: theme.themeColor }}
                />
            </TouchableOpacity>
        )
    }
}
