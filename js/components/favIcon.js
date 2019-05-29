import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class FavIcon extends Component {
    onPressFavorite = (item) => {
        const { favoritePopular, favoriteTrending, type, setFavorite } = this.props;
        let temp = [];
        if (type === "popular") {
            temp = [...favoritePopular];
            temp = temp.filter(data => data.id === item.id);
            temp = temp.length > 0 ?
                [...favoritePopular].filter(data => data.id !== item.id) :
                [...favoritePopular, item];
            setFavorite({ favoritePopular: temp });
        } else if (type === "trending") {
            temp = [...favoriteTrending];
            temp = temp.filter(data => data.fullName === item.fullName);
            temp = temp.length > 0 ?
                [...favoriteTrending].filter(data => data.fullName !== item.fullName) :
                [...favoriteTrending, item];
            setFavorite({ favoriteTrending: temp });
        }
    }

    render() {
        const { themeColor, item, isFavorite } = this.props;
        return (
            <TouchableOpacity
                style={{ padding: 6 }}
                underlayColor='transparent'
                onPress={this.onPressFavorite.bind(this, item)}>
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
    themeColor: state.reducers.theme.color,
    favoritePopular: state.reducers.favoritePopular,
    favoriteTrending: state.reducers.favoriteTrending,
});

const mapDispatchToProps = dispatch => ({
    setFavorite: ({ favoritePopular, favoriteTrending }) => dispatch({ type: actionTypes.SET_FAVORITE, payload: { favoritePopular, favoriteTrending } })
});

export default connect(mapStateToProps, mapDispatchToProps)(FavIcon);