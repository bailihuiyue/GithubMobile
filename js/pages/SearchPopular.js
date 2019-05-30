import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';
import { connect } from 'react-redux';
import { LeftBackButton } from '../components/Buttons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ItemList from '../components/ItemList';
import Header from '../components/Header';
import NavigationUtil from '../navigator/NavigationUtil';
class SearchPopular extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            query: ""
        };
    }

    handleSearch = () => {
        const { searchText } = this.state;
        this.setState({ query: searchText });
    }

    handleClick() {
        const { navigation } = this.props;
        NavigationUtil.goBack(navigation)
    }

    render() {
        const { navigation } = this.props;
        const { searchText, query } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <Header
                    button={<TextInput
                        placeholder="请输入"
                        placeholderTextColor="#FFFFFF"
                        style={styles.textInput}
                        onChangeText={txt => this.setState({ searchText: txt })}
                        value={searchText}
                    />}
                    leftButton={<LeftBackButton onClick={this.handleClick.bind(this)} />}
                    rightButton={
                        <TouchableOpacity>
                            <Ionicons
                                name="md-return-right"
                                size={40}
                                style={{
                                    marginRight: 10,
                                    color: "#FFF",
                                }}
                                onPress={this.handleSearch}
                            />
                        </TouchableOpacity>
                    }
                />
                <ItemList query={query} type="search" navigation={navigation} />
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

export default connect(mapStateToProps)(SearchPopular);

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
    },
    textInput: {
        height: 30,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomWidth: 1,
        borderBottomColor: "white",
        borderRadius: 3,
        opacity: 0.7,
        color: '#FFFFFF',
        width: "80%",
        fontSize: 20,
        padding: 0,
        paddingLeft: 5,
    },
});