import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class FavIcon extends Component {
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
        const { themeColor } = this.props;
        const { isFavorite } = this.state;
        return (
            <TouchableOpacity
                style={{ padding: 6 }}
                underlayColor='transparent'
                onPress={() => this.onPressFavorite()}>
                <MaterialIcons
                    name={isFavorite ? 'star' : 'star-border'}
                    size={26}
                    style={{ color: themeColor }}
                />
            </TouchableOpacity>
        )
    }
}
const mapStateToProps = state => ({
    themeColor: state.reducers.theme.color
});


export default connect(mapStateToProps)(FavIcon);