import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { LinearGradient } from 'expo-linear-gradient';
import { container, form } from '../styles';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
    handleResetPassword = (Email) => {
        firebase.auth().sendPasswordResetEmail(Email)
          .then(function (user) {
            alert('Please check your email...')
          }).catch(function (e) {
            console.log(e)
          })
      }
    
  return (
    <View style={styles.container}>
    <LinearGradient
    colors={['rgb(185, 249, 244)', 'rgb(242, 213, 249)']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={{ flex: 1 }}
    >
       <View style={container.formCenter}>
         <View>
           <TextInput
             style={form.textInput}
             placeholder="Введите ваш emal"
             value={email}
             onChangeText={setEmail}
             keyboardType="email-address"
             autoCapitalize="none"
             autoCorrect={false}
           />
         </View>
         <View>
           <TouchableOpacity
             onPress={() => handleResetPassword()}
             style={styles.button}>
             <Text style={styles.text}>Востановить пароль</Text>
           </TouchableOpacity>
         </View>
       </View>
       </LinearGradient>
   </View>
  );
};

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
      marginTop:"5%",
      marginLeft: "28%"
    }
  });
  export default ForgotPassword;