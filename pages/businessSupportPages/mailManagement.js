import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
  SafeAreaView,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import SidebarLayout from '../../layouts/sidebarLayout';
import Pdf from 'react-native-pdf';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNFS from 'react-native-fs';
import {PermissionsAndroid, Platform} from 'react-native';
import {REACT_APP_BASE_URL} from '@env';
import {socket} from '../../sockets/socketConfig';
import Lottie from 'lottie-react-native';
import {ScrollView} from 'react-native';
const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');

export default function BusinessSupportSingle({route, navigation}) {
  const [id, setId] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [inquiry, setInquiry] = useState('');

  async function sendInquiry(name) {
    setConfirmModalVisible(false);
    socket.emit(
      'recieveNotification',
      id,
      `Business Support Inquiry`,
      `requested for an inquiry regarding ${name}.`,
      new Date(),
    );
    setModalVisible(true);
  }

  return (
    <LinearGradient
      colors={['#eedfe0', '#dbdcdc']}
      style={styles.gradientStyle}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={confirmModalVisible}
            onRequestClose={() => {
              setConfirmModalVisible(!confirmModalVisible);
            }}>
            <View
              style={[
                styles.centeredView,
                modalVisible ? {backgroundColor: 'rgba(0,0,0,0.5)'} : '',
              ]}>
              <View style={styles.modalView}>
                <Text style={{fontSize: 16, fontWeight: '600'}}>
                  Would you like to submit a request?
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 24,
                  }}>
                  <TouchableOpacity
                    onPress={() => sendInquiry(inquiry)}
                    style={{
                      backgroundColor: '#cf3339',
                      borderRadius: 10,
                      paddingVertical: 10,
                      width: PAGE_WIDTH / 2 - 70,
                      marginRight: 10,
                      textAlign: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{fontSize: 16, fontWeight: '600', color: '#fff'}}>
                      Confirm
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setConfirmModalVisible(false)}
                    style={{
                      borderWidth: 2,
                      borderColor: '#cf3339',
                      borderRadius: 10,
                      paddingVertical: 10,
                      width: PAGE_WIDTH / 2 - 70,
                      marginLeft: 10,
                      textAlign: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#cf3339',
                      }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
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
                  source={require('../../images/success_lottie.json')}
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
                  Thank you for submitting your request. Someone from our team
                  will contact you soon.
                </Text>
                <Pressable
                  style={[styles.doneButton]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text
                    style={{color: '#FFF', fontSize: 17, fontWeight: '700'}}>
                    Done
                  </Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          <SafeAreaView style={{flex: 1, position: 'relative'}}>
            <View style={{padding: 24}}>
              <SidebarLayout header={'Business Support'} />
            </View>

            <View
              style={{
                backgroundColor: '#374ca0',
                padding: 24,
                zIndex: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  overflow: 'visible',
                }}>
                <View style={{width: '60%'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        backgroundColor: '#f0f3f8',
                        padding: 10,
                        borderRadius: 100,
                      }}>
                      <Image
                        resizeMode="contain"
                        resizeMethod="resize"
                        style={{width: 30, height: 30}}
                        source={require('../../images/MailManagement.png')}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '700',
                        color: '#fff',
                        paddingLeft: 10,
                      }}>
                      Mail
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '300',
                          color: '#fff',
                        }}>
                        {' '}
                        Management
                      </Text>
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '700',
                      color: '#fff',
                      paddingTop: 20,
                    }}>
                    Make sure someone is always available to collect your mail
                  </Text>
                </View>
                <View
                  style={{
                    width: '50%',
                    height: '110%',
                    // overflow: 'visible',
                  }}>
                  <Image
                    resizeMode="contain"
                    style={{
                      width: '100%',
                      height: '110%',
                      position: 'absolute',
                      bottom: -25,
                    }}
                    source={require('../../images/MailManagementimage.png')}
                  />
                </View>
              </View>
            </View>
            <ScrollView
              style={{
                height: '100%',
                width: '100%',
              }}>
              <View
                style={{
                  paddingBottom: 80,
                  padding: 24,
                  backgroundColor: '#fff',
                  zIndex: 1,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 22,
                    textAlign: 'justify',
                    color: '#394d58',
                  }}>
                  Our mail management service allows you to use our premium
                  office address with P.O. Box as your business correspondence
                  address. Through our mail management service, you can make
                  sure there is always someone to receive any incoming mail for
                  your business. Our team will receive, sort and store all your
                  incoming letters, parcels and packages, and will immediately
                  notify you of these, so you can pick them up at any convenient
                  time
                </Text>

                <View style={{paddingTop: 35}}>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 20,
                      textAlign: 'justify',
                      fontWeight: '700',
                      color: '#394d58',
                    }}>
                    OUR MAIL MANAGEMENT SERVICES
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingTop: 30,
                    }}>
                    <View
                      style={{
                        padding: 10,
                        borderRadius: 100,
                        backgroundColor: '#f0f3f8',
                      }}>
                      <Image
                        resizeMode="contain"
                        style={{width: 30, height: 30}}
                        source={require('../../images/Asset91-.png')}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#374ca0',
                        paddingLeft: 8,
                      }}>
                      Mail handling, sorting and storage
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 22,
                      color: '#394d58',
                      paddingTop: 10,
                    }}>
                    With our mail management service, you never have to worry if
                    someone will be there to collect your mail, especially if
                    you are out of the country or tied up with another
                    appointment.
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingTop: 30,
                    }}>
                    <View
                      style={{
                        padding: 10,
                        borderRadius: 100,
                        backgroundColor: '#f0f3f8',
                      }}>
                      <Image
                        resizeMode="contain"
                        style={{width: 30, height: 30}}
                        source={require('../../images/Asset90-.png')}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#374ca0',
                        paddingLeft: 8,
                      }}>
                      Alerts and notifications
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 22,
                      color: '#394d58',
                      paddingTop: 10,
                    }}>
                    Our team will immediately notify you of any delivered mail,
                    allowing you to pick a convenient time for collection.
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingTop: 30,
                    }}>
                    <View
                      style={{
                        padding: 10,
                        borderRadius: 100,
                        backgroundColor: '#f0f3f8',
                      }}>
                      <Image
                        resizeMode="contain"
                        style={{width: 30, height: 30}}
                        source={require('../../images/Asset89-.png')}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#374ca0',
                        paddingLeft: 8,
                      }}>
                      Security and verification
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 22,
                      color: '#394d58',
                      paddingTop: 10,
                    }}>
                    We do not release your mail to just anybody. If you wish to
                    authorise a third party to collect the mail on your behalf,
                    you need to notify our team via email. The authorised person
                    should bring their Emirates ID for verification purposes.
                  </Text>
                </View>
                <View style={{paddingTop: 35, width: '100%'}}>
                  <View
                    style={{
                      marginTop: 10,
                      paddingTop: 0,
                      paddingBottom: 10,
                      backgroundColor: '#f0f3f8',
                    }}>
                    <View
                      style={{backgroundColor: '#dde0ed', paddingVertical: 5}}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '700',
                          color: '#374ca0',
                          textAlign: 'center',
                        }}>
                        OUR RATES
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: '#dde0ed',
                        marginHorizontal: '2%',
                        marginTop: 25,
                        paddingHorizontal: 15,
                        borderLeftColor: '#374ca0',
                        borderLeftWidth: 2,
                      }}>
                      <Text
                        style={{
                          color: '#394d58',
                          paddingVertical: 13,
                        }}>
                        Our mail management service gives you peace of mind that
                        your mail will be collected, sorted and secured, even if
                        you’re not there.
                      </Text>
                    </View>
                    <View
                      style={{
                        marginHorizontal: '2%',
                        marginTop: 25,
                        paddingHorizontal: 15,
                        borderTopColor: '#374ca0',
                        borderTopWidth: 1,
                        borderBottomColor: '#374ca0',
                        borderBottomWidth: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          color: '#394d58',
                          paddingVertical: 10,
                        }}>
                        You can subscribe to our mail management service for a
                        very affordable rate of AED 525.00 per year, inclusive
                        of VAT.
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                height: 70,
                width: '100%',
                backgroundColor: '#374ca0',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 24,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
              }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={require('../../images/Back.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setConfirmModalVisible(true);
                  setInquiry('Bank Account Opening');
                }}
                style={{
                  width: PAGE_WIDTH - 98,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingVertical: 10,
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  borderColor: '#1c2753',
                  borderWidth: 2,
                }}>
                <Text
                  style={{color: '#374ca0', fontSize: 16, fontWeight: '700'}}>
                  Send an Inquiry
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
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
