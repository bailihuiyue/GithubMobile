import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'


export const MenuItem = (onClick, customIco, menu) => {
    const { name, IconGroup, icon } = menu;
    return (
        <TouchableOpacity
            onPress={onClick}
            style={styles.setting_item_container}
        >
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <IconGroup
                    name={icon}
                    size={16}
                    style={{ color: color, marginRight: 10 }}
                />
                <Text>{name}</Text>
            </View>
            <Ionicons
                name={customIco || 'ios-arrow-forward'}
                size={16}
                style={{
                    marginRight: 10,
                    alignSelf: 'center',
                    color: color || 'black',
                }} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    setting_item_container: {
        backgroundColor: 'white',
        padding: 10, height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
});