import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {TextInput} from 'react-native-paper';
import TextField from '../components/inputField';
import axios from 'axios';
import {REACT_APP_BASE_URL} from '@env';
import {setPromotions} from '../reducers/promotions';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, useFocusEffect} from '@react-navigation/native';
import ReactNativeBiometrics from 'react-native-biometrics';
import {setSidebar} from '../reducers/sidebar';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PhoneInput from 'react-native-phone-input';

const rnBiometrics = new ReactNativeBiometrics();

const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');

export default function ForgotEmail({navigation}) {
  const [phone, setPhone] = useState(null);
  const [loader, setLoader] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  let payload = Math.round(new Date().getTime() / 1000).toString();
  var phoneRef = useRef(null);
  const dispatch = useDispatch();

  getMyStringValue = async () => {
    try {
      const jwt = await AsyncStorage.getItem('@jwt');
      // console.log(jwt);
      navigate(jwt);
    } catch (e) {
      console.log(e);
    }
  };

  function navigate(jwt) {
    if (jwt !== null) {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'SignIn'}],
        }),
      );
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      getMyStringValue();
    }, []),
  );

  function sendPhone() {
    setLoader(true);
    axios({
      timeout: 20000,
      method: 'POST',

      url: `${REACT_APP_BASE_URL}/forgotEmail`,
      data: {
        phone: phone,
      },
    })
      .then(async res => {
        setLoader(false);
        setModalVisible(true);
      })
      .catch(err => console.log(err));
  }

  return (
    <View style={{height: '100%'}}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'SignIn'}],
            }),
          );
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
              Email SMS sent
            </Text>
            <Text
              style={{
                paddingTop: 10,
                fontSize: 15,
                fontWeight: '500',
                color: '#000',
                textAlign: 'center',
              }}>
              Your email address has been sent to your registered phone number
            </Text>
            <Pressable
              style={[styles.doneButton]}
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.dispatch(
                  CommonActions.reset({
                    index: 1,
                    routes: [{name: 'SignIn'}],
                  }),
                );
              }}>
              <Text style={{color: '#FFF', fontSize: 17, fontWeight: '700'}}>
                Done
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {!loader ? (
        <View style={{height: '100%'}}>
          <ImageBackground
            source={require('../images/SignIn.jpg')}
            style={{width: '100%', height: 250}}>
            <View style={styles.topheader}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{alignItems: 'flex-start', padding: 0}}>
                <Image
                  style={{padding: 0, alignSelf: 'flex-start'}}
                  source={require('../images/Back.png')}
                />
              </TouchableOpacity>
              <View style={styles.textView}>
                <Text style={[styles.textStyle, {paddingBottom: 20}]}>
                  Forgot Email
                </Text>
                {/* <Text style={styles.textStyle2}>
                    Sign with username or email and password to use your account.
                  </Text> */}
              </View>
            </View>
          </ImageBackground>
          <KeyboardAwareScrollView style={styles.bottomSection}>
            <View style={{height: '100%', padding: 24}}>
              <View style={{paddingBottom: 20}}>
                <PhoneInput
                  ref={phoneRef}
                  // autoFormat={true}
                  initialCountry="ae"
                  textComponent={() => (
                    <TextInput
                      theme={{roundness: 10}}
                      mode="outlined"
                      activeOutlineColor={'#CF3339'}
                      outlineColor={'rgba(0,0,0,0.20)'}
                      onChange={val => setPhone(val)}
                      style={{backgroundColor: '#FFF'}}
                      left={
                        <TextInput.Icon
                          name={() => (
                            <Text>{phoneRef?.current?.getCountryCode()}</Text>
                          )}
                        />
                      }
                    />
                  )}
                />

                {/* <TextField
                  style={{marginBottom: 5}}
                  label="Phone Number"
                  onChangeText={text => setEmail(text)}
                  value={email}
                  left={
                    <TextInput.Icon
                      name={() => (
                        <Image
                          resizeMode="contain"
                          style={{width: 25}}
                          source={require('../images/EnvelopeClosed.png')}
                        />
                      )}
                    />
                  }
                /> */}
              </View>

              <TouchableOpacity
                style={styles.signInButton}
                onPress={() => {
                  if (phone !== null) {
                    sendPhone();
                  }
                }}>
                <Text
                  style={{textAlign: 'center', fontSize: 20, color: '#FFF'}}>
                  Submit
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  marginTop: 50,
                  alignSelf: 'center',
                  justifyContent: 'flex-end',
                }}>
                <Image
                  resizeMode="contain"
                  style={{width: PAGE_WIDTH - 186}}
                  source={require('../images/Tagline.png')}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}>
          <Image source={require('../images/Loading.png')} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  topheader: {
    height: 250,
    padding: 24,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  textStyle: {fontSize: 35, fontWeight: 'bold', color: '#FFF'},
  textStyle2: {fontSize: 16, fontWeight: '400', color: '#FFF'},
  bottomSection: {
    flexGrow: 1,
    backgroundColor: '#f1f1f1',
    height: '100%',
    width: '100%',
  },
  forgotButtonStyle: {
    fontSize: 10,
    fontWeight: '500',
    color: '#777777',
  },
  signInButton: {
    width: '100%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#CF3339',
    marginBottom: 15,
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
