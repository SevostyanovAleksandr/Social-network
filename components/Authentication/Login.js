import React, { Component } from 'react'
import { View, Button, TextInput} from 'react-native'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore'; 




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
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      console.log("Пользователь успешно вошел в систему", result);
      // ...
    })
    .catch((error) => {
      console.error("Не удача, в систему не зашел", error);
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
