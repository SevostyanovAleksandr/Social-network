import React, {useEffect, useState} from 'react'
import { View, ImageBackground, Button,Text, Image, FlatList, StyleSheet, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore'; 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileSettings from '../ProfileSettings'


function Profile(props, {navigation}) {
    const [userPosts, setUserPosts] = useState([]);
    const [user, setUser] = useState(null);
    const [following, setFollowing] = useState(false)
 

    useEffect(() => {
        const { currentUser, posts } = props;

        if (props.route.params.uid === firebase.auth().currentUser.uid) {
            setUser(currentUser)
            setUserPosts(posts)
        }
        else {
            firebase.firestore()
                .collection("users")
                .doc(props.route.params.uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        setUser(snapshot.data());
                    }
                    else {
                        console.log('does not exist')
                    }
                })
            firebase.firestore()
                .collection("posts")
                .doc(props.route.params.uid)
                .collection("userPosts")
                .orderBy("creation", "asc")
                .get()
                .then((snapshot) => {
                    let posts = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    })
                    setUserPosts(posts)
                })
        }

        if (props.following.indexOf(props.route.params.uid) > -1) {
            setFollowing(true);
        } else {
            setFollowing(false);
        }
    }, [props.route.params.uid, props.following])
       
    const onFollow = () => {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .doc(props.route.params.uid)
            .set({})
    }
    const onUnfollow = () => {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .doc(props.route.params.uid)
            .delete()
    }
    const onLogout = () => {
        firebase.auth().signOut();
    }

    if (user === null) {
        return <View />
    }
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/profile section.png')} style={[styles.background]}>
        <View style={styles.containerInfo}>
            <View tyle={styles.avatarprofileInfo}>
                <View>
            <Image style={styles.avatarprofile}
           
             
            source={{ uri: user.image}}/>
             </View>
             <View style={{marginLeft:"10%"}}>
            <Text >{user.name}</Text>
            <Text>{user.email}</Text>
            </View>
            </View>
            {props.route.params.uid !== firebase.auth().currentUser.uid ? (
                <View>
                    {following ? (
                        <Button
                            title="Отписаться"
                            onPress={() => onUnfollow()}
                        />
                    ) :
                        (
                            <Button
                                title="Подписаться"
                                onPress={() => onFollow()}
                            />
                        )}
                </View>
            ) :   
            <TouchableOpacity
            style={{ padding: 10, borderRadius: 50, marginLeft: "30%" }}
            onPress={() => onLogout()}>
             <MaterialCommunityIcons 
             name="exit-to-app"
             size={30} />
          </TouchableOpacity>
        }
            
      <TouchableOpacity
        style={{ padding: 10, borderRadius: 50, marginLeft: "3%"}}
        onPress={() => props.navigation.navigate("ProfileSettings")}>
         <MaterialCommunityIcons name="account-edit" size={30} />
      </TouchableOpacity>
        </View>
        <View style={{ height: 1, backgroundColor: 'grey', marginBottom: 10 }} />
        <View style={styles.containerGallery}>
            <FlatList
                numColumns={2}
                horizontal={false}
                data={userPosts}
                renderItem={({ item }) => (
                    <View style={styles.containerImage}>
                        <Image
                            style={styles.image}
                            source={{ uri: item.downloadURL }}
                        />
                    </View>
                )}
            />
        </View>
        </ImageBackground>
    </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatarprofileInfo :{
        flexDirection: 'row',
        alignItems: "center",
        justifyContent:"center"
    },
    background: {
        flex: 1,
      },
    containerInfo: {
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    
    containerGallery: {
        flex: 1,
    },
    
    
    containerImage: {
        flex: 1 / 2,
        aspectRatio: 1 / 1,
        margin: 1,
        borderRadius: 10,
    },
    
    image: {
        flex: 1,
        aspectRatio: 1 / 1,
        borderRadius: 10,
        overflow: 'hidden',
    },
    avatarprofile: {
        width: 70,
        height: 70,
        borderRadius: 50,
        margin:"5%"
      },
});
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts,
    following: store.userState.following
})
export default connect(mapStateToProps, null)(Profile);