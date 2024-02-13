import React, {useEffect, useState} from 'react'
import { View, Button,Text, Image, FlatList, StyleSheet, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore'; 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import InstaStory from 'react-native-insta-story';


function Feed(props, {item}) {
    const [posts, setPosts] = useState([]);
    const [isHeartRed, setIsHeartRed] = useState(false);
    const data = [
        {
          user_id: 1,
          user_image:
            'https://javasea.ru/uploads/posts/2020-02/1582015697_devushka-s-bolshimi-glazami-i-sirenevymi-volosami.jpg',
          user_name: 'Александр',
          stories: [
            {
              story_id: 1,
              story_image:
                'https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg',
              swipeText:'',
              onPress: () => console.log('story 1 swiped'),
            },
            {
              story_id: 2,
              story_image:
                'https://image.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-601.jpg',
            },
          ],
        },
        {
          user_id: 2,
          user_image:
            'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
          user_name: 'Test User',
          stories: [
            {
              story_id: 1,
              story_image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjORKvjcbMRGYPR3QIs3MofoWkD4wHzRd_eg&usqp=CAU',
              swipeText:'',
              onPress: () => console.log('story 1 swiped'),
            },
            {
              story_id: 2,
              story_image:
                'https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg',
              swipeText: '',
              onPress: () => console.log('story 2 swiped'),
            },
          ],
        },
        {
            user_id: 3,
            user_image:
              'https://android-obzor.com/wp-content/uploads/2022/03/jungon.full_.2160217-1660x2048-1-1245x1536.jpg',
            user_name: 'Игорь',
            stories: [
              {
                story_id: 1,
                story_image:
                  'https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg',
                swipeText:'',
                onPress: () => console.log('story 1 swiped'),
              },
              {
                story_id: 2,
                story_image:
                  'https://image.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-601.jpg',
              },
            ],
          },
          {
            user_id: 4,
            user_image:
              'https://darkazs.files.wordpress.com/2011/04/sleepy_programmer_by_veritude.jpg',
            user_name: 'Владислав',
            stories: [
              {
                story_id: 1,
                story_image:
                  'https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg',
                swipeText:'',
                onPress: () => console.log('story 1 swiped'),
              },
              {
                story_id: 2,
                story_image:
                  'https://image.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-601.jpg',
              },
            ],
          },
      ];
    const handlePress = () => {
      setIsHeartRed(!isHeartRed);}
      const onUsernamePress = (username, uid) => {
        props.navigation.navigate("Profile", { username, uid })
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
            <View style={{ flexDirection: "row", justifyContent: 'flex-end', margin:"2%" }}>
          
<View>
            <TouchableOpacity
            onPress={() => props.navigation.navigate("Search")}>
             <MaterialCommunityIcons name="magnify" size={37} />
          </TouchableOpacity>
          </View>
          <View>
  {props.currentUser && props.currentUser.image ? (
    <Image style={styles.avatarprofile} source={{ uri: props.currentUser.image }} />
  ) : (
    <Image style={styles.avatarprofile} source={require('../assets/avatar_user.png')} />
  )}
</View>
            </View>
            <InstaStory
  data={data}
  duration={10}
/>
        <View style={styles.containerGallery}>
            
            <FlatList
                numColumns={1}
                horizontal={false}
                data={posts}
                renderItem={({ item }) => (
                    <View style={styles.containerInfo}>
                        <View >
                            <TouchableOpacity  
                            style={{ flexDirection: 'row', alignItems: 'center' }}
                            onPress={() => onUsernamePress(item.user.name, item.user.uid)}>
                            <Image
                                style={styles.avatar}
                                source={{ uri: item.user.image }}
                            />
                            <Text style={styles.containerName}>{item.user.name}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.containerImage}>
                            <Image
                                style={styles.image}
                                source={{ uri: item.downloadURL }}
                                
                            />
                            <View style={{ marginHorizontal: "3%" }}>

                                <Text>
                                <Text style={{   
                                fontSize: 14,
                                fontWeight: 'bold', 
                                color: "black" }}>
                                    {item.caption}
                                    </Text>
                                </Text>
                                <Text
                                style={{ color:"grey" ,  fontSize: 12}}
                                >{new Date(item.creation.toDate()).toDateString()}</Text>
                                
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
        marginTop:"10%" 
    },
    containerImage: {
        flex: 1 / 3

    },
    containerGallery: {
        flex: 1
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
        flex: 1,
        aspectRatio: 1 / 1, 
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
    avatarprofile: {
        marginTop:"10%",
        marginLeft:"10%",
        width: 40,
        height: 40,
        borderRadius: 50,
        marginLeft: 10
      },

});

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    following: store.userState.following,
    users: store.usersState.users,
    usersFollowingLoaded: store.usersState.usersFollowingLoaded,
})

export default connect(mapStateToProps, null)(Feed);
