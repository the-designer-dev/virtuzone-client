import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
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

import {REACT_APP_BASE_URL} from '@env';
import ExpandableListItem from '../components/expandableListItem';
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
        // console.log(companyData);
        const documents = await axios({
          method: 'GET',
          url: `${REACT_APP_BASE_URL}/companydocs?company=${companyData.data.company[0]._id}`,
          headers: {
            'x-auth-token': token,
          },
        }).catch(err => console.log(err));
        var allFilesVar = [];
        console.log(documents.data.agreements);
        for (const element of documents.data.incorporationCertificate) {
          element.file.length > 0 &&
            allFilesVar.push({
              name: 'Incorporation Certificate',
              file: element.file,
            });
        }
        for (const element of documents.data.establishmentCard) {
          element.file.length > 0 &&
            allFilesVar.push({
              name: 'Establishment Card',
              file: element.file,
            });
        }

        for (const element of documents.data.articlesOfIncorporation) {
          element.file.length > 0 &&
            allFilesVar.push({
              name: 'Articles of Incorporation',
              file: element.file,
            });
        }

        for (const element of documents.data.agreements) {
          element.file.length > 0 &&
            allFilesVar.push({
              name: 'Office Lease Agreement',
              file: element.file,
            });
        }

        for (const element of documents.data.shareCertificate) {
          element.file.length > 0 &&
            allFilesVar.push({name: 'Share Certificate', file: element.file});
        }

        for (const element of documents.data.immigrationCard) {
          element.file.length > 0 &&
            allFilesVar.push({name: 'Immigration Card', file: element.file});
        }
        setAllFiles(allFilesVar);
      }
      func();
    }, []),
  );

  return (
    <LinearGradient
      colors={['#eedfe0', '#dbdcdc']}
      style={styles.gradientStyle}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}>
      <SafeAreaView style={{flex: 1}}>
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
      </SafeAreaView>
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
