import React, { Component } from 'react'
import { View, Button, TextInput} from 'react-native'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore'; 

export class Register extends Component {
  constructor(props){
    super(props);

    this.state = {
        email: '',
        password: '',
        name: ''
    }
   // привязка перемененых к функции
   this.onSignUp = this.onSignUp.bind(this)
  }

onSignUp(){
  const {email, password, name} = this.state;
  //создание пользователя
 firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((result) => {
    firebase.firestore().collection("users")
    .doc(firebase.auth().currentUser.uid)
    .set({
      name,
      email
    })
    
    console.log("Пользователь успешно добавлен в базу данных Firestore", result);
  })
  .catch((error) => {
    console.error("Ошибка при добавлении пользователя в базу данных Firestore:", error);
  })
  }

    render() {
    return (
      <View style = {{flex:1, justifyContent:'center'}}>
        <TextInput
        placeholder='name'
        onChangeText={(name) => this.setState({ name })}
        />
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
        title='Зарегистрирываться'
        />
      </View>
      
    )
  }
}
export default Register