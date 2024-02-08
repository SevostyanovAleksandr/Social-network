import React, {useEffect, useState} from 'react'
import { View, Button,Text, Image, FlatList, StyleSheet, TouchableOpacity, ParsedText} from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore'; 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


function Feed(props) {
    const [posts, setPosts] = useState([]);

    const [isHeartRed, setIsHeartRed] = useState(false);

    const handlePress = () => {
      setIsHeartRed(!isHeartRed);}
      const onUsernamePress = (username, matchIndex) => {
        props.navigation.navigate("ProfileOther", { username, uid: undefined })
    }

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
                            <Text>{item.caption}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: "flex-end", margin: 12, paddingRight:"3%", paddingTop:"2%" }}>
                                <View style={{ marginRight: "5%"}}>
                            <TouchableOpacity
    onPress={() => props.navigation.navigate('Comment', { postId: item.id, uid: item.user.uid })}
>
<MaterialCommunityIcons name="comment-edit" size={30} />
</TouchableOpacity>
</View>
<View>
<TouchableOpacity onPress={handlePress}>
      <MaterialCommunityIcons
        name="cards-heart"
        size={30}
        color={isHeartRed ? 'red' : 'black'}
      />
    </TouchableOpacity>
      </View>
      </View>      
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
        marginEnd: 20,
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

    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1
    }, 
    containerInfo:{
        margin:0
    }, 
    containerComment: {
        backgroundColor: '#f0f0f0',
        padding: 0,
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
