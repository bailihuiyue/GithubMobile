import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const LeftBackButton = ({ onClick }) => {
    return <TouchableOpacity
        style={{ padding: 8, paddingLeft: 12 }}
        onPress={onClick}>
        <Ionicons
            name={'ios-arrow-back'}
            size={26}
            style={{ color: 'white' }} />
    </TouchableOpacity>
}

export const RightButton = ({ title, onClick }) => {
    return <TouchableOpacity
        style={{ alignItems: 'center', }}
        onPress={onClick}>
        <Text style={{ fontSize: 20, color: '#FFFFFF', marginRight: 10 }}>{title}</Text>
    </TouchableOpacity>
}

export const ShareButton = (onClick) => {
    return <TouchableOpacity
        underlayColor={'transparent'}
        onPress={onClick}
    >
        <Ionicons
            name={'md-share'}
            size={20}
            style={{ opacity: 0.9, marginRight: 10, color: 'white' }} />
    </TouchableOpacity>
}