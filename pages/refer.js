import {
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import SidebarLayout from '../layouts/sidebarLayout';

import TextField from '../components/inputField';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNFS from 'react-native-fs';
import {PermissionsAndroid, Platform} from 'react-native';
import {REACT_APP_BASE_URL} from '@env';
import {socket} from '../sockets/socketConfig';
import IntlPhoneInput from 'react-native-international-telephone-input';
import Lottie from 'lottie-react-native';

const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');

export default function Refer({route, navigation}) {
  const [id, setId] = useState(null);
  const [option, setOption] = useState(1);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [negativeModalVisible, setNegativeModalVisible] = useState(false);

  function invitePerson() {if (firstName && lastName && email && phoneNumber) {setModalVisible(true)}else{
    setNegativeModalVisible(true)
  } }
  return (
    <LinearGradient
      colors={['#eedfe0', '#dbdcdc']}
      style={styles.gradientStyle}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}>
        <Modal
            animationType="fade"
            transparent={true}
            visible={negativeModalVisible}
            onRequestClose={() => {
              setNegativeModalVisible(!negativeModalVisible);
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
                  source={require('../images/failedIcon.png')}
                />



                <Text
                  style={{
                    paddingTop: 31,
                    fontSize: 24,
                    fontWeight: '500',
                    color: '#cf3339',
                    textAlign: 'center',
                  }}>
                  Missing Details
                </Text>
                <Text
                  style={{
                    paddingTop: 10,
                    fontSize: 15,
                    fontWeight: '500',
                    color: '#000',
                    textAlign: 'center',
                  }}>
                  Please ensure to fill in all the mandatory fields.
                </Text>
                <Pressable
                  style={[styles.doneButton]}
                  onPress={() =>
                    setNegativeModalVisible(!negativeModalVisible)
                  }>
                  <Text
                    style={{color: '#FFF', fontSize: 17, fontWeight: '700'}}>
                    Go Back
                  </Text>
                </Pressable>
              </View>
            </View>
          </Modal>
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
              Thank You
            </Text>
            <Text
              style={{
                paddingTop: 10,
                fontSize: 15,
                fontWeight: '500',
                color: '#000',
                textAlign: 'center',
              }}>
              An invite has been sent to {firstName} {lastName}
            </Text>
            <Pressable
              style={[styles.doneButton]}
              onPress={() => setModalVisible(false)}>
              <Text style={{color: '#FFF', fontSize: 17, fontWeight: '700'}}>
                Done
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
        <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 24}}>
          <SidebarLayout header={'Refer a Friend Now'} />
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
Refer A Friend Now</Text>
</View>

          <View style={{flexDirection: 'row' , paddingBottom:36}}>
            <Pressable
              onPress={() => setOption(1)}
              style={[
                styles.buttonStyle,
                {
                  flex: 1,
                  backgroundColor: option === 1 ? '#CF3339' : 'transparent',
                },
              ]}>
              <Text
                style={{
                  textAlign: 'center',
                  color: option === 1 ? '#FFF' : '#000',
                }}>
                REFER A FRIEND
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setOption(2)}
              style={[
                styles.buttonStyle,
                {
                  flex: 2,
                  backgroundColor: option === 2 ? '#CF3339' : 'transparent',
                },
              ]}>
              <Text
                style={{
                  textAlign: 'center',
                  color: option === 2 ? '#FFF' : '#000',
                }}>
                BECOME A SUPER REFERRER
              </Text>
            </Pressable>
          </View>
          <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  style={styles.container}
                >
          <ScrollView style={{width: '100%', width: '100%'}}>
            {option === 1 ? (
                 
              <View style={{height: '100%'}}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 12,
                    color: '#000',
                    textAlign: 'center',
                    paddingBottom: 36,
                  }}>
                  YOUR REFERRAL WILL RECEIVE A WELCOME EMAIL FROM VIRTUZONE AND
                  A PHONE CALL FROM ONE OF OUR CONSULTANTS.
                </Text>

                <SafeAreaView style={{marginBottom: 35}}>
                  <TextField
                    label="First Name"
                    onChangeText={text => setFirstName(text)}
                  />
                </SafeAreaView>
                <SafeAreaView style={{marginBottom: 35}}>
                  <TextField
                    label="Last Name"
                    onChangeText={text => setLastName(text)}
                  />
                </SafeAreaView>

                <SafeAreaView style={{marginBottom: 40}}>
                  <TextField
                    label="Email Address"
                    onChangeText={text => setEmail(text)}
                  />
                </SafeAreaView>

                <SafeAreaView style={{marginBottom: 35}}>
                  <IntlPhoneInput
                    // flagStyle={{display: 'none'}}
                    defaultCountry="AE"
                    containerStyle={styles.phoneInput}
                    onChangeText={data => {
                      if (data.phoneNumber[0] === '0') {
                        setPhoneNumber(
                          `${data.dialCode}${data.phoneNumber.substring(
                            1,
                          )}`.replace(' ', ''),
                        );
                      } else {
                        setPhoneNumber(
                          `${data.dialCode}${data.phoneNumber}`.replace(
                            ' ',
                            '',
                          ),
                        );
                      }
                    }}
                    lang="EN"
                  />
                </SafeAreaView>

                <TouchableOpacity
                  style={[styles.sendButton , {marginBottom:30}]}
                  onPress={() => invitePerson()}>
                  <Image
                    style={{width: 13, height: 13}}
                    source={require('../images/sendArrow.png')}
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 12,
                      fontWeight: '600',
                      color: '#FFF',
                      paddingLeft: 7,
                    }}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{height: '100%'}}>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 18,
                    color: '#000',
                    textAlign: 'center',
                    // paddingTop: 36,
                  }}>
                  EARN PASSIVE INCOME – BUILD YOUR NETWORK OF REFERRERS.
                </Text>
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: 16,
                    color: '#000',
                    textAlign: 'center',
                    paddingTop: 20,
                  }}>
                  Create an account to recruit referrers through your dashboard.
                </Text>
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: 16,
                    color: '#000',
                    textAlign: 'center',
                    paddingTop: 20,
                    paddingBottom: 40,
                  }}>
                  You will get a reward for every client your referrers
                  successfully onboard. It takes a little work upfront, but once
                  you have built your network, you can sit back and enjoy the
                  income you will earn from their referrals.
                </Text>

                <TouchableOpacity style={styles.sendButton}>
                  <Image
                    style={{width: 13, height: 13}}
                    source={require('../images/sendArrow.png')}
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 12,
                      fontWeight: '600',
                      color: '#FFF',
                      paddingLeft: 7,
                    }}>
                    Send Request
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
              </KeyboardAvoidingView>

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
  sendButton: {
    backgroundColor: '#CF3339',
    alignSelf: 'center',
    paddingHorizontal: 35,
    paddingVertical: 12,
    borderRadius: 120,
    marginTop: 18,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  buttonStyle: {
    borderRadius: 10,
    borderColor: '#CF3339',
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginHorizontal: 3,
    justifyContent: 'center',
    alignItems: 'center',
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
  container:{
    flex:1,
    marginBottom:20
  }
});
