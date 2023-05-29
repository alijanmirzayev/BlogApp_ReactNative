import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import MainNavigation from './src/navigations/Main'

export default function App() {

  return (
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
  )
}