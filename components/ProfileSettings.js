import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';

const ProfileSettings = () => {
    const [birthday, setBirthday] = useState('01.01.2000');
    const [city, setCity] = useState('Москва');
    const [languages, setLanguages] = useState('Русский');
    const [university, setUniversity] = useState('');
    const [school, setSchool] = useState('');
    const [politics, setPolitics] = useState('');
    const [smoking, setSmoking] = useState('');
    const [image,setImage] = useState(require('./Image/avatar.jpg'));

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log("Avatar теперь", result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };


    const handleSave = () => {
        // Добавьте здесь логику для сохранения изменений
        console.log('Изменения сохранены', avatar);
    };
  
    return (
        <View style={styles.container}>
            <View style={styles.avatarContainer}>
              <TouchableOpacity 
              onPress={() => pickImage()}
              style={styles.button}>
                <Text style={styles.text}>Загрузить аватарку</Text>
              </TouchableOpacity>
      {image && <Image source={{ uri: image }}  style={styles.avatar} />}
    </View>
            <Text style={styles.sectionTitle}>Основная информация</Text>
        <View style={styles.inputContainer}>
          <Icon name="calendar" size={20} color="#6A5ACD" />
          <TextInput style={styles.input} value={birthday} onChangeText={setBirthday} />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="map-marker" size={20} color="#6A5ACD" />
          <TextInput style={styles.input} value={city} onChangeText={setCity} />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="language" size={20} color="#6A5ACD" />
          <TextInput style={styles.input} value={languages} onChangeText={setLanguages} />
        </View>
  
        <Text style={styles.sectionTitle}>Образование</Text>
        <View style={styles.inputContainer}>
          <Icon name="university" size={20} color="#6A5ACD" />
          <TextInput style={styles.input} value={university} onChangeText={setUniversity} />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="graduation-cap" size={20} color="#6A5ACD" />
          <TextInput style={styles.input} value={school} onChangeText={setSchool} />
        </View>
  
        <Text style={styles.sectionTitle}>Личная информация</Text>
        <View style={styles.inputContainer}>
          <Icon name="balance-scale" size={20} color="#6A5ACD" />
          <TextInput style={styles.input} value={politics} onChangeText={setPolitics} />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="coffee" size={20} color="#6A5ACD" />
          <TextInput style={styles.input} value={smoking} onChangeText={setSmoking} />
        </View>
  
        <Button title="Сохранить изменения" onPress={handleSave} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#262626',
      marginTop: 20,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#DBDBDB',
      paddingVertical: 10,
    },
    input: {
      flex: 1,
      paddingVertical: 5,
      paddingLeft: 10,
      color: '#262626',
      fontSize: 16,
    },
    avatarContainer: {
        flexDirection: "row-reverse",
        alignItems: 'center',
        justifyContent: "space-around",
        marginBottom: 10,
      },
      avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 10,
      },
      button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: '#926EAE',
        marginLeft: "10%",

      },
      text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
  });
  export default ProfileSettings;