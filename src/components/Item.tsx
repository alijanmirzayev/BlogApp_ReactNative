import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { COLORS } from '../constants/Colors'
import { FONTS } from '../constants/Fonts'
import { AppDispatch, StateType } from '../redux';
import { deletePostById, getAllPost } from '../redux/Posts/PostsSlice';

export default function Item({ itemInfo, navigation }: any) {

    let dispatch = useDispatch<AppDispatch>()
    const { error, status, data, dark } = useSelector((state: StateType) => state.posts)

    const handleDetail = () => {
        navigation.navigate('Detail', itemInfo.id)
    }

    const handleDelete = () => {
        dispatch(deletePostById(itemInfo.id))
        dispatch(getAllPost())
    }

    const handleUpdate = () => {
        navigation.navigate('Update', itemInfo.id)
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

                <View style={styles.allBtnContainer}>
                    <TouchableOpacity onPress={handleDelete} style={[styles.btnContainer, {backgroundColor: dark ? 'white' : 'black'}]}>
                        <Text style={[styles.btnText, {color: dark ? 'black': 'white'}]}>Delete</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleUpdate} style={[styles.btnContainer, {backgroundColor: dark ? 'white' : 'black'}]}>
                        <Text style={[styles.btnText, {color: dark ? 'black': 'white'}]}>Update</Text>
                    </TouchableOpacity>
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