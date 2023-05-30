import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../constants/Colors';
import { FONTS } from '../constants/Fonts';
import { AppDispatch, StateType } from '../redux';

export default function FavoriteItem({ itemInfo, navigation }: any) {

    let dispatch = useDispatch<AppDispatch>()
    const { dark } = useSelector((state: StateType) => state.posts)

    const handleDetail = () => {
        navigation.navigate('Detail', itemInfo.id)
    }

    return (
        <View style={styles.itemContainer}>

            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: itemInfo.image }} />
                <Text style={styles.date}>{itemInfo.date}</Text>
            </View>

            <View style={styles.detailContainer}>

                <View>
                    <Text style={styles.readMinuteText}>{itemInfo.readTime}</Text>
                    <Text style={[styles.titleText, { color: dark ? 'white' : COLORS.primaryText }]}>{itemInfo.title}</Text>
                </View>

                <TouchableOpacity onPress={handleDetail} style={[styles.otherBtnContainer, {backgroundColor: dark ? 'white' : 'black'}]}>
                    <Text style={[styles.btnText, {color: dark ? 'black': 'white'}]}>Read More</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        marginHorizontal: 20,
        marginTop: 22,
        flexDirection: 'row',
        gap: 12
    },
    imageContainer: {

    },
    image: {
        borderRadius: 12,
        width: 150,
        height: 130
    },
    date: {
        top: 15,
        left: 15,
        color: 'black',
        backgroundColor: 'white',
        fontSize: 14,
        fontFamily: FONTS.primaryText,
        width: 44,
        height: 18,
        borderRadius: 8,
        textAlign: 'center',
        position: 'absolute'
    },
    detailContainer: {
        marginTop: 8,
        width: '55%'
    },
    readMinuteText: {
        fontSize: 14,
        fontFamily: FONTS.primaryText,
        color: COLORS.secondaryText
    },
    titleText: {
        fontSize: 17,
        fontFamily: FONTS.header,
        color: COLORS.primaryText
    },
    likeText: {
        fontSize: 15,
        fontFamily: FONTS.primaryText,
        color: COLORS.primaryText
    },
    commentText: {
        fontSize: 15,
        fontFamily: FONTS.primaryText,
        color: COLORS.primaryText
    },
    statsItemContainer: {
        flexDirection: 'row',
        gap: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    allBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnContainer: {
        width: '45%',
        backgroundColor: 'black',
        padding: 6,
        borderRadius: 8,
        justifyContent: 'center',
        marginTop: 18,
    },
    otherBtnContainer: {
        width: '100%',
        backgroundColor: 'black',
        padding: 6,
        borderRadius: 8,
        justifyContent: 'center',
        marginTop: 12,
    },
    btnText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: FONTS.primaryText
    }
})