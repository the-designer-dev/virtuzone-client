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
import React, { useState } from 'react';

import LinearGradient from 'react-native-linear-gradient';
import SidebarLayout from '../layouts/sidebarLayout';
import Pdf from 'react-native-pdf';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { REACT_APP_BASE_URL } from '@env';
import ExpandableListItem from '../components/expandableListItem';
// import RNFetchBlob from 'rn-fetch-blob';
const { width: PAGE_WIDTH, height: PAGE_HEIGHT } = Dimensions.get('window');

export default function ViewDocuments({ route, navigation }) {
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
        console.log(documents.data);
        for (const element of documents.data.incorporationCertificate) {
          element.length > 0 &&
            allFilesVar.push({
              name: 'Incorporation Certificate',
              file: element,
            });
        }
        for (const element of documents.data.establishmentCard) {
          element.length > 0 &&
            allFilesVar.push({
              name: 'Establishment Card',
              file: element,
            });
        }

        for (const element of documents.data.articlesOfIncorporation) {
          element.length > 0 &&
            allFilesVar.push({
              name: 'Articles of Incorporation',
              file: element,
            });
        }

        for (const element of documents.data.agreements) {
          element.length > 0 &&
            allFilesVar.push({
              name: 'Office Lease Agreement',
              file: element,
            });
        }

        for (const element of documents.data.shareCertificate) {
          element.length > 0 &&
            allFilesVar.push({ name: 'Share Certificate', file: element });
        }

        for (const element of documents.data.immigrationCard) {
          element.length > 0 &&
            allFilesVar.push({ name: 'Immigration Card', file: element });
        }
        setAllFiles(allFilesVar);
      }
      func();

      console.log(allFiles)
    }, []),
  );

  return (
    <LinearGradient
      colors={['#eedfe0', '#dbdcdc']}
      style={styles.gradientStyle}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 24 }}>
          <SidebarLayout header={'Incorporation Documents'} />
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', paddingTop: 12 }}>

            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ alignItems: 'flex-start' }}>
              <Image
                style={{ padding: 0, alignSelf: 'flex-start' }}
                source={require('../images/BackBlack.png')}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                color: '#222222',
                textAlign: 'center',
                width: PAGE_WIDTH - 125
              }}>
              Incorporation Documents</Text>
          </View>
          <FlatList
            style={{ paddingTop: 12 }}
            data={allFiles}
            renderItem={({ item }) => (
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
