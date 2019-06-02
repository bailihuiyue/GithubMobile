import { AsyncStorage } from 'react-native';
import Trending from 'GitHubTrending';
import mock from './mock';
const popularUrl = 'https://api.github.com/search/repositories?';
const trndingUrl = 'https://github.com/trending/';
const myRepo = 'https://api.github.com/users/bailihuiyue/repos';
export const loadItemList = (params, name, useOnlineData) => {
    let url = "";
    if (name === "popular" || name === "search") {
        url = popularUrl + params;
    } else if (name === "my") {
        url = myRepo + params;
    } else {
        url = trndingUrl;
    }
    return getData({ url, method: "GET", name, useOnlineData });
}

const getData = ({ url, method, useOnlineData = true, name }) => {
    //获取接口数据
    if (useOnlineData) {
        if (name === "trending") {
            return new Trending().fetchTrending(url)
                .then(response => response)
                .catch((err) => {
                    console.log("err", err)
                    return Promise.reject(new Error(name + ': ' + err))
                });

        } else {
            return fetch(url)
                .then(response => response.json())
                .catch((err) => {
                    console.log("err", err)
                    return Promise.reject(new Error(name + ': ' + err.response.data.msg))
                });
        }
    } else {
        return new Promise((reslove, reject) => { reslove(mock[`${name}Mock`]) });
        //防止接口变化,获取假数据作为演示使用
    }
}