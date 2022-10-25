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
                backgroundColor: '#10bac0',
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
                        backgroundColor: '#eff9fa',
                        padding: 10,
                        borderRadius: 100,
                      }}>
                      <Image
                        resizeMode="contain"
                        resizeMethod="resize"
                        style={{width: 30, height: 30}}
                        source={require('../../images/TouristVisa.png')}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '700',
                        color: '#fff',
                        paddingLeft: 10,
                      }}>
                      Tourist
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '300',
                        color: '#fff',
                      }}>
                      {' '}
                      Visa
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '700',
                      color: '#fff',
                      paddingTop: 20,
                    }}>
                    Enjoy a smooth and hassle-free tourist visa application
                    process
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
                    source={require('../../images/TouristVisaimage.png')}
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
                  Applying for a tourist visa in the UAE has never been easier.
                  Our team will take care of the entire process for you, whether
                  you need a 30-day or 90-day tourist visa, with single or
                  multiple entries. Our time-tested visa application process
                  ensures a smooth and hassle-free experience for you.
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
                    OUR TOURIST VISA SERVICES
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
                        backgroundColor: '#eff9fa',
                      }}>
                      <Image
                        resizeMode="contain"
                        style={{width: 30, height: 30}}
                        source={require('../../images/Asset110-.png')}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#10bac0',
                        paddingLeft: 8,
                      }}>
                      Convenient process
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 22,
                      color: '#394d58',
                      paddingTop: 10,
                    }}>
                    We offer a simplified and easy process for tourist visa
                    applications. Our team will ask you to send the required
                    documents via email or WhatsApp. These include:
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 22,
                      color: '#394d58',
                      paddingTop: 25,
                    }}>
                    • A copy of the applicant’s passport
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 22,
                      color: '#394d58',
                      paddingTop: 3,
                    }}>
                    • A passport photo of the applicant
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 22,
                      color: '#394d58',
                      paddingTop: 3,
                    }}>
                    • A copy of the previous visa (for extensions)
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
                        backgroundColor: '#eff9fa',
                      }}>
                      <Image
                        resizeMode="contain"
                        style={{width: 30, height: 30}}
                        source={require('../../images/Asset111-.png')}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#10bac0',
                        paddingLeft: 8,
                      }}>
                      End-to-end management
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 22,
                      color: '#394d58',
                      paddingTop: 10,
                    }}>
                    Our team will assist you throughout the complete application
                    process and will keep you updated on the progress of your
                    application
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
                        backgroundColor: '#eff9fa',
                      }}>
                      <Image
                        resizeMode="contain"
                        style={{width: 30, height: 30}}
                        source={require('../../images/Asset112-.png')}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#10bac0',
                        paddingLeft: 8,
                      }}>
                      Fast results
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 22,
                      color: '#394d58',
                      paddingTop: 10,
                    }}>
                    The normal processing time for tourist visa applications
                    takes only 2 to 5 working days (depending on nationality).
                  </Text>
                </View>
                <View style={{paddingTop: 35, width: '100%'}}>
                  <View
                    style={{
                      marginTop: 10,
                      paddingTop: 0,
                      paddingBottom: 10,
                      backgroundColor: '#eff9fa',
                    }}>
                    <View
                      style={{backgroundColor: '#d3edf2', paddingVertical: 5}}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '700',
                          color: '#10bac0',
                          textAlign: 'center',
                        }}>
                        OUR RATES
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: '#d3edf2',
                        marginHorizontal: '2%',
                        marginTop: 25,
                        paddingHorizontal: 15,
                        borderLeftColor: '#10bac0',
                        borderLeftWidth: 2,
                      }}>
                      <Text
                        style={{
                          color: '#394d58',
                          paddingVertical: 13,
                        }}>
                        Let your tourist visa application process be a breeze,
                        with the help of our team. Not only that, we offer you
                        the most affordable tourist visa rates in the UAE
                      </Text>
                    </View>
                    <View
                      style={{
                        marginHorizontal: '2%',
                        flexDirection: 'column',
                        marginTop: 25,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                        }}>
                        <Text
                          style={{
                            width: 95,
                            textAlign: 'left',
                            color: '#394d58',
                            fontWeight: '700',
                            fontSize: 12,
                          }}>
                          Outside the country
                        </Text>
                        <Text
                          style={{
                            width: 95,
                            color: '#394d58',
                            textAlign: 'left',
                            fontWeight: '700',
                            fontSize: 12,
                          }}>
                          Inside the country
                        </Text>
                      </View>
                      <View
                        style={{
                          borderTopColor: '#8765ab',
                          borderTopWidth: 1,
                          borderBottomColor: '#8765ab',
                          borderBottomWidth: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingVertical: 10,
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#394d58',
                            width: PAGE_WIDTH - 260,
                          }}>
                          Standard 30-day visa – Single entry
                        </Text>
                        <Text
                          style={{
                            color: '#394d58',
                            fontWeight: '600',
                            width: 95,
                            textAlign: 'left',
                          }}>
                          AED 420.00
                        </Text>
                        <Text
                          style={{
                            color: '#394d58',
                            fontWeight: '600',
                            width: 95,
                            textAlign: 'left',
                          }}>
                          AED 1,250.00{' '}
                        </Text>
                      </View>
                      <View
                        style={{
                          borderBottomColor: '#8765ab',
                          borderBottomWidth: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingVertical: 10,
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#394d58',
                            width: PAGE_WIDTH - 260,
                          }}>
                          Standard 90-day visa – Single entry
                        </Text>
                        <Text
                          style={{
                            color: '#394d58',
                            fontWeight: '600',
                            width: 95,
                            textAlign: 'left',
                          }}>
                          AED 1,000.00{' '}
                        </Text>
                        <Text
                          style={{
                            color: '#394d58',
                            fontWeight: '600',
                            width: 95,
                            textAlign: 'left',
                          }}>
                          AED 1,600.00
                        </Text>
                      </View>
                      <View
                        style={{
                          borderBottomColor: '#8765ab',
                          borderBottomWidth: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingVertical: 10,
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#394d58',
                            width: PAGE_WIDTH - 260,
                          }}>
                          Visa extension (30 days)
                        </Text>
                        <Text
                          style={{
                            color: '#394d58',
                            fontWeight: '600',
                            width: 95,
                            textAlign: 'left',
                          }}>
                          AED 1,250.00
                        </Text>
                        <Text
                          style={{
                            color: '#394d58',
                            fontWeight: '600',
                            width: 95,
                            textAlign: 'left',
                          }}></Text>
                      </View>
                      <View
                        style={{
                          borderBottomColor: '#8765ab',
                          borderBottomWidth: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingVertical: 10,
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#394d58',
                            width: PAGE_WIDTH - 260,
                          }}>
                          Visa extension (90 days)
                        </Text>
                        <Text
                          style={{
                            color: '#394d58',
                            fontWeight: '600',
                            width: 95,
                            textAlign: 'left',
                          }}>
                          AED 1,600.00{' '}
                        </Text>
                        <Text
                          style={{
                            color: '#394d58',
                            fontWeight: '600',
                            width: 95,
                            textAlign: 'left',
                          }}></Text>
                      </View>
                    </View>
                    <View
                      style={{
                        marginHorizontal: '2%',

                        paddingHorizontal: 15,

                        flexDirection: 'column',
                        paddingVertical: 10,
                      }}>
                      <Text
                        style={{
                          color: '#394d58',
                          fontSize: 10,
                        }}>
                        * The above fees include Covid insurance and are subject
                        to change, depending on the nationality of the applicant
                      </Text>
                      <Text
                        style={{
                          color: '#394d58',
                          fontSize: 10,
                          paddingTop: 5,
                        }}>
                        * All rates are inclusive of 5% VAT
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
                backgroundColor: '#10bac0',
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
                  borderColor: '#096f73',
                  borderWidth: 2,
                }}>
                <Text
                  style={{color: '#10bac0', fontSize: 16, fontWeight: '700'}}>
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
