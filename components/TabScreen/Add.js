import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Save from '../Save';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function App({navigation}) {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
/*
Этот блок кода использует хук useEffect для выполнения побочных эффектов. 
В данном случае, при монтировании компонента происходит запрос разрешений на использование камеры и галереи. 
Результаты запросов сохраняются в состояниях hasCameraPermission и hasGalleryPermission.
*/
  useEffect(() => {
    (async () => {
      const cameraStatus  = await Camera.requestCameraPermissionsAsync();

      setHasCameraPermission(cameraStatus.status === 'granted');

      const galleryStatus = await ImagePicker.useCameraPermissions();
      setHasGalleryPermission(galleryStatus.status === 'granted');
      

    })();
  }, []);
// Функци takePicture и pickImage используются для снятия фотографии с камеры и выбора изображения из галереи соответственно
const takePicture = async () => {
  if (camera) {
    const data = await camera.takePictureAsync(null);
    setImage(data.uri);
  }
}

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  //Здесь происходит проверка разрешений на использование камеры и галереи. Если разрешения не установлены, возвращается пустой View или текст "Нет разраешения к использованию камеры".
  if (hasCameraPermission === null || hasGalleryPermission === false) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>Нет разраешения к использованию камеры</Text>;
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#000',}}>
    <View style={styles.cameraContainer}>
      <Camera
        ref={ref => setCamera(ref)}
        style={styles.fixedRatio}
        type={type}
        ratio={'1:1'} />
    </View>
    {image && (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={{ uri: image }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
      </View>
    )}
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', margin: 30 }}>  
    <View >
      <TouchableOpacity
        style={{ backgroundColor: '#fff', padding: 10, borderRadius: 50 }}
        onPress={() => pickImage()}>
         <MaterialCommunityIcons name="file-image" size={26} />
      </TouchableOpacity>
      </View>
      <View style={{marginLeft:30}}>
      <TouchableOpacity
        style={{ backgroundColor: '#fff', padding: 10, borderRadius: 50 }}
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}>
         <MaterialCommunityIcons name="camera-flip" size={26} />
      </TouchableOpacity>
      </View>
      <View style={{marginLeft:30}}>
      <TouchableOpacity
        style={{ backgroundColor: '#fff', padding: 10, borderRadius: 50 }}
        onPress={() => takePicture()}>
           <MaterialCommunityIcons name="camera-iris" size={26} />
      </TouchableOpacity>
      </View>
      <View style={{marginLeft:30}}>
      <TouchableOpacity
        style={{ backgroundColor: '#fff', padding: 10, borderRadius: 50 }}
        onPress={() => navigation.navigate('Save', { image })}>
         <MaterialCommunityIcons name="content-save" size={26} />
      </TouchableOpacity>
      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',

  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1
  }

})