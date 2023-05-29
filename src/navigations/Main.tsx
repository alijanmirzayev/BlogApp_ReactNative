import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Detail from '../screens/Detail'
import TabNavigation from './Tab'
import { Provider } from 'react-redux'
import { store } from '../redux'

const Stack = createNativeStackNavigator()

export default function MainNavigation() {
  return (
    <Provider store={store}>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name='Tab' component={TabNavigation} />
        <Stack.Screen name='Detail' component={Detail} />
      </Stack.Navigator>
    </Provider>
  )
}