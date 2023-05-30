import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StatusBar, StyleSheet, Switch, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteItem from '../components/FavoriteItem';
import { COLORS } from '../constants/Colors';
import { FONTS } from '../constants/Fonts';
import { SIZE } from '../constants/Size';
import { AppDispatch, StateType } from '../redux';
import { favorite } from '../redux/Slice/FavoriteSlice';
import { darkmode } from '../redux/Slice/PostsSlice';

export default function Favorite({ navigation }: any) {

    const isFocused = useIsFocused()

    let dispatch = useDispatch<AppDispatch>()
    const { dark } = useSelector((state: StateType) => state.posts)
    const { error, status, data } = useSelector((state: StateType) => state.favorite)
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        if (isFocused) {
            dispatch(favorite)
        }
    }, [isFocused])


    const renderItem = ({ item }: any) => {
        return (
            <FavoriteItem itemInfo={item} navigation={navigation} />
        )
    }

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState)
        dispatch(darkmode(isEnabled))
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: dark ? 'black' : COLORS.primaryBackground }]}>

            <>
                <StatusBar
                    backgroundColor={dark ? 'black' : COLORS.primaryBackground}
                />

                <View style={styles.headerContainer}>
                    <Text style={[styles.text, { color: dark ? 'white' : COLORS.primaryText }]}>Favorites</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={dark ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={dark}
                    />
                </View>
                {
                    status == 'pending' ?
                        <ActivityIndicator size="large" color="black" style={styles.loading} />
                        :
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                        />
                }

            </>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerContainer: {
        marginTop: 20,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    searchContainer: {
        marginHorizontal: 20
    },
    text: {
        color: COLORS.primaryText,
        fontSize: 34,
        fontFamily: FONTS.header
    },
    input: {
        marginTop: 12,
        backgroundColor: COLORS.secondaryBackground,
        borderRadius: 6,
        fontFamily: FONTS.primaryText,
        fontSize: SIZE.text,
        paddingLeft: 44,
        color: 'black'
    },
})