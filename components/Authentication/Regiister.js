import React, { Component, useState } from 'react'
import { View, Button, TextInput, Text, ImageBackground, StyleSheet, TouchableOpacity, Pressable} from 'react-native'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Snackbar } from 'react-native-paper';
import { container, form } from '../styles'; 
import Video from 'react-native-video';

export default function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [isValid, setIsValid] = useState(true);

  const onRegister = () => {
      if (name.lenght == 0 || username.lenght == 0 || email.length == 0 || password.length == 0) {
          setIsValid({ bool: true, boolSnack: true, message: "Please fill out everything" })
          return;
      }
      if (password.length < 6) {
          setIsValid({ bool: true, boolSnack: true, message: "passwords must be at least 6 characters" })
          return;
      }
      if (password.length < 6) {
          setIsValid({ bool: true, boolSnack: true, message: "passwords must be at least 6 characters" })
          return;
      }
      firebase.firestore()
          .collection('users')
          .where('username', '==', username)
          .get()
          .then((snapshot) => {

              if (!snapshot.exist) {
                  firebase.auth().createUserWithEmailAndPassword(auth, email, password)
                      .then(() => {
                          if (snapshot.exist) {
                              return
                          }
                          firebase.firestore().collection("users")
                              .doc(firebase.auth().currentUser.uid)
                              .set({
                                  name,
                                  email,
                                  username,
                                  image: 'default',
                                  followingCount: 0,
                                  followersCount: 0,

                              })
                      })
                      .catch(() => {
                          setIsValid({ bool: true, boolSnack: true, message: "Something went wrong" })
                      })
              }
          }).catch(() => {
              setIsValid({ bool: true, boolSnack: true, message: "Something went wrong" })
          })

  }

  return (
      <View style={container.center}>
          <ImageBackground source={require('../Image/twoooo.jpg')} style={[styles.background, { }]}>
          <View style={container.formCenter}>
              <TextInput
                  style={form.textInput}
                  placeholder="name"
                  onChangeText={(name) => setName(name)}
              />
              <TextInput
                  style={form.textInput}
                  placeholder="email"
                  onChangeText={(email) => setEmail(email)}
              />
              <TextInput
                  style={form.textInput}
                  placeholder="password"
                  secureTextEntry={true}
                  onChangeText={(password) => setPassword(password)}
              />
               <TouchableOpacity
              onPress={() => onRegister()}
              style={styles.button}>
                <Text style={styles.text}>Зарегистрироваться</Text>
            </TouchableOpacity>
          </View>
          
          <Snackbar
              visible={isValid.boolSnack}
              duration={2000}
              onDismiss={() => { setIsValid({ boolSnack: false }) }}>
              {isValid.message}
          </Snackbar>
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
        paddingHorizontal: 32,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: '#926EAE',
        width: 238, 
        marginLeft:"10%"
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
  });