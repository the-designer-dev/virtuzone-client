import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import LinearGradient from 'react-native-linear-gradient';
import SidebarLayout from '../layouts/sidebarLayout';
import Pdf from 'react-native-pdf';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import {PermissionsAndroid, Platform} from 'react-native';
import {REACT_APP_BASE_URL} from '@env';
import ExpandableListItem from '../components/expandableListItem';

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
        // console.log(companyData);
        const documents = await axios({
          method: 'GET',
          url: `${REACT_APP_BASE_URL}/companydocs?company=${companyData.data.company[0]._id}`,
          headers: {
            'x-auth-token': token,
          },
        }).catch(err => console.log(err));
        // console.log(documents.data);
        var allFilesVar = [];
        for (const element of documents.data.incorporationCertificate) {
          allFilesVar.push({
            name: 'Incorporation Certificate',
            file: element.file,
          });
        }

        for (const element of documents.data.articlesOfIncorporation) {
          allFilesVar.push({
            name: 'Articles Of Incorporation',
            file: element.file,
          });
        }

        for (const element of documents.data.agreements) {
          allFilesVar.push({
            name: 'Office Lease Agreement',
            file: element.file,
          });
        }

        for (const element of documents.data.shareCertificate) {
          allFilesVar.push({name: 'Share Certificate', file: element.file});
        }

        for (const element of documents.data.immigrationCard) {
          allFilesVar.push({name: 'Immigration Card', file: element.file});
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
    console.log(item);

    const _downloadFile2 = async () => {
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
        <SidebarLayout header={'Incorporation Documents'} />
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
