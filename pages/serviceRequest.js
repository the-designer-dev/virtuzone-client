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
import {PermissionsAndroid, Platform} from 'react-native';
import {REACT_APP_BASE_URL} from '@env';

const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');

export default function ServiceRequest({route, navigation}) {
  const [doc, setDoc] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [allFiles, setAllFiles] = useState([
    {image: require('../images/license.png'), name: 'Salary Certificate'},
    {image: require('../images/passport.png'), name: 'Request UAE Visa'},
    {image: require('../images/documents.png'), name: 'License Amendment'},
    {image: require('../images/repeat.png'), name: 'License Renewal'},
    {image: require('../images/repeat.png'), name: 'UAE Visa Renewal'},
  ]);

  async function sendInquiry(name) {
    socket.emit(
      'recieveNotification',
      id,
      `Service Request Inquiry`,
      `requested for an inquiry regarding ${name}.`,
      new Date(),
    );
  }

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
        <SidebarLayout header={'Service Request'} />
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
            <TouchableOpacity onPress={() => sendInquiry(item.name)}>
              <View
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 16,
                  borderWidth: 2,
                  borderColor: '#cf3339',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 4.65,

                  elevation: 8,
                  width: (PAGE_WIDTH - 86) / 2,
                  marginLeft: 14,
                  marginBottom: 14,
                  paddingBottom: 17,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    marginHorizontal: 47,
                    marginVertical: 17,
                  }}
                  source={item.image}
                />
                <Text style={{fontWeight: '700', fontSize: 14, color: '#000'}}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          numColumns={2}
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
