import React, { useState } from 'react';
import { View, TextInput, Text, ImageBackground, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { container, form } from '../styles';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignUp = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("Вошел успешно");
      })
      .catch((error) => {
        Alert.alert("Ошибка", "Данные введены неверно");
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/login signup page.png')} style={[styles.background, { }]}>
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
  );
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
    paddingVertical: 18,
    paddingHorizontal: 12,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#926EAE',
    width: "100%",
    marginTop:"10%"
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});