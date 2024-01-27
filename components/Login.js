import React, { Component } from 'react'
import { View, Button, TextInput} from 'react-native'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/database"
import "firebase/app"
import "firebase/firestore";
import firebase from "firebase/compat/app";




export class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
        email: "",
        password: ""
    }
    //привязка перемененых к функции
    this.onSignUp = this.onSignUp.bind(this)
  }
onSignUp(){

  const {email, password} = this.state;
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

    render() {
    return (
      <View style = {{flex:1, justifyContent:'center'}}>
        <TextInput
        placeholder='email'
        onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
        placeholder='password'
        secureTextEntry={true}
        onChangeText={(password) => this.setState({password})}
        />
        <Button
        onPress={() => this.onSignUp()}
        title='Войти'
        />
      </View>
      
    )
  }
}
export default Login
