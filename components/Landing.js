import React from 'react';
import { Text, View, Pressable, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { container, form } from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';
import Svg, { Image as SvgImage } from 'react-native-svg';

const windowHeight = Dimensions.get('window').height;

export default function Landing({ navigation }) {
  return (
   
    <View style={styles.container}>
    
     <LinearGradient
     colors={['rgb(185, 249, 244)', 'rgb(242, 213, 249)']}
     start={{ x: 0, y: 0 }}
     end={{ x: 1, y: 0 }}
     style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}

     >
         
      <View style={container.formCenter}>
        <Svg height="200" width="200">
     <SvgImage href={require('./assets/vconnect3.png')} height="200" width="200" />
   </Svg>
          <View style={{marginTop:"20%"}}>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Pressable style={styles.button}>
                <Text style={styles.text}>Регистрация</Text>
              </Pressable>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Pressable style={styles.button}>
                <Text style={styles.text}>Вход</Text>
              </Pressable>
            </TouchableOpacity>
          </View>
        </View>
        </LinearGradient>
    </View>
 
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  background: {
    
    flex: 1,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 12,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#926EAE',
    width: "100%", 
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
