import React from 'react'
import { Text, Button, View } from 'react-native'

export default function Landing({navigation}) {
  return (
        <View style ={{flex: 1, justifyContent:"center", alignItems:"center"}} >
         <Button
          title='Регистрация'
          onPress={() => navigation.navigate("Register")}  />
        <Button
          title='Логин'
          onPress={() => navigation.navigate("Login")} />
       </View>
       
  )
}