import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  SafeAreaView,
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
import {socket} from '../sockets/socketConfig';
import Lottie from 'lottie-react-native';

const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');

export default function ServiceRequest({route, navigation}) {
  const [doc, setDoc] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [allFiles, setAllFiles] = useState([
    {
      image: require('../images/salaryCertificateServices.png'),
      name: 'Salary Certificate',
    },
    {image: require('../images/visaServices.png'), name: 'Request UAE Visa'},
    {
      image: require('../images/licenseAmmendmentServices.png'),
      name: 'License Amendment',
    },
    {
      image: require('../images/licenseRenewalServices.png'),
      name: 'License Renewal',
    },
    {
      image: require('../images/visaRenewalServices.png'),
      name: 'UAE Visa Renewal',
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  async function sendInquiry(name) {
    socket.emit(
      'recieveNotification',
      id,
      `Business Support Inquiry`,
      `requested for an inquiry regarding ${name}.`,
      new Date(),
    );
    setModalVisible(true);
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
            {/* <Image
              style={{width: 150, height: 150}}
              resizeMode="contain"
              source={require('../images/Icon.png')}
            /> */}

<Lottie
      resizeMode="cover"
      style={{
        width: 150,
        // height: '100%',
      }}
      source={require('../images/success_lottie.json')}
      loop={false}
      autoPlay
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
              Thank you for submitting your request. Someone from our team will
              contact you soon.
            </Text>
            <Pressable
              style={[styles.doneButton]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={{color: '#FFF', fontSize: 17, fontWeight: '700'}}>
                Done
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, padding: 24}}>
          <SidebarLayout header={'Service Request'} />
          <View style={{flexDirection:'row' , alignItems:'center' ,width:'100%' , paddingTop:12}}>

<TouchableOpacity
  onPress={() => navigation.goBack()}
  style={{alignItems: 'flex-start'}}>
  <Image
    style={{padding: 0, alignSelf: 'flex-start'}}
    source={require('../images/BackBlack.png')}
  />
</TouchableOpacity>
<Text
style={{
  fontSize: 20,
  fontWeight: '700',
  color: '#222222',
  textAlign: 'center',
  width:PAGE_WIDTH-125
}}>
Service Request</Text>
</View>
          <FlatList
            style={{paddingTop: 12}}
            data={allFiles}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => sendInquiry(item.name)}>
                <View
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 16,

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
                    resizeMode="contain"
                    style={{
                      width: 100,
                      height: 50,
                      marginHorizontal: 47,
                      marginVertical: 17,
                    }}
                    source={item.image}
                  />
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: 14,
                      color: '#000',
                      paddingHorizontal: 5,
                      textAlign: 'center',
                    }}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            numColumns={2}
          />
        </View>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
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
