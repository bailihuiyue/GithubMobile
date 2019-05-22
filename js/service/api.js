import { AsyncStorage } from 'react-native';
import mock from './mock';
const listUrl = 'https://api.github.com/search/repositories?';

export const loadItemList = (params, name, useOnlineData) => {
    return getData({ url: `${listUrl}${params}`, method: "GET", name, useOnlineData });
}

const getData = ({ url, method, data = {}, useOnlineData = true, name }) => {
    //获取接口数据
    if (false) {//useOnlineData
        return fetch(url)
            .then(response => response.json())
            .catch((err) => {
                console.log("err", err)
                return Promise.reject(new Error(name + ': ' + err.response.data.msg))
            });
    } else {
        return new Promise((reslove, reject) => { reslove(mock[`${name}Mock`]) });
        //防止接口变化,获取假数据作为演示使用
        // return AsyncStorage.getItem(url, (error, result) => {
        //     if (!error) {
        //         try {
        //             return Promise.resolve(JSON.parse(result));
        //         } catch (e) {
        //             console.error(e);
        //             return Promise.reject(e);
        //         }
        //     } else {
        //         console.error(error);
        //         return Promise.reject(error);
        //     }
        // })
    }
}

const setDemoData = () => {

}