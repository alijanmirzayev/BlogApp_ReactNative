import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View, Switch } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native';
import Item from '../components/Item'
import { COLORS } from '../constants/Colors'
import { FONTS } from '../constants/Fonts'
import { SIZE } from '../constants/Size'
import { AppDispatch, StateType } from '../redux'
import { darkmode, getAllPost } from '../redux/Slice/PostsSlice'

export default function Latest({ navigation }: any) {

  const isFocused = useIsFocused()

  let dispatch = useDispatch<AppDispatch>()
  const { error, status, data, dark } = useSelector((state: StateType) => state.posts)
  const [filteredItem, setFilteredItem] = useState([])
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    if (isFocused) {
      dispatch(getAllPost())
    }
  }, [isFocused])

  useEffect(() => {
    setFilteredItem(data)
  }, [data])

  const handleSearch = (value: string) => {
    let filtered = data.filter((e: any) => e.title.toLowerCase().includes(value.toLowerCase()))
    setFilteredItem(filtered)
  }

  const renderItem = ({ item }: any) => {
    return (
      <Item itemInfo={item} navigation={navigation} />
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
          <Text style={[styles.text, { color: dark ? 'white' : COLORS.primaryText }]}>Blogs</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={dark ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={dark}
          />
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            placeholder='Search Blogs'
            onChangeText={(value: string) => handleSearch(value)}
            placeholderTextColor={dark ? 'white' : COLORS.secondaryText}
            style={[styles.input, { backgroundColor: dark ? 'gray' : COLORS.secondaryBackground }]}
          />
          <Feather name='search' size={24} color={dark ? 'white' : 'black'} style={{ position: 'absolute', top: 22, left: 12 }} />
        </View>
        {
          status == 'pending' ?
            <ActivityIndicator size="large" color="black" style={styles.loading} />
            :
            <FlatList
              data={filteredItem}
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