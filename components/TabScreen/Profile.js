import React, {useEffect, useState} from 'react'
import { View, ImageBackground, Button,Text, Image, FlatList, StyleSheet, TouchableOpacity, Alert, Pressable} from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore'; 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


function Profile(props, {navigation}) {
    const [userPosts, setUserPosts] = useState([]);
    const [user, setUser] = useState(null);
    const [following, setFollowing] = useState(false) 
    const [activeTab, setActiveTab] = useState(1);
    const handleTabPress = (tabNumber) => {
      setActiveTab(tabNumber);
    };
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
        Alert.alert(
            'Выход',
            'Вы уверены, что хотите выйти?',
            [
                {
                    text: 'Отмена',
                    style: 'cancel',
                },
                {
                    text: 'Выйти',
                    onPress: () => firebase.auth().signOut(),
                },
            ],
            { cancelable: true }
        );
    };

    if (user === null) {
        return <View />
    }
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/profile section.png')} style={[styles.background]}>
            <TouchableOpacity style={{marginTop:"10%", marginLeft:"85%"}}
            onPress={() => onLogout()}>
             <MaterialCommunityIcons 
             name="exit-to-app"
             size={30} />
          </TouchableOpacity>
            
        <View style={styles.containerInfo}>
            <View tyle={styles.avatarprofileInfo}>
                <View>
            <Image style={styles.avatarprofile}
           
             
            source={{ uri: user.image}}/>
             </View>
             <View>
            <Text style = {{marginTop: " 5%", color :"grey"}} >{user.name}</Text>
            <Text style={{color:"grey"}} >{user.email}</Text>
            </View>
            </View>
            {props.route.params.uid !== firebase.auth().currentUser.uid ? (
                <View style={{flexDirection: 'row'}}>
                    {following ? (
                        <View style={styles.rowContainer}>
                                    <TouchableOpacity style={styles.button} onPress={() =>  onUnfollow()}>
                                      <Text style={styles.text}>Отписаться</Text>
                                  </TouchableOpacity>
                                      <TouchableOpacity style={styles.button} onPress={() =>  onFollow()}>
                                      <Text style={styles.text}>Написать</Text>
                                  </TouchableOpacity>
                                  </View>
                    ) :
                        (
                           <View style={styles.rowContainer}>
                            <TouchableOpacity style={styles.button} onPress={() =>  onFollow()}>
                            <Text style={styles.text}>Подписаться</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() =>  onFollow()}>
                                      <Text style={styles.text}>Написать</Text>
                                  </TouchableOpacity>
                        </View>
                        )}
                </View>
            ) :   
     
            <TouchableOpacity
            onPress={() => props.navigation.navigate("ProfileSettings")}>
             <MaterialCommunityIcons name="account-edit" size={30} />
          </TouchableOpacity>
          
        }
        </View>
        <View style={{ height: 1, backgroundColor: 'grey',}} />
        <View style={styles.tabsContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 1 && styles.activeTab]}
        onPress={() => handleTabPress(1)}
      >
        <Text style={styles.tabText}>Всё</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 2 && styles.activeTab]}
        onPress={() => handleTabPress(2)}
      >
        <Text style={styles.tabText}>Фото</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 3 && styles.activeTab]}
        onPress={() => handleTabPress(3)}
      >
        <Text style={styles.tabText}>Видео</Text>
      </TouchableOpacity>
    </View>
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
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around', // Выравнивание элементов по горизонтали
        alignItems: 'center', // Выравнивание элементов по вертикали
        marginVertical: 1, // Вертикальный отступ между элементами
    },
    avatarprofileInfo :{
    },
    background: {
        flex: 1,
      },
    containerInfo: {
        alignItems:"center",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
        marginTop:"10%"
    },
    rowContainerScrenn:{
        flexDirection: 'row',
        justifyContent: 'space-around', // Выравнивание элементов по горизонтали
        alignItems: 'center', // Выравнивание элементов по вертикали
        marginVertical: 9, // Вертикальный отступ между элементами
        marginHorizontal:"10%",
    },
    containerGallery: {
        flex: 1,
        margin: 1
    },
    containerImage: {
        flex: 1 / 2,
        aspectRatio: 1 / 1,
        borderRadius: 12,
        margin:1
    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1,
        borderRadius: 12,
        overflow: 'hidden',
    },
    avatarprofile: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginLeft: 10
      },
      button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 5,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: '#926EAE',
        width: "40%",
        marginBottom:3 
      },
      text: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
      tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#f0f0f0',
        padding: 8,
      },
      tab: {
        padding: 10,
      },
      activeTab: {
        backgroundColor: '#926EAE',
        borderRadius: 10,
      },
      tabText: {
        color: '#333',
        fontWeight: 'bold',
      },
});
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts,
    following: store.userState.following
})
export default connect(mapStateToProps, null)(Profile);