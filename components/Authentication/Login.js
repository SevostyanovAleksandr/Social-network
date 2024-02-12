import React, { useState } from 'react';
import { View, TextInput, Button,  Text, ImageBackground, StyleSheet, TouchableOpacity, Alert, Pressable } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { container, form } from '../styles';
import { LinearGradient } from 'expo-linear-gradient';
import ForgotPassword from "./ForgotPassword"
import Svg, { Image as SvgImage } from 'react-native-svg';

export default function Login({ navigation }) {
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
     <LinearGradient
     colors={['rgb(185, 249, 244)', 'rgb(242, 213, 249)']}
     start={{ x: 0, y: 0 }}
     end={{ x: 1, y: 0 }}
     style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
     >
        <View style={container.formCenter}>
        <Svg height="200" width="200">
     <SvgImage href={require('../assets/vconnect3.png')} height="200" width="200" />
   </Svg>
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
          <View>
          <TouchableOpacity onPress={() => navigation.navigate("ForgotPssword")}>
                <Text style={styles.textForgot}>Забыли пароль?</Text>
            </TouchableOpacity>
            </View>
        </View>

        </LinearGradient>
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
  textForgot :{
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#926EAE',
    marginLeft:"20%"
  }


});