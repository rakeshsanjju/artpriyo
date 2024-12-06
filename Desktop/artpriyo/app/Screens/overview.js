import React from 'react'
import { TextInput, View } from 'react-native'
import BottomNavigation from "./bottomnavigation";

const overview = () => {
  return (
    <View style={{ flex: 1 }}>
      <TextInput>OverView</TextInput>
    <BottomNavigation/>
</View>
  )
}

export default overview
