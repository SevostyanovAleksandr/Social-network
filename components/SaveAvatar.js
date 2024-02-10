import React, { useState } from 'react'
import { View, Button, TextInput, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/storage" 


export default function SaveAvatar(props, {navigation}) {


const uploadImage = async () => {
const  ChildPath = `avatar/${firebase.auth().currentUser.uid}/${Math.random().toString(34)}`
const uri = props.route.params.image ;

  const response = await fetch(uri) 
   
    const blob = await response.blob();
   
    
  const task = firebase.storage().ref().child(ChildPath).put(blob)

 const taskProgress = snapshot => {
    console.log(`начало задачи:${snapshot.bytesTransferred}`)
}

const taskCompleted = () => {
   task.snapshot.ref.getDownloadURL().then((snapshot) => {
    savePostData(snapshot);
        console.log("Задача завершена данные добавлены в бд", snapshot)
    })
}
const taskError = snapshot => {
  console.log("Ошибка задания", snapshot)
}

task.on("state_changed", taskProgress, taskError, taskCompleted);

const savePostData = (downloadURL) => {

  firebase.firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .add({
          downloadURL,
      }).then((function () {
          props.navigation.popToTop()
      }))
}
}
 
return (
    
   <View style={{flex: 1}}>
<Button title="Сохранить" onPress= {()=> uploadImage()} />
   </View>
  )
}