import { NavigationContainer } from '@react-navigation/native';
import { Text, View } from 'react-native';
import LandingScreen from './components/Landing';
import RegisterScreen from './components/Regiister';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from './components/Login';
import {Component} from 'react'
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDj4nrSS_9CWm8F395z0zIwl08bCvHpSvQ",
  authDomain: "instagram-demo-9d362.firebaseapp.com",
  projectId: "instagram-demo-9d362",
  storageBucket: "instagram-demo-9d362.appspot.com",
  messagingSenderId: "926848662124",
  appId: "1:926848662124:web:851d43a3f026bb6ca9f649",
  measurementId: "G-G453137L42"
};

firebase.initializeApp(firebaseConfig);
const Stack = createStackNavigator();



export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loader: false,
    }
  }

componentDidMount(){
  firebase.auth().onAuthStateChanged((user)  => {
    if(!user) {
      this.setState({
        loggedIn: false,
        loaded: true
      }) 
    } else {
      this.setState({
        loggedIn: true,
        loaded: true
    })
  }
  })
}
  render() {
    const { loggedIn,loaded } = this.state;
    if (!loaded) {
      return (
        <View  style ={{flex: 1, justifyContent:"center"}} >
          <Text>Loading</Text>
        </View>
      )
    }
    if (!loggedIn){
    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName ="Landing">
        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
     </Stack.Navigator>
    </NavigationContainer>
    )
  }
  return (
    <View  style ={{flex: 1, justifyContent:"center"}} >
          <Text>Пользователь загружен</Text>
        </View>
  )
  }
}

export default App

