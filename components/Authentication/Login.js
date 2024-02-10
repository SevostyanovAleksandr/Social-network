import React, { Component, useState } from 'react'
import { View, TextInput, Text, ImageBackground, StyleSheet, TouchableOpacity, Pressable} from 'react-native'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { container, form } from '../styles'; 





export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignUp = () => {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(console.log("Вошел успешно"))
      .catch((Error) => Alert.alert("Данные введены неверно", Error.message))
  }

  return (
    
    <View style={styles.container}>
        <ImageBackground source={require('../Image/two.jpg')} style={[styles.background, { }]}>
        <View style={container.formCenter}>
            <View>
              <TextInput
                  style={form.textInput}
                  placeholder="email"
                  onChangeText={(email) => setEmail(email)}
              />
              </View>
              <View>
              <TextInput
                  style={form.textInput}
                  placeholder="password"
                  secureTextEntry={true}
                  onChangeText={(password) => setPassword(password)}
              />
              </View>
              <View>
               <TouchableOpacity
              onPress={() => onSignUp()}
              style={styles.button}>
                <Text style={styles.text}>Войти</Text>
            </TouchableOpacity>
            </View>
          </View>
          </ImageBackground>
          
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    background: {
      flex: 1,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 12,
      borderRadius: 20,
      elevation: 3,
      backgroundColor: '#926EAE',
      width: 116, 
      marginLeft: "30%"//
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
  });
  