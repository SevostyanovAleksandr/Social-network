import React from 'react';
import { Text, View, Pressable, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { container, form } from './styles';

const windowHeight = Dimensions.get('window').height;

export default function Landing({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./Image/twoo.jpg')} style={[styles.background, { height: windowHeight / 1.3}]}>
      <View style={container.formCenter}>
          <View style={{marginTop:"40%"}}>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Pressable style={styles.button}>
                <Text style={styles.text}>Регистрация</Text>
              </Pressable>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Pressable style={styles.button}>
                <Text style={styles.text}>Логин</Text>
              </Pressable>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
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
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 18,
    elevation: 3,
    backgroundColor: '#926EAE',
    width: 180, 
    marginLeft:"20%"
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
