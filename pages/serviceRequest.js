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
import RNFetchBlob from 'react-native-fetch-blob';
import {PermissionsAndroid, Platform} from 'react-native';
import {REACT_APP_BASE_URL} from '@env';

export default function ServiceRequest({route, navigation}) {
  const [doc, setDoc] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [allFiles, setAllFiles] = useState([
    {name: 'Salary Certificate'},
    {name: 'Request UAE Visa'},
    {name: 'License Amendment'},
    {name: 'License Renewal'},
    {name: 'UAE Visa Renewal'},
  ]);

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
      <View style={{flex: 1, padding: 24}}>
        <SidebarLayout
          header={'Express PRO FZ LLC'}
          subheader={'Last Login:'}
        />

        <FlatList
          style={{paddingTop: 24}}
          data={allFiles}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => {}}>
              <View
                style={{
                  paddingVertical: 11,
                  marginVertical: 11,
                  paddingHorizontal: 29,
                  backgroundColor: '#cf3339',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    flex: 1,
                    fontWeight: '600',
                    color: '#fff',
                  }}>
                  {item.name}
                </Text>
                <Image
                  // style={{transform: [{rotate: '90deg'}]}}
                  source={require('../images/ArrowIcon.png')}
                />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
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
