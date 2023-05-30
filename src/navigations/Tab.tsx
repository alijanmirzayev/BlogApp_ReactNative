import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS } from '../constants/Colors';
import { FONTS } from '../constants/Fonts';
import { SIZE } from '../constants/Size';
import { StateType } from '../redux';
import Favorites from '../screens/Favorites';
import Latest from '../screens/Latest';
import Post from '../screens/Post';
import Update from '../screens/Update';

const Tab = createBottomTabNavigator()

export default function TabNavigation() {

  const { error, status, data, dark } = useSelector((state: StateType) => state.posts)

  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: dark ? 'black' : COLORS.primaryBackground,
        borderTopColor: dark ? 'black' : COLORS.primaryBackground
      }
    }}>
      <Tab.Screen name='Latest' component={Latest} options={{
        tabBarIcon: ({ focused }) => {
          if (focused) {
            return <Text style={[styles.navigation, { color: dark ? 'white' : COLORS.primaryText, borderBottomColor: dark ? 'orange' : 'blue', borderBottomWidth: 3, borderRadius: 2 }]}>Latest</Text>
          }
          return <Text style={[styles.navigation, { color: COLORS.secondaryText }]}>Latest</Text>
        }
      }} />
      <Tab.Screen name='Post' component={Post} options={{
        tabBarIcon: ({ focused }) => {
          if (focused) {
            return <Text style={[styles.navigation, { color: dark ? 'white' : COLORS.primaryText, borderBottomColor: dark ? 'orange' : 'blue', borderBottomWidth: 3, borderRadius: 2 }]}>Post</Text>
          }
          return <Text style={[styles.navigation, { color: COLORS.secondaryText }]}>Post</Text>
        }
      }} />
      <Tab.Screen name='Update' component={Update} options={{
        tabBarIcon: ({ focused }) => {
          if (focused) {
            return <Text style={[styles.navigation, { color: dark ? 'white' : COLORS.primaryText, borderBottomColor: dark ? 'orange' : 'blue', borderBottomWidth: 3, borderRadius: 2 }]}>Update</Text>
          }
          return <Text style={[styles.navigation, { color: COLORS.secondaryText }]}>Update</Text>
        }
      }} />
      <Tab.Screen name='Favorites' component={Favorites} options={{
        tabBarIcon: ({ focused }) => {
          if (focused) {
            return <Text style={[styles.navigation, { color: dark ? 'white' : COLORS.primaryText, borderBottomColor: dark ? 'orange' : 'blue', borderBottomWidth: 3, borderRadius: 2 }]}>Favorites</Text>
          }
          return <Text style={[styles.navigation, { color: COLORS.secondaryText }]}>Favorites</Text>
        }
      }} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  navigation: {
    fontFamily: FONTS.navigation,
    fontSize: SIZE.navTitle
  }
})