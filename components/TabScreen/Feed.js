import React, {useEffect, useState} from 'react'
import { View, Button,Text, Image, FlatList, StyleSheet, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore'; 

function Feed(props) {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        let posts = [];
        if (props.usersFollowingLoaded == props.following.length) {
            for (let i = 0; i < props.following.length; i++) {
                const user = props.users.find(el => el.uid === props.following[i]);
                if (user != undefined) {
                    posts = [...posts, ...user.posts];
                }
            }

            posts.sort(function (x, y) {
                return x.creation - y.creation;
            })

            setPosts(posts);
        }

    }, [props.usersFollowingLoaded])

    return (
        <View style={styles.container}>
            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={posts}
                    renderItem={({ item }) => (
                        <View style={styles.containerInfo}>
                            <Text style={styles.containerName}>{item.user.name}</Text>
                            <View  style={styles.containerImage}>
                            <Image
                                style={styles.image}
                                source={{ uri: item.downloadURL }}
                            />
                            </View>
                            <TouchableOpacity
    style={styles.containerComment}
    onPress={() => props.navigation.navigate('Comment', { postId: item.id, uid: item.user.uid })}
>
    <Text style={styles.commentText}>введите комментарий...</Text>
</TouchableOpacity>
                                
                        </View>

                    )}

                />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerName: {
        marginTop: 10, 
        marginEnd: 30,
        marginLeft:10,
    // Имя файла шрифта без расширения
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    },
    containerGallery: {
        flex: 1
    },
    containerImage: {
        flex: 1 / 3,
        borderRadius: 10, // Произвольное значение для закругления углов
        overflow: 'hidden', // Обрезаем изображение по границам контейнера
        marginHorizontal: 1

    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1
    }, 
    containerInfo:{
        margin:1
    }, 
    containerComment: {
        backgroundColor: '#f0f0f0',
        padding: 20,
        borderRadius: 5,
        marginVertical: 1,
    },
    commentText: {
        color: 'blue',
        fontWeight: 'bold'
    }
})
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    following: store.userState.following,
    users: store.usersState.users,
    usersFollowingLoaded: store.usersState.usersFollowingLoaded,


})
export default connect(mapStateToProps, null)(Feed);
