import React, {useEffect, useState} from 'react'
import { View, Button,Text, Image, FlatList, StyleSheet, TouchableOpacity, ParsedText} from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore'; 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';;






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
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                style={styles.avatar}
                                source={{ uri: item.user.image}}/>
                            
                            <Text style={styles.containerName}>{item.user.name}</Text>
                        </View>
                        <View style={styles.containerImage}>
                            <Image
                                style={styles.image}
                                source={{ uri: item.downloadURL }}
                            />
                            <View style= {{ marginHorizontal: "3%"}}>
                            <Text  style={{fontWeight: 'bold'}}>Просмотры 1</Text>
                            <Text style = {{color: "grey"}}>{item.caption}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', margin: 12, paddingRight: '3%', paddingTop: '2%' }}>
                            <View style={{ marginRight: '5%' }}>
                                <TouchableOpacity onPress={() => props.navigation.navigate('Comment', { postId: item.id, uid: item.user.uid })}>
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
        backgroundColor: 'white',
    },
    containerName: {
        marginTop: 10,
        marginHorizontal: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 17,
        margin: "1%"
    },
    image: {
        width: '100%',
        height:"64%",
        aspectRatio: 1,
        borderRadius: 10,
    },
    containerInfo: {
        marginVertical: 10,
    },
    containerComment: {
        backgroundColor: '#f0f0f0',
        padding: 5,
        borderRadius: 5,
        marginVertical: 5,
    },

});

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    following: store.userState.following,
    users: store.usersState.users,
    usersFollowingLoaded: store.usersState.usersFollowingLoaded,


})
export default connect(mapStateToProps, null)(Feed);
