import React from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore'; 
import { useState } from 'react'
import { user } from '../../redux/reduceres/user';

export default function Search(props) {
  const [users, setUsers] = useState([])

  const fetchUsersSearch  = (search) => {
    firebase.firestore()
    .collection("users")
    .where("name", ">=", search)
    .get()
    .then((snapshot) => {
      let users = snapshot.docs.map(doc => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data }
    });
    setUsers(users);
    })
  }
  return (
    <View>
        <TextInput 
        placeholder='Введите имя контакта'
        onChangeText={(search)=> fetchUsersSearch(search)}/>
        <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({item})=> (
          <TouchableOpacity onPress={() => props.navigation.navigate("Profile", {uid: item.id})} >
          <Text>
            {item.name}
          </Text>
          </TouchableOpacity>

        )}
        />
    </View>
  )
}