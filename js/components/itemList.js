import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity, StyleSheet, RefreshControl, Image } from 'react-native'
import { FavIcon } from './favIcon';
import { loadItemList } from '../service/api';

export default class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: false
        };
    }

    Item = (item) => {
        return (
            <TouchableOpacity>
                <View style={styles.wrap}>
                    <Text style={styles.title}>
                        {item.full_name}
                    </Text>
                    <Text style={styles.description}>
                        {item.description}
                    </Text>
                    <View style={styles.row}>
                        <View style={styles.row}>
                            <Text>Author:</Text>
                            <Image style={{ height: 22, width: 22 }}
                                source={{ uri: item.owner.avatar_url }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>Start:</Text>
                            <Text>{item.stargazers_count}</Text>
                        </View>
                        {/* <FavIcon theme="" /> */}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    handleLoadData = () => {
        this.setState({ isLoading: true });
        console.log("loadData", info);
    }

    handleLoadMore = (info) => {
        console.log("loadMore", info);
    }

    componentWillMount() {
        const { tabName, pageNo } = this.props;
        const query = `q=${tabName}&sort=stars&page=${pageNo}&per_page=20`;
        const data = loadItemList(query, "loadItemList").then(res => {
            this.setState({ data: res.items });
        });

    }

    render() {
        // TODO:theme要统一传入
        const { data, isLoading } = this.state;
        // const { theme } = this.props;
        // const theme = "";
        console.log(data)
        return (
            <View>
                <FlatList
                    data={data}
                    renderItem={({ item }) => this.Item(item)}
                    keyExtractor={item => "" + (item.id || item.fullName)}
                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            // titleColor={theme.themeColor}
                            // colors={[theme.themeColor]}
                            refreshing={isLoading}
                            onRefresh={() => this.handleLoadData}
                            onEndReached={this.handleLoadMore}
                            onEndReachedThreshold={0}
                        // tintColor={theme.themeColor}
                        />
                    }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrap: {
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderColor: '#dddddd',
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 2
    },
    row: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121',
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575',
    }
}
);
