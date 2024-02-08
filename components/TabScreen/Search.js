import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore'; 
import React, { useState } from 'react'

export default function Search(props) {
    const [users, setUsers] = useState([])

    const fetchUsers = (search) => {
        firebase.firestore()
            .collection('users')
            .where('name', '>=', search)
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
        <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder="Введите имя контакта..."
            onChangeText={(search) => fetchUsers(search)} />
    
        <FlatList
            style={styles.flatList}
            numColumns={1}
            horizontal={false}
            data={users}
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => props.navigation.navigate("Profile", {uid: item.id})}>
                    <Text style={styles.item}>{item.name}</Text>
                </TouchableOpacity>
            )}
        />
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    flatList: {
        flex: 1,
    },
    item: {
        padding: 10,
        fontSize: 16,
        backgroundColor: '#926EAE',
        marginVertical: 5,
        color: 'white',
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        width: 100, 

    },
});