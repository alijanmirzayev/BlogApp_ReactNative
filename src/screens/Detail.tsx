import React, { useEffect } from 'react';
import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto'
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../constants/Colors';
import { FONTS } from '../constants/Fonts';
import { AppDispatch, StateType } from '../redux';
import { getPostById } from '../redux/Slice/PostsSlice';

export default function Detail({ route, navigation }: any) {
  const itemInfo: string = route.params

  let dispatch = useDispatch<AppDispatch>()
  const { detailError, detailStatus, detail, dark } = useSelector((state: StateType) => state.posts)
  useEffect(() => {
    dispatch(getPostById(itemInfo))
  }, [])

  const handleExit = () => {
    navigation.navigate('Tab')
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: dark ? 'black' : COLORS.primaryBackground, }]}>

      {
        detailStatus == 'pending' ?
          <ActivityIndicator size="large" color="black" style={styles.loading} />
          :
          <>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity onPress={handleExit} style={styles.exitContainer}>
                <FontAwesome name='long-arrow-left' size={32} color={dark ? 'white' : 'black'} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.exitContainer}>
                <Fontisto name='favorite' size={32} color={dark ? 'white' : 'black'} />
              </TouchableOpacity>
            </View>

            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: detail.image == null ? 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg' : detail.image }} />
            </View>

            <View style={styles.authorContainer}>
              <Text style={styles.byText}>Author: </Text>
              <Text style={[styles.authorText, { color: dark ? 'white' : COLORS.primaryText }]}>{detail.author}</Text>
            </View>

            <View style={styles.contentContainer}>
              <Text style={[styles.title, { color: dark ? 'white' : 'black' }]}>{detail.title}</Text>
              <Text style={[styles.description, { color: dark ? 'white' : 'black' }]}>{detail.description}</Text>
            </View>
          </>
      }

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryBackground,
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  exitContainer: {
    marginHorizontal: 20,
    marginTop: 22,
    paddingVertical: 8,
  },
  imageContainer: {
    marginHorizontal: 20,
    marginTop: 6,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 10
  },
  authorContainer: {
    marginHorizontal: 28,
    marginTop: 12,
    flexDirection: 'row'
  },
  byText: {
    color: COLORS.secondaryText,
    fontSize: 14,
    fontFamily: FONTS.navigation
  },
  authorText: {
    color: COLORS.primaryText,
    fontSize: 14,
    fontFamily: FONTS.navigation
  },
  contentContainer: {
    marginHorizontal: 20,
    marginTop: 8
  },
  title: {
    fontSize: 28,
    color: 'black',
    fontFamily: FONTS.header
  },
  description: {
    marginHorizontal: 3,
    marginTop: 6,
    fontSize: 19,
    color: 'black',
    fontFamily: FONTS.primaryText,
  }
})