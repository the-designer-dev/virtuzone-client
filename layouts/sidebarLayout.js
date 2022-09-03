import {
  Switch,
  Animated,
  Easing,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {useSwipe} from '../customHooks/useSwipe';
import {CommonActions} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import {setSidebar} from '../reducers/sidebar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {REACT_APP_BASE_URL} from '@env';
import {disconnectSocket} from '../sockets/socketConfig';
import ReactNativeBiometrics from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics();

const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');

const sidebarLayout = ({header, subheader}) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const {sidebar} = useSelector(state => state.sidebar);
  const [photo1, setPhoto1] = useState(require('../images/zaby.png'));
  const [faceId, setFaceId] = useState(false);
  const [fingerprint, setFingerprint] = useState(false);
  const [email, setEmail] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const [userId, setUserId] = useState(null);
  var leftValue = React.useRef(new Animated.Value(-PAGE_WIDTH)).current;

  let payload = Math.round(new Date().getTime() / 1000).toString();

  useFocusEffect(
    React.useCallback(() => {
      getMyStringValue = async () => {
        rnBiometrics.biometricKeysExist().then(resultObject => {
          setFingerprint(resultObject.keysExist);
        });
        try {
          id = await AsyncStorage.getItem('@id');
          setUserId(id);

          if (id) {
            getData(id);
            func(id);
          } else {
          }
        } catch (e) {
          console.log(e);
        }
      };

      async function func(id) {
        const token = await AsyncStorage.getItem('@jwt');
        const notifications = await axios({
          method: 'GET',
          url: `${REACT_APP_BASE_URL}/notification?id=${id}`,
          headers: {
            'x-auth-token': token,
          },
        }).catch(err => console.log(err));
        setNotificationCount(notifications?.data?.notification.length);
      }
      function getData(ids) {
        axios({
          method: 'GET',
          url: `${REACT_APP_BASE_URL}/alluser?id=${ids}`,
        })
          .then(res => {
            // console.log(res.data);
            setEmail(res.data.user.email);
            setFirstName(res.data.user.firstName);
            setLastName(res.data.user.lastName);
          })
          .catch(function (error) {
            if (error.response) {
              console.log(error);
            }
          });
      }

      getMyStringValue();
    }),
  );

  async function verifySignatureWithServer(signature, payload) {
    await axios({
      method: 'POST',
      url: `${REACT_APP_BASE_URL}/verifyBiometric?id=${userId}`,
      data: {
        signature,
        payload,
      },
    });
  }

  function useFingerprint() {
    console.log(fingerprint);
    if (fingerprint) {
      rnBiometrics.deleteKeys().then(resultObject => {
        const {keysDeleted} = resultObject;

        if (keysDeleted) {
          console.log('Successful deletion');
          setFingerprint(!fingerprint);
        } else {
          console.log(
            'Unsuccessful deletion because there were no keys to delete',
          );
        }
      });
    } else {
      rnBiometrics.biometricKeysExist().then(resultObject => {
        const {keysExist} = resultObject;

        if (!keysExist) {
          rnBiometrics.createKeys().then(async resultObject => {
            const {publicKey} = resultObject;
            console.log(publicKey);
            await axios({
              method: 'PUT',
              url: `${REACT_APP_BASE_URL}/publickey?id=${userId}`,
              data: {publicKey: publicKey},
            });

            rnBiometrics
              .createSignature({
                promptMessage: 'Sign in',
                payload: payload,
              })
              .then(resultObject => {
                const {success, signature} = resultObject;
                setFingerprint(!fingerprint);
                console.log(signature);
                if (success) {
                  console.log(payload);
                  verifySignatureWithServer(signature, payload);
                }
              });
          });
        }
      });
    }
  }

  async function logout() {
    disconnectSocket();
    await AsyncStorage.removeItem('@jwt');
  }

  moveLR = () => {
    dispatch(setSidebar(true));
    Animated.timing(leftValue, {
      toValue: 0,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  moveRL = () => {
    dispatch(setSidebar(false));
    Animated.timing(leftValue, {
      toValue: -PAGE_WIDTH,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 10000,
      }}>
      <TouchableOpacity style={{padding: 0}} onPress={() => moveLR()}>
        <Image
          style={{padding: 0, alignSelf: 'flex-start', width: 28, height: 20}}
          source={require('../images/hamburger.png')}
        />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          paddingLeft: 20,
          justifyContent: 'flex-start',
        }}>
        <Text
          style={{
            fontSize: subheader ? 16 : 20,
            fontWeight: '700',
            color: '#222222',
          }}>
          {header}
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontWeight: '700',
            color: '#3E3E3E',
            opacity: 0.4,
            display: subheader ? 'flex' : 'none',
          }}>
          {subheader}
        </Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Image
            style={{padding: 0, alignSelf: 'flex-start'}}
            source={require('../images/BellIcon.png')}
          />
          <View
            style={{
              backgroundColor: '#CF3339',
              padding: 5,
              width: '100%',
              borderRadius: 100,
              position: 'absolute',
              top: -12,
              right: -10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#ffffff',
                fontWeight: '700',
                fontSize: 10,
              }}>
              {notificationCount}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          width: PAGE_WIDTH,
          height: PAGE_HEIGHT,
          transform: [{translateX: leftValue}],
          zIndex: 20,
        }}>
        <View
          style={{
            width: PAGE_WIDTH * 0.8,
            height: PAGE_HEIGHT,
            position: 'absolute',
            zIndex: 10000000,
            top: -24,
            left: -24,
            flex: 1,
            zIndex: 10,
            elevation: 1000,
            padding: 24,
          }}>
          <LinearGradient
            colors={['#131313', '#241515']}
            style={{
              width: PAGE_WIDTH * 0.8,
              height: PAGE_HEIGHT,
              position: 'absolute',
              top: 0,
              left: 0,
            }}
            start={{x: 1.0, y: 0}}
            end={{x: 0, y: 1}}
          />

          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            style={{
              width: '100%',
              height: '100%',
            }}>
            <View
              style={{
                justifyContent: 'center',
                // alignItems: 'center',
                paddingTop: 28,
                zIndex: 9999999999999999999,
                position: 'relative',
              }}>
              <TouchableOpacity
                onPress={() => moveRL()}
                style={{position: 'absolute', right: 0, top: 16}}>
                <Image source={require('../images/x.png')} />
              </TouchableOpacity>

              <Image
                resizeMode="contain"
                style={{width: PAGE_WIDTH * 0.4, height: 50}}
                source={require('../images/sidebarLogo.png')}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 10,
                }}>
                <Text
                  style={{
                    fontWeight: '800',
                    fontSize: 24,
                    color: '#fff',
                    // paddingTop: 10,
                  }}>
                  The
                </Text>
                <Text
                  style={{
                    fontWeight: '800',
                    fontSize: 24,
                    color: '#cf3339',
                    // paddingTop: 5,
                  }}>
                  #1
                </Text>
              </View>
              <Text
                style={{
                  fontWeight: '800',
                  fontSize: 24,
                  color: '#fff',
                  paddingTop: 5,
                }}>
                UAE Business
              </Text>
              <Text
                style={{
                  fontWeight: '800',
                  fontSize: 24,
                  color: '#fff',
                  paddingTop: 5,
                }}>
                Setup Experts
              </Text>
            </View>

            <View
              style={{
                justifyContent: 'flex-start',
                paddingTop: 29,
              }}>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 14,
                  color: '#9CA4AB',
                }}>
                Quick Menu
              </Text>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('CostCalculator');
                  moveRL();
                }}>
                <View
                  style={{
                    paddingTop: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{height: 24, width: 24}}
                    source={require('../images/Calculator.png')}
                  />

                  <Text
                    style={{
                      fontWeight: '500',
                      fontSize: 14,
                      paddingLeft: 16,
                      color: '#FFF',
                    }}>
                    Cost Calculator
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AddCompany');
                  moveRL();
                }}>
                <View
                  style={{
                    paddingTop: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{height: 24, width: 24}}
                    source={require('../images/briefcase.png')}
                  />

                  <Text
                    style={{
                      fontWeight: '500',
                      fontSize: 14,
                      paddingLeft: 16,
                      color: '#FFF',
                    }}>
                    New Business Setup
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: 'flex-start',
                paddingTop: 29,
              }}>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 14,
                  color: '#9CA4AB',
                }}>
                Security
              </Text>

              <View
                style={{
                  paddingTop: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  zIndex: 10000,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    style={{height: 24, width: 24}}
                    source={require('../images/FaceId.png')}
                  />
                  <Text
                    style={{
                      fontWeight: '500',
                      fontSize: 14,
                      paddingLeft: 16,
                      color: '#FFF',
                    }}>
                    Face ID
                  </Text>
                </View>
                <Switch
                  trackColor={{true: '#F2F2F5', false: '#F2F2F5'}}
                  thumbColor={faceId ? '#cf3339' : '#ffffff'}
                  value={faceId}
                  onValueChange={() => {
                    console.log('hello');
                    setFaceId(!faceId);
                  }}
                />
              </View>
              <Pressable
                onPress={() => {
                  useFingerprint();
                }}>
                <View
                  style={{
                    paddingTop: 24,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      style={{height: 24, width: 24}}
                      source={require('../images/FingerprintScan.png')}
                    />

                    <Text
                      style={{
                        fontWeight: '500',
                        fontSize: 14,
                        paddingLeft: 16,
                        color: '#FFF',
                      }}>
                      Fingerprint Scan
                    </Text>
                  </View>
                  <Switch
                    trackColor={{true: '#F2F2F5', false: '#F2F2F5'}}
                    thumbColor={fingerprint ? '#cf3339' : '#ffffff'}
                    value={fingerprint}
                    onValueChange={() => {}}
                  />
                </View>
              </Pressable>
              <TouchableOpacity
                onPress={() => {
                  moveRL();
                  navigation.navigate('UpdatePassword');
                }}>
                <View
                  style={{
                    paddingTop: 24,
                    flexDirection: 'row',

                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      style={{height: 24, width: 24}}
                      source={require('../images/Lock.png')}
                    />
                    <Text
                      style={{
                        fontWeight: '500',
                        fontSize: 14,
                        paddingLeft: 16,
                        color: '#FFF',
                      }}>
                      Change Password
                    </Text>
                  </View>
                  <Image source={require('../images/ArrowIcon.png')} />
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                // justifyContent: 'flex-end',
                flex: 1,
                paddingTop: 50,
              }}>
              <TouchableOpacity
                onPress={() => {
                  logout();
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [{name: 'SignIn'}],
                    }),
                  );
                }}>
                <Text
                  style={{fontWeight: '500', fontSize: 16, color: '#cf3339'}}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Animated.View>
    </View>
  );
};

export default sidebarLayout;

const styles = StyleSheet.create({});
