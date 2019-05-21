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
            pageNo: 1
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

    handleLoadData = () => {
        const { tabName, useOnlineData } = this.props;
        this.setState({ isLoading: true });
        const query = `q=${tabName}&sort=stars&page=1&per_page=20`;
        loadItemList(query, "loadItemList", useOnlineData).then(res => {
            this.setState({ data: res.items, isLoading: false });
        });
    }

    handleLoadMore = (info) => {
        const { tabName, useOnlineData } = this.props;
        let { pageNo, data } = this.state;
        this.setState({ isLoading: true });
        const query = `q=${tabName}&sort=stars&page=${pageNo++}&per_page=20`;
        loadItemList(query, "loadItemList", useOnlineData).then(res => {
            this.setState({ data: [...data, ...res.items], isLoading: false, pageNo: pageNo++ });
        });
    }

    componentWillMount() {
        const { tabName, useOnlineData } = this.props;
        const query = `q=${tabName}&sort=stars&page=1&per_page=20`;
        this.setState({ isLoading: true });
        loadItemList(query, "loadItemList", useOnlineData).then(res => {
            this.setState({ data: res.items, isLoading: false });
        });
    }

    componentWillReceiveProps(nexProps) {
        const { tabName, useOnlineData } = nexProps;
        console.log("componentWillReceiveProps", useOnlineData !== this.props.useOnlineData);
        if (useOnlineData !== this.props.useOnlineData) {
            this.setState({ isLoading: true });
            const query = `q=${tabName}&sort=stars&page=1&per_page=20`;
            loadItemList(query, "loadItemList", useOnlineData).then(res => {
                this.setState({ data: res.items, isLoading: false });
            });
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
