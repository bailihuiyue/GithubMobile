import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity, StyleSheet, RefreshControl, Image, AsyncStorage } from 'react-native'
import { connect } from 'react-redux';
import FavIcon from './favIcon';
import { loadItemList } from '../service/api';
import NavigationUtil from '../navigator/NavigationUtil';
class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: false,
            popularPageNo: 1
        };
    }

    showDetail = (name) => {
        const { navigation } = this.props;
        NavigationUtil.goPage(navigation, "WebViewPage", { name, path: `https://github.com/${name}` });
    }

    Item = (item, type) => {
        const { favPopularKeys, favTrendingKeys } = this.props;
        let arr = [];
        let isFavorite = false;
        let favoriteType = "";
        if (item.id) {
            arr = favPopularKeys.filter((data, i) => data === item.id);
            if (type === "favorite") { favoriteType = "popular"; }
        } else {
            arr = favTrendingKeys.filter(data => data === item.fullName);
            if (type === "favorite") { favoriteType = "trending"; }
        }
        if (arr.length > 0) {
            isFavorite = true;
        }
        return (
            <TouchableOpacity onPress={this.showDetail.bind(this, item.full_name || item.fullName)}>
                <View style={styles.wrap}>
                    <Text style={styles.title}>
                        {item.full_name || item.fullName}
                    </Text>
                    <Text style={styles.description}>
                        {item.description}
                    </Text>
                    <View style={styles.row}>
                        <View style={styles.row}>
                            <Text>Author: </Text>
                            <Image style={{ height: 22, width: 22 }}
                                source={{ uri: item.owner ? item.owner.avatar_url : item.contributors[0] }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>Start: </Text>
                            <Text>{item.stargazers_count || item.meta.split(" ")[0]}</Text>
                        </View>
                        <FavIcon item={item} type={favoriteType || type} isFavorite={isFavorite} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    queryData = (data, searchKey) => {
        const { query, useOnlineData, type, timeSpan } = this.props;
        if (type === "popular") {
            this.setState({ isLoading: true });
            const q = `q=${query}&sort=stars&page=1&per_page=20`;
            loadItemList(q, "popular", useOnlineData).then(res => {
                this.setState({ data: res.items, isLoading: false });
            });
        } else if (type === "trending") {
            this.setState({ isLoading: true });
            const q = `${query}?since=${timeSpan || "monthly"}`;
            loadItemList(q, "trending", useOnlineData).then(res => {
                this.setState({ data: res, isLoading: false });
            });
        } else if (type === "favorite") {
            this.setState({ data, isLoading: false });
        } else if (type === "search" && searchKey) {
            this.setState({ isLoading: true });
            const q = `q=${searchKey}&sort=stars&page=1&per_page=20`;
            loadItemList(q, "search", useOnlineData).then(res => {
                this.setState({ data: res.items, isLoading: false });
            });
        }
    }

    handleLoadMore = (info) => {
        const { query, useOnlineData, type } = this.props;
        if (type === "popular" || type === "search") {
            let { popularPageNo, data } = this.state;
            this.setState({ isLoading: true });
            const q = `q=${query}&sort=stars&page=${popularPageNo++}&per_page=20`;
            loadItemList(q, "loadItemList", useOnlineData).then(res => {
                this.setState({ data: [...data, ...res.items], isLoading: false, popularPageNo: popularPageNo++ });
            });
        }
    }

    handleLoadData = () => {
        const { data } = this.props;
        if (!data) {
            this.queryData();
        }
    }

    componentWillMount() {
        const { data } = this.props;
        this.queryData(data);
    }

    componentWillReceiveProps(nexProps) {
        const { useOnlineData, timeSpan, data, query } = nexProps;
        if (useOnlineData !== this.props.useOnlineData ||
            timeSpan !== this.props.useOnlineData ||
            data !== this.props.data) {
            //TODO:bug:不知道为什么,必须在queryData里传值数据才正常,在queryData方法中解构data,数据总是慢一拍,显示上一次的值
            this.queryData(data, query);
        }
    }

    render() {
        const { data, isLoading } = this.state;
        const { type } = this.props;
        return (
            <View>
                <FlatList
                    data={data}
                    renderItem={({ item }) => this.Item(item, type)}
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
    useOnlineData: state.reducers.useOnlineData,
    favPopularKeys: state.reducers.favPopularKeys,
    favTrendingKeys: state.reducers.favTrendingKeys
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
