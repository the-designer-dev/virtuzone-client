import {
  Dimensions,
  FlatList,
  Image,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Pdf from 'react-native-pdf';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import { REACT_APP_BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ViewDocuments({ route, navigation }) {
  const [doc, setDoc] = useState();
  const [allFiles, setAllFiles] = useState([]);
  const [image, setImage] = useState(null);
  const { item } = route.params;
  useFocusEffect(
    React.useCallback(() => {
      const displayDocument = async item => {
        const token = await AsyncStorage.getItem('@jwt');
        // const file = await axios({
        //   method: 'GET',
        //   url: `${REACT_APP_BASE_URL}/files/${item}/true`,
        //   headers: {
        //     'x-auth-token': token,
        //   },
        // }).catch(err => console.log(err));
        // console.log(file.headers['content-type'].split(';')[0]);
        // if (file.headers['content-type'].split(';')[0].includes('image')) {
        //   setImage(true);

        //   setDoc(`data:${file.headers['content-type']};base64,${file.data}`);
        // } else {
        console.log(item)
        setImage(false);
        setDoc(item);
        // }
      };

      displayDocument(item);
    }, []),
  );

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ alignItems: 'flex-start', flex: 1 }}>
          <Image
            resizeMode="contain"
            style={{
              height: 25,
              width: 25,
              padding: 24,
              alignSelf: 'flex-start',
            }}
            source={require('../images/BackBlack.png')}
          />
        </TouchableOpacity>

        {doc &&
          (image === true ? (
            <Image
              source={{ uri: doc }}
              resizeMode="contain"
              style={{
                width: '100%',
                height: '90%',
              }}
            />
          ) : (
            <Pdf
              trustAllCerts={false}
              source={{
                uri: doc,
                cache: true,
              }}
              onLoadComplete={(numberOfPages, filePath) => {
                console.log(`Number of pages: ${numberOfPages}`);
              }}
              onPageChanged={(page, numberOfPages) => {
                console.log(`Current page: ${page}`);
              }}
              onError={error => {
                console.log(error);
              }}
              onPressLink={uri => {
                console.log(`Link pressed: ${uri}`);
              }}
              style={styles.pdf}
            />
          ))}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  gradientStyle: {
    width: '100%',
    height: '100%',
  },

  pdf: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 100,
  },
});
