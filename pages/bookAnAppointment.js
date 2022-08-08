import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import SidebarLayout from '../layouts/sidebarLayout';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNFS from 'react-native-fs';
import {PermissionsAndroid, Platform} from 'react-native';
import {REACT_APP_BASE_URL} from '@env';
import {socket} from '../sockets/socketConfig';

const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');

export default function BookAnAppointment({route, navigation}) {
  const [id, setId] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [allFiles, setAllFiles] = useState([
    {
      image: require('../images/1.png'),
      name: 'Saif Khan',
      languages: 'English - Urdu - Hindi',
    },
    {
      image: require('../images/2.png'),
      name: 'Zamir Khan',
      languages: 'English - Urdu - Hindi',
    },
    {
      image: require('../images/3.png'),
      name: 'Jean Clair Punzalan',
      languages: 'English - Filipino',
    },
    {
      image: require('../images/4.png'),
      name: 'Sonia Ashraf',
      languages: 'English - Filipino',
    },
    {
      image: require('../images/5.png'),
      name: 'Samia Eman',
      languages: 'English - Arabic',
    },
    {
      image: require('../images/6.png'),
      name: 'Ryan Gonalez',
      languages: 'English - Urdu - Hindi',
    },
  ]);

  async function sendInquiry(name) {
    socket.emit(
      'recieveNotification',
      id,
      `Appointment Booking`,
      `Booked an appointment for ${name}.`,
      new Date(),
    );
    setModalVisible(true);
  }

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

  return (
    <LinearGradient
      colors={['#eedfe0', '#dbdcdc']}
      style={styles.gradientStyle}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}>
      <View style={{flex: 1, padding: 24}}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View
            style={[
              styles.centeredView,
              modalVisible ? {backgroundColor: 'rgba(0,0,0,0.5)'} : '',
            ]}>
            <View style={styles.modalView}>
              <Image
                style={{width: 150, height: 150}}
                resizeMode="contain"
                source={require('../images/Icon.png')}
              />

              <Text
                style={{
                  paddingTop: 31,
                  fontSize: 24,
                  fontWeight: '500',
                  color: '#1A8E2D',
                  textAlign: 'center',
                }}>
                Request Submitted
              </Text>
              <Text
                style={{
                  paddingTop: 10,
                  fontSize: 15,
                  fontWeight: '500',
                  color: '#000',
                  textAlign: 'center',
                }}>
                Thank you for your inquiry. The consultant of your choice will
                be in touch shortly.
              </Text>
              <Pressable
                style={[styles.doneButton]}
                onPress={() => navigation.goBack()}>
                <Text style={{color: '#FFF', fontSize: 17, fontWeight: '700'}}>
                  Done
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <SidebarLayout header={'Book An Appointment'} />
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
                width: (PAGE_WIDTH - 86) / 2,
                paddingTop: 14,
                marginVertical: 11,
                marginLeft: 14,
                // paddingHorizontal: 25,
                overflow: 'hidden',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 16,
                backgroundColor: '#fff',
              }}>
              <Image style={{borderRadius: 1000}} source={item.image} />
              <Text
                style={{
                  fontSize: 14,
                  flex: 1,
                  paddingTop: 11,
                  fontWeight: '600',
                  color: '#cf3339',
                }}>
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  flex: 1,
                  fontWeight: '600',
                  color: '#000',
                }}>
                {item.languages}
              </Text>
              <TouchableOpacity
                style={{width: '100%'}}
                onPress={() => sendInquiry(item.name)}>
                <View
                  style={{
                    backgroundColor: '#cf3339',
                    marginTop: 11,
                    paddingVertical: 9,
                    width: '100%',
                  }}>
                  <Text
                    style={{fontSize: 14, color: '#fff', textAlign: 'center'}}>
                    Book Now
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  doneButton: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 50,
    paddingVertical: 16,
    borderRadius: 10,
    backgroundColor: '#000',
    marginTop: 40,
    marginBottom: 16,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
