import {
  Dimensions,
  FlatList,
  Image,
  PermissionsAndroid,
  Platform,
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

import {REACT_APP_BASE_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNFS from 'react-native-fs';
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
        console.log(companyData.data.company[0]._id);
        const documents = await axios({
          method: 'GET',
          url: `${REACT_APP_BASE_URL}/visa?company=${companyData.data.company[0]._id}`,
          headers: {
            'x-auth-token': token,
          },
        }).catch(err => console.log(err));
        console.log(documents.data);
        var allFilesVar = [];

        for (const element of documents.data.visa[0].entryPermit) {
          allFilesVar.push({name: 'Entry Permit', file: element});
        }
        for (const element of documents.data.visa[0].passport) {
          allFilesVar.push({name: 'Passport', file: element});
        }
        for (const element of documents.data.visa[0].residencyVisa) {
          allFilesVar.push({name: 'Residency Visa', file: element});
        }
        for (const element of documents.data.visa[0].emiratesId) {
          allFilesVar.push({name: 'Emirates Id', file: element});
        }
        setAllFiles(allFilesVar);
      }

      func();
    }, []),
  );

  const displayDocument = async item => {
    const token = await AsyncStorage.getItem('@jwt');
    const file = await axios({
      method: 'GET',
      url: `${REACT_APP_BASE_URL}/files/${item}/true`,
      headers: {
        'x-auth-token': token,
      },
    }).catch(err => console.log(err));

    setDoc(`data:application/pdf;base64,${file.data}`);
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
        <SidebarLayout header={'UAE Visas'} />
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
            <View
              style={{
                flexDirection: 'column',
                marginVertical: 11,
              }}>
              <View
                style={{
                  paddingVertical: 11,
                  paddingHorizontal: 29,
                  backgroundColor: '#fff',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    flex: 1,
                    fontWeight: '600',
                    color: '#000',
                  }}>
                  {item.name}
                </Text>
                <Image
                  // style={{transform: [{rotate: '90deg'}]}}
                  source={require('../images/ViewBlack.png')}
                />
              </View>
              <View
                style={{
                  backgroundColor: '#cf3339',
                  // paddingHorizontal: 28,
                  paddingVertical: 6,
                  borderBottomRightRadius: 16,
                  borderBottomLeftRadius: 16,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                <TouchableOpacity
                  style={{flex: 1}}
                  onPress={() => displayDocument(item.file)}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image source={require('../images/View.png')} />
                    <Text
                      style={{
                        fontWeight: '500',
                        fontSize: 14,
                        color: '#fff',
                        paddingLeft: 10,
                      }}>
                      View
                    </Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image source={require('../images/Line.png')} />
                </View>
                <TouchableOpacity
                  style={{flex: 1}}
                  onPress={() => downloadDocument(item.file)}>
                  <View
                    style={{
                      flex: 1,

                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image source={require('../images/Download.png')} />
                    <Text
                      style={{
                        fontWeight: '500',
                        fontSize: 14,
                        color: '#fff',
                        paddingLeft: 10,
                      }}>
                      Download
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
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
