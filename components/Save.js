import React, { useState } from 'react'
import { View, Button, TextInput, Image, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/storage" 


export default function SaveImage(props, {navigation}) {

const [caption, setCaption] = useState("");

const uploadImage = async () => {
const  ChildPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(34)}`
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
      .collection('posts')
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add({
          downloadURL,
          caption,
          creation: firebase.firestore.FieldValue.serverTimestamp()
      }).then((function () {
          props.navigation.popToTop()
      }))
}
}
 
return (
  <View style={styles.container}>
    <Image source={{ uri: props.route.params.image }} style={styles.image} />
    <TextInput
      style={styles.input}
      placeholder='Введите описание'
      onChangeText={(caption) => setCaption(caption)}
    />
              <TouchableOpacity 
              onPress={() => uploadImage()}
              style={styles.button}>
                <Text style={styles.text}>Сохранить пост</Text>
              </TouchableOpacity>
  </View>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
marginBottom:"80%"
},
image: {
  width: "100%",
  height: "70%",
  marginBottom: 20,
  borderRadius: 20
},
input: {
  width: '100%',
  height: 40,
  borderWidth: 1,
  borderColor: 'gray',
  borderRadius: 5,
  padding: 10,
},
button: {
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 10,
  paddingHorizontal: 18,
  borderRadius: 20,
  elevation: 3,
  backgroundColor: '#926EAE',
  marginTop:"4%"

},
text: {
  fontSize: 16,
  lineHeight: 21,
  fontWeight: 'bold',
  letterSpacing: 0.25,
  color: 'white',
},
});