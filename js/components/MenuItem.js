import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';


const MenuItem = ({ onClick, customIco, menu, color, themeColor, rightBtn }) => {
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
                    style={{ color: themeColor, marginRight: 10 }}
                />
                <Text>{name}</Text>
            </View>
            {
                rightBtn ?
                    rightBtn :
                    <Ionicons
                        name={customIco || 'ios-arrow-forward'}
                        size={16}
                        style={{
                            marginRight: 10,
                            alignSelf: 'center',
                            color: themeColor || 'black',
                        }}
                    />
            }
        </TouchableOpacity>
    )
}

const mapStateToProps = state => ({
    themeColor: state.reducers.theme.color
});


export default connect(mapStateToProps)(MenuItem);


const styles = StyleSheet.create({
    setting_item_container: {
        backgroundColor: 'white',
        padding: 10, height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
});