import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity, StyleSheet, RefreshControl, Image } from 'react-native'
import { connect } from 'react-redux';
import FavIcon from './favIcon';
import { loadItemList } from '../service/api';

class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: false,
            popularPageNo: 1
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
                            <Text>Author: </Text>
                            <Image style={{ height: 22, width: 22 }}
                                source={{ uri: item.owner.avatar_url }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>Start: </Text>
                            <Text>{item.stargazers_count}</Text>
                        </View>
                        <FavIcon theme="" />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    queryData = () => {
        const { query, useOnlineData, type } = this.props;
        if (type === "popular") {
            this.setState({ isLoading: true });
            const q = `q=${query}&sort=stars&page=1&per_page=20`;
            loadItemList(q, "loadItemList", useOnlineData).then(res => {
                this.setState({ data: res.items, isLoading: false });
            });
        }
    }

    handleLoadMore = (info) => {
        const { query, useOnlineData, type } = this.props;
        if (type === "popular") {
            let { popularPageNo, data } = this.state;
            this.setState({ isLoading: true });
            const q = `q=${query}&sort=stars&page=${popularPageNo++}&per_page=20`;
            loadItemList(q, "loadItemList", useOnlineData).then(res => {
                this.setState({ data: [...data, ...res.items], isLoading: false, popularPageNo: popularPageNo++ });
            });
        }
    }

    handleLoadData = () => {
        this.queryData();
    }

    componentWillMount() {
        this.queryData();
    }

    componentWillReceiveProps(nexProps) {
        const { tabName, useOnlineData } = nexProps;
        if (useOnlineData !== this.props.useOnlineData) {
            this.queryData();
        }
    }

    render() {
        const { data, isLoading } = this.state;
        return (
            <View>
                <FlatList
                    data={data}
                    renderItem={({ item }) => this.Item(item)}
                    keyExtractor={item => "" + (item.id || item.fullName)}
                    onEndReached={this.handleLoadMore}
                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            refreshing={isLoading}
                            onRefresh={this.handleLoadData}
                        />
                    }
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    useOnlineData: state.reducers.useOnlineData
});

export default connect(mapStateToProps)(ItemList);

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
        marginBottom: 4,
        color: '#212121',
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575',
    }
}
);
