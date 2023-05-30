import { View, Text, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../constants/Colors'
import { FONTS } from '../constants/Fonts'
import { AppDispatch, StateType } from '../redux';
import { createPost } from '../redux/Slice/PostsSlice';

export default function Post({navigation}: any) {

  let dispatch = useDispatch<AppDispatch>()
  const { status, data, dark } = useSelector((state: StateType) => state.posts)
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [author, setAuthor] = useState<string>('')

  const handleSubmit = () => {
    let newPost = {
      id: Math.floor(Math.random * 1242),
      title: title,
      description: description,
      author: author,
      image: 'https://www.invenura.com/wp-content/themes/consultix/images/no-image-found-360x250.png',
      date: '29 May',
      readTime: '12 Mins Read',
    }
    dispatch(createPost(newPost))
    navigation.navigate('Latest')
  }

  return (
    <View style={[styles.container, {backgroundColor: dark ? 'black' : 'white'}]}>

      {
        status == 'pending' ?
          <ActivityIndicator style={styles.loading} />
          :
          <>
            <Text style={[styles.headerText, {color: dark ? 'white' : COLORS.primaryText}]}>Add a Post</Text>

            <Text style={[styles.label, {color: dark ? 'white' : 'black'}]}>Title</Text>
            <TextInput
              onChangeText={setTitle}
              style={[styles.input, {backgroundColor: dark ? 'gray' : COLORS.secondaryBackground, color: dark ? 'white' : 'black'}]}
            />

            <Text style={[styles.label, {color: dark ? 'white' : 'black'}]}>Description</Text>
            <TextInput
              onChangeText={setDescription}
              multiline
              style={[styles.input, {backgroundColor: dark ? 'gray' : COLORS.secondaryBackground, color: dark ? 'white' : 'black'}]}
            />

            <Text style={[styles.label, {color: dark ? 'white' : 'black'}]}>Author</Text>
            <TextInput
              onChangeText={setAuthor}
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