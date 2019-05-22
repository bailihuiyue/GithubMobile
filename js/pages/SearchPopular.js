import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class SearchPopular extends Component {
    handleSearch = () => {

    }

    render() {
        return (
            <View>
                <Ionicons
                    name="md-return-right"
                    size={40}
                    style={{
                        marginRight: 10,
                        color: "#000",
                    }}
                    onPress={this.handleSearch}
                />
                <Text> textInComponent </Text>
            </View>
        )
    }
}
