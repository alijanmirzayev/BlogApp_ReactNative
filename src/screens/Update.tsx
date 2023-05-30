import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused} from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StateType } from '../redux';
import { getPostById, updatePostById } from '../redux/Slice/PostsSlice';
import { COLORS } from '../constants/Colors';
import { FONTS } from '../constants/Fonts';
import { ActivityIndicator } from 'react-native';


export default function Update({ route, navigation }: any) {
  const itemInfo: string = route.params
  const isFocused = useIsFocused()

  let dispatch = useDispatch<AppDispatch>()
  const { detailError, detailStatus, detail, dark } = useSelector((state: StateType) => state.posts)
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  useEffect(() => {
    if(isFocused) {
      dispatch(getPostById(itemInfo))
    }
  }, [isFocused])

  useEffect(() => {
    setTitle(detail.title)
    setDescription(detail.description)
  }, [detailStatus])

  const handleSubmit = () => {
    let updated = {
      title: title,
      description: description,
      id: detail.id
    }
    dispatch(updatePostById(updated))
    setTitle('')
    setDescription('')
    navigation.navigate('Latest')
  }

  return (
    <View style={[styles.container, {backgroundColor: dark ? 'black' : 'white'}]}>

      {
        detailStatus == 'pending' ?
          <ActivityIndicator style={styles.loading}/>
          :
          <>
            <Text style={[styles.headerText, {color: dark ? 'white' : COLORS.primaryText}]}>Update Post</Text>

            <Text style={[styles.label, {color: dark ? 'white' : 'black'}]}>Title</Text>
            <TextInput
              onChangeText={setTitle}
              defaultValue={title}
              style={[styles.input, {backgroundColor: dark ? 'gray' : COLORS.secondaryBackground, color: dark ? 'white' : 'black'}]}
            />

            <Text style={[styles.label, {color: dark ? 'white' : 'black'}]}>Description</Text>
            <TextInput
              onChangeText={setDescription}
              defaultValue={description}
              multiline
              style={[styles.input, {backgroundColor: dark ? 'gray' : COLORS.secondaryBackground, color: dark ? 'white' : 'black'}]}
            />

            <TouchableOpacity onPress={handleSubmit} style={[styles.submitBtn, {backgroundColor: dark ? 'white': 'black'}]}>
              <Text style={[styles.submit, {color: dark ? 'black' : 'white'}]}>SUBMIT</Text>
            </TouchableOpacity>
          </>
      }

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryBackground,
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 26,
    fontFamily: FONTS.header,
    textAlign: 'center',
    color: COLORS.primaryText
  },
  label: {
    fontSize: 18,
    color: 'black',
    fontFamily: FONTS.navigation,
    marginTop: 12,
  },
  input: {
    marginTop: 8,
    backgroundColor: COLORS.secondaryBackground,
    padding: 12,
    borderRadius: 6,
    fontSize: 18,
    color: 'black',
    fontFamily: FONTS.navigation
  },
  submitBtn: {
    marginTop: 16,
    borderRadius: 8,
    backgroundColor: 'black',
    width: '100%',
    padding: 12
  },
  submit: {
    fontSize: 18,
    color: 'white',
    fontFamily: FONTS.navigation,
    textAlign: 'center'
  }
})