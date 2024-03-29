import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import LandingScreen from './components/Landing';
import RegisterScreen from './components/Authentication/Regiister';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from './components/Authentication/Login';
import {Component} from 'react'
import "firebase/compat/auth";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk';
import rootReducer from './redux/reduceres'
import MainScreen from "./components/Main";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore'; 
import AddScreen from './components/TabScreen/Add'
import SaveScreen from './components/Save';
import  CommentScreen from './components/Comment'
import ChatScreen from './components/TabScreen/Chat'
import ProfileSettingsScreen from "./components/ProfileSettings"
import ForgotPasswordScreen from "./components/Authentication/ForgotPassword"

const store = createStore(rootReducer, applyMiddleware(thunk))




 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDj4nrSS_9CWm8F395z0zIwl08bCvHpSvQ",
  authDomain: "instagram-demo-9d362.firebaseapp.com",
  projectId: "instagram-demo-9d362",
  storageBucket: "instagram-demo-9d362.appspot.com",
  messagingSenderId: "926848662124",
  appId: "1:926848662124:web:851d43a3f026bb6ca9f649",
  measurementId: "G-G453137L42"
};

const Stack = createStackNavigator();
firebase.initializeApp(firebaseConfig)


export class App extends Component {
  constructor(props) {
    super()
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading</Text>
        </View>
      )
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="ForgotPssword" component={ForgotPasswordScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      );


    }

    return (
      <Provider store={store}>
        <NavigationContainer >
          <Stack.Navigator initialRouteName="Main" >
            <Stack.Screen name="Main" component={MainScreen}  options={{ headerShown: false }}  />
            <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation}/>
            <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation}/>
            <Stack.Screen name="Comment" component={CommentScreen} navigation={this.props.navigation}/>
            <Stack.Screen name="Chat" component={ChatScreen} navigation={this.props.navigation}/>
            <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} navigation={this.props.navigation}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App