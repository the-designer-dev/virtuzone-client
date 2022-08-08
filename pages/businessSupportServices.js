import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
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

export default function BusinessSupportServices({route, navigation}) {
  const [id, setId] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [allFiles, setAllFiles] = useState([
    {
      description:
        'Entrust your book keeping & payroll processes to our in-house team of accountants & ensure your numbers are 100% accurate & up-to-date.',
      name: 'Express Accounting',
    },
    {
      description:
        'Entrust your book keeping & payroll processes to our in-house team of accountants & ensure your numbers are 100% accurate & up-to-date.',
      name: 'Express Bank Account',
    },
    {
      description:
        'Entrust your book keeping & payroll processes to our in-house team of accountants & ensure your numbers are 100% accurate & up-to-date.',
      name: 'Express Copyright',
    },
    {
      description:
        'Entrust your book keeping & payroll processes to our in-house team of accountants & ensure your numbers are 100% accurate & up-to-date.',
      name: 'Express Design',
    },
    {
      description:
        'Entrust your book keeping & payroll processes to our in-house team of accountants & ensure your numbers are 100% accurate & up-to-date.',
      name: 'Express IT Support',
    },
    {
      description:
        'Entrust your book keeping & payroll processes to our in-house team of accountants & ensure your numbers are 100% accurate & up-to-date.',
      name: 'Express Mail',
    },
    {
      description:
        'Entrust your book keeping & payroll processes to our in-house team of accountants & ensure your numbers are 100% accurate & up-to-date.',
      name: 'Express Pro Services',
    },
  ]);

  useFocusEffect(
    React.useCallback(() => {
      async function func() {
        const id = await AsyncStorage.getItem('@id');
        setId(id);
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

  async function sendInquiry(name) {
    socket.emit(
      'recieveNotification',
      id,
      `Business Support Inquiry`,
      `requested for an inquiry regarding ${name}.`,
      new Date(),
    );
  }

  return (
    <LinearGradient
      colors={['#eedfe0', '#dbdcdc']}
      style={styles.gradientStyle}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}>
      <View style={{flex: 1, padding: 24}}>
        <SidebarLayout header={'Business Support'} />
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
            <ImageBackground
              source={require('../images/CardBG.jpg')}
              style={{
                marginVertical: 11,
                width: '100%',
                // height: '100%',
                borderRadius: 25,
                overflow: 'hidden',
              }}>
              <View
                style={{
                  paddingVertical: 11,
                  marginVertical: 11,
                  paddingHorizontal: 29,
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    flex: 1,
                    fontWeight: '600',
                    color: '#cf3339',
                  }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    flex: 1,
                    fontWeight: '600',
                    color: '#fff',
                    paddingVertical: 12,
                  }}>
                  {item.description}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    sendInquiry(item.name);
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: 48,
                      paddingVertical: 5,
                      borderRadius: 8,
                      marginTop: 10,
                      borderColor: '#cf3339',
                      borderWidth: 2,
                    }}>
                    <Text style={{color: '#fff'}}>Inquire</Text>
                    <Image source={require('../images/ArrowIcon.png')} />
                  </View>
                </TouchableOpacity>
              </View>
            </ImageBackground>
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
