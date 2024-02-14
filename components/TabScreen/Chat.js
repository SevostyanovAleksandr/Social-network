import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { Avatar } from 'react-native-elements';
import { auth, db } from '../firebase';
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore'; 
import { GiftedChat } from 'react-native-gifted-chat';
import GroupList from "../TabScreen/GroupList"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Chat = ({ navigation }) => {
    const [messages, setMessages] = useState([]);
    const [groups, setGroups] = useState([]);
    const [currentGroup, setCurrentGroup] = useState(null);
    const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');


    const signOutNow = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigation.replace('Login');
        }).catch((error) => {
            // An error happened.
        });
    };

    const createGroup = () => {
        const newGroup = {
            id: groups.length + 1,
            name: newGroupName,
            messages: [],
        };
        setGroups([...groups, newGroup]);
        setCurrentGroup(newGroup);
        setShowCreateGroupModal(false);
        setNewGroupName('');
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <Avatar
                        rounded
                        source={{
                            uri: auth?.currentUser?.image,
                        }}
                    />
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 10 }} onPress={signOutNow}>
                    <Text>logout</Text>
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://forumavatars.ru/img/avatars/0016/5f/70/92-1516436908.jpg',
                },
            },
        ]);
    }, []);

    const onSend = useCallback((newMessages = []) => {
        if (currentGroup) {
            const updatedGroups = groups.map((group) =>
                group.id === currentGroup.id
                    ? { ...group, messages: GiftedChat.append(group.messages, newMessages) }
                    : group
            );
            setGroups(updatedGroups);
        }
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    }, [currentGroup, groups]);

    const openCreateGroupModal = () => {
        setShowCreateGroupModal(true);
    };

    const navigateToChat = (groupId) => {
        const selectedGroup = groups.find(group => group.id === groupId);
        setCurrentGroup(selectedGroup);
        setMessages(selectedGroup.messages);
    };
    return (
        <View style={styles.container}>
            {showCreateGroupModal && (
                <View style={styles.createGroupContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Введите название группы"
                        value={newGroupName}
                        onChangeText={text => setNewGroupName(text)}
                    />
                    <TouchableOpacity  style={styles.createGroupButtoncreate} onPress={createGroup}>
                        <Text style={styles.buttonText}>Создать группу</Text>
                    </TouchableOpacity>
                </View>
            )}
            {!showCreateGroupModal && (
                <TouchableOpacity style={styles.createGroupButton} onPress={openCreateGroupModal}>
                   <MaterialCommunityIcons name="account-multiple-plus-outline" color={"black"} size={37} />
                </TouchableOpacity>
            )}
            <GiftedChat
                messages={messages}
                showAvatarForEveryMessage={true}
                onSend={messages => onSend(messages)}
                user={{
                    _id: auth?.currentUser?.email,
                    name: auth?.currentUser?.name,
                    avatar: auth?.currentUser?.image
                }}
            />
            <GroupList groups={groups} navigateToChat={navigateToChat} />
        </View>
    );
    
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: '#f0f0f0',
        marginTop:"5%"
    },
    createGroupContainer: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginBottom: 10,
        marginTop: "10%",
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
    },
    
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    createGroupButton: {
        marginTop:"10%",
        marginLeft:"83%"

    },
    createGroupButtoncreate: {
        alignItems:"center",
        justifyContent:"center",
        paddingVertical: 15,
        paddingHorizontal:10,
        borderRadius: 10,
        backgroundColor: '#926EAE',

    },
    createGroupButtonText: {
        color: 'white',
        textAlign: 'center',
    },
});
export default Chat;