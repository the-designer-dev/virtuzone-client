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
                backgroundColor: '#f3837a',
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
                        backgroundColor: '#fdf3f4',
                        padding: 10,
                        borderRadius: 100,
                      }}>
                      <Image
                        resizeMode="contain"
                        resizeMethod="resize"
                        style={{width: 30, height: 30}}
                        source={require('../../images/PROServices.png')}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '700',
                        color: '#fff',
                        paddingLeft: 10,
                      }}>
                      PRO
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '300',
                        color: '#fff',
                      }}>
                      {' '}
                      Services
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '700',
                      color: '#fff',
                      paddingTop: 20,
                    }}>
                    Leave the time-consuming admin tasks to our PRO team
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
                    source={require('../../images/PROServicesimage.png')}
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
                  Let our PRO team deal with the hassle of handling your
                  licences, visas and other admin tasks, so you can turn your
                  focus to running your business and save time and money in the
                  process. Our PRO services are designed to assist
                  professionals, entrepreneurs and SMEs in all industries. We
                  can assist you with any PRO requirement, even if your original
                  license was not issued through Virtuzone.
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
                    OUR BANK ACCOUNT OPENING SERVICES
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
                        backgroundColor: '#fdf3f4',
                        width: 50,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#f3837a',
                          fontSize: 20,
                          fontWeight: '800',
                        }}>
                        1
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#f3837a',
                        paddingLeft: 8,
                        width: PAGE_WIDTH - 100,
                      }}>
                      Residence visas for dependants, maids and drivers
                    </Text>
                  </View>
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
                        backgroundColor: '#fdf3f4',
                        width: 50,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#f3837a',
                          fontSize: 20,
                          fontWeight: '800',
                        }}>
                        2
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#f3837a',
                        paddingLeft: 8,
                        width: PAGE_WIDTH - 100,
                      }}>
                      Medical fitness tests for residence visa applications
                    </Text>
                  </View>
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
                        backgroundColor: '#fdf3f4',
                        width: 50,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#f3837a',
                          fontSize: 20,
                          fontWeight: '800',
                        }}>
                        3
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#f3837a',
                        paddingLeft: 8,
                        width: PAGE_WIDTH - 100,
                      }}>
                      Obtaining or renewing UAE driver’s licence, liquor
                      licence, police clearance and power of attorney (POA
                    </Text>
                  </View>
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
                        backgroundColor: '#fdf3f4',
                        width: 50,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#f3837a',
                          fontSize: 20,
                          fontWeight: '800',
                        }}>
                        4
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#f3837a',
                        paddingLeft: 8,
                        width: PAGE_WIDTH - 100,
                      }}>
                      Courier/driver services during office hours
                    </Text>
                  </View>
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
                        backgroundColor: '#fdf3f4',
                        width: 50,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#f3837a',
                          fontSize: 20,
                          fontWeight: '800',
                        }}>
                        5
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#f3837a',
                        paddingLeft: 8,
                        width: PAGE_WIDTH - 100,
                      }}>
                      Obtaining or renewing Emirates ID cards and e-gate cards
                    </Text>
                  </View>
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
                        backgroundColor: '#fdf3f4',
                        width: 50,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#f3837a',
                          fontSize: 20,
                          fontWeight: '800',
                        }}>
                        6
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#f3837a',
                        paddingLeft: 8,
                        width: PAGE_WIDTH - 100,
                      }}>
                      Chamber of Commerce registration and renewal
                    </Text>
                  </View>
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
                        backgroundColor: '#fdf3f4',
                        width: 50,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#f3837a',
                          fontSize: 20,
                          fontWeight: '800',
                        }}>
                        7
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#f3837a',
                        paddingLeft: 8,
                        width: PAGE_WIDTH - 100,
                      }}>
                      Ejari registration and renewal
                    </Text>
                  </View>
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
                        backgroundColor: '#fdf3f4',
                        width: 50,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#f3837a',
                          fontSize: 20,
                          fontWeight: '800',
                        }}>
                        8
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#f3837a',
                        paddingLeft: 8,
                        width: PAGE_WIDTH - 100,
                      }}>
                      Attestation and legal translation
                    </Text>
                  </View>
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
                        backgroundColor: '#fdf3f4',
                        width: 50,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#f3837a',
                          fontSize: 20,
                          fontWeight: '800',
                        }}>
                        9
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#f3837a',
                        paddingLeft: 8,
                        width: PAGE_WIDTH - 100,
                      }}>
                      Others
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 22,
                      color: '#394d58',
                      paddingTop: 10,
                    }}>
                    Please ask your Visa Consultant or Relationship Manager if
                    you would like to enquire about a particular request.
                  </Text>
                </View>
                <View style={{paddingTop: 35, width: '100%'}}>
                  <View
                    style={{
                      marginTop: 10,
                      paddingTop: 0,
                      paddingBottom: 10,
                      backgroundColor: '#fdf3f4',
                    }}>
                    <View
                      style={{backgroundColor: '#fde8e7', paddingVertical: 5}}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '700',
                          color: '#f3837a',
                          textAlign: 'center',
                        }}>
                        OUR RATES
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: '#fde8e7',
                        marginHorizontal: '2%',
                        marginTop: 25,
                        paddingHorizontal: 15,
                        borderLeftColor: '#f3837a',
                        borderLeftWidth: 2,
                      }}>
                      <Text
                        style={{
                          color: '#394d58',
                          paddingVertical: 13,
                        }}>
                        Leave the hard work to our team. Access our reliable and
                        affordable PRO services and ensure your business admin
                        requirements are handled with efficiency and expertise.
                      </Text>
                    </View>
                    <View
                      style={{
                        marginHorizontal: '2%',
                        marginTop: 25,
                        paddingHorizontal: 15,
                        borderTopColor: '#f3837a',
                        borderTopWidth: 1,
                        borderBottomColor: '#f3837a',
                        borderBottomWidth: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          color: '#394d58',
                          paddingVertical: 10,
                          width: '60%',
                        }}>
                        Standard fee for approximately 2 hours of service
                      </Text>
                      <Text
                        style={{
                          color: '#394d58',
                          paddingVertical: 10,
                          fontWeight: '600',
                          width: '30%',
                          textAlign: 'right',
                        }}>
                        AED 3,150.00
                      </Text>
                    </View>
                    <View
                      style={{
                        marginHorizontal: '2%',
                        paddingHorizontal: 15,
                        borderBottomColor: '#f3837a',
                        borderBottomWidth: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          color: '#394d58',
                          paddingVertical: 10,
                          width: '40%',
                        }}>
                        Non-standard PRO services
                      </Text>
                      <Text
                        style={{
                          color: '#394d58',
                          paddingVertical: 10,
                          fontWeight: '600',
                          width: '50%',
                          textAlign: 'right',
                        }}>
                        Additional charges may apply
                      </Text>
                    </View>
                    <View
                      style={{
                        marginHorizontal: '2%',

                        paddingHorizontal: 15,

                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          color: '#394d58',
                          fontSize: 10,
                          paddingVertical: 10,
                        }}>
                        * All rates are inclusive of 5% VAT.
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
                backgroundColor: '#f3837a',
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
                  borderColor: '#a65953',
                  borderWidth: 2,
                }}>
                <Text
                  style={{color: '#f3837a', fontSize: 16, fontWeight: '700'}}>
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
