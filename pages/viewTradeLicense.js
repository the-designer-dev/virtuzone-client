import {
  Animated,
  Dimensions,
  Easing,
  FlatList,
  Image,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import SidebarLayout from '../layouts/sidebarLayout';
import Pdf from 'react-native-pdf';
import ExpandableListItem from '../components/expandableListItem';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNFS from 'react-native-fs';
import {REACT_APP_BASE_URL} from '@env';
import RNFetchBlob from 'rn-fetch-blob';

export default function ViewDocuments({route, navigation}) {
  const [doc, setDoc] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [allFiles, setAllFiles] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      async function func() {
        const id = await AsyncStorage.getItem('@id');
        const token = await AsyncStorage.getItem('@jwt');
        const companyData = await axios({
          method: 'GET',
          url: `${REACT_APP_BASE_URL}/company?owner=${id}`,
        }).catch(err => console.log(err));

        const documents = await axios({
          method: 'GET',
          url: `${REACT_APP_BASE_URL}/tradelicense?company=${companyData.data.company[0]._id}`,
          headers: {
            'x-auth-token': token,
          },
        }).catch(err => console.log(err));
        var allFilesVar = [];
        for (const element of documents.data.tradeLicense[0].file) {
          allFilesVar.push({name: 'Trade License', file: element});
        }
        setAllFiles(allFilesVar);
      }
      func();
    }, []),
  );

  const displayDocument = async item => {
    // const token = await AsyncStorage.getItem('@jwt');
    // const file = await axios({
    //   method: 'GET',
    //   url: `${REACT_APP_BASE_URL}/files/${item}/true`,
    //   headers: {
    //     'x-auth-token': token,
    //   },
    // }).catch(err => console.log(err));

    // setDoc(`data:application/pdf;base64,${file.data}`);
    navigation.navigate('ViewDocument', {item: item});
  };

  const downloadDocument = async item => {
    const token = await AsyncStorage.getItem('@jwt');

    _downloadFile2 = async () => {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      }
    };
    _downloadFile2();
    let dirs = RNFetchBlob.fs.dirs;
    RNFetchBlob.config({
      // fileCache: true,
      // path: dirs.DocumentDir + '/' + item + '.pdf',
      fileCache: true,
      // by adding this option, the temp files will have a file extension
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          Platform.OS == 'ios'
            ? dirs.DocumentDir + '/' + item + '.pdf'
            : dirs.DownloadDir + '/' + item + '.pdf',
      },
    })
      .fetch('GET', `${REACT_APP_BASE_URL}/files/${item}/false`, {
        'x-auth-token': token,
      })

      .then(res => {
        // the temp file path

        console.log(res.path());
      })
      .catch(er => console.log(er));
  };

  return (
    <LinearGradient
      colors={['#eedfe0', '#dbdcdc']}
      style={styles.gradientStyle}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}>
      <View style={{flex: 1, padding: 24}}>
        <SidebarLayout header={'Trade License'} />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{alignItems: 'flex-start', paddingTop: 12}}>
          <Image
            style={{padding: 0, alignSelf: 'flex-start'}}
            source={require('../images/BackBlack.png')}
          />
        </TouchableOpacity>
        <FlatList
          style={{paddingTop: 12}}
          data={allFiles}
          renderItem={({item}) => (
            <ExpandableListItem navigation={navigation} item={item} />
          )}
        />
      </View>

      {doc && (
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
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientStyle: {
    width: '100%',
    height: '100%',
  },

  pdf: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
