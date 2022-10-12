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
                backgroundColor: '#c4559e',
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
                        backgroundColor: '#f9f0f5',
                        padding: 10,
                        borderRadius: 100,
                      }}>
                      <Image
                        resizeMode="contain"
                        resizeMethod="resize"
                        style={{width: 30, height: 30}}
                        source={require('../../images/VirtualReceptionist.png')}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '700',
                        color: '#fff',
                        paddingLeft: 10,
                      }}>
                      Virtual
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '300',
                          color: '#fff',
                        }}>
                        {' '}
                        Receptionist
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
                    Answer client calls with a personalised greeting
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
                    source={require('../../images/VirtualReceptionistimage.png')}
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
                  Our virtual receptionist services make sure your clients are
                  greeted with a welcoming and personalised greeting whenever
                  they give your business a call. As part of this service, you
                  will be provided with a local 04 number and a 24/7 staffed
                  team to convey your personalised greeting.
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
                    OUR VIRTUAL RECEPTIONIST SERVICES
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
                        backgroundColor: '#f9f0f5',
                      }}>
                      <Image
                        resizeMode="contain"
                        style={{width: 30, height: 30}}
                        source={require('../../images/Asset73-.png')}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#c4559e',
                        paddingLeft: 8,
                      }}>
                      Landline phone number
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 22,
                      color: '#394d58',
                      paddingTop: 10,
                    }}>
                    Having a landline phone number helps establish your
                    credibility as a company. Our virtual receptionist services
                    will provide you with a local 04 number where your clients
                    can easily reach you
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
                        backgroundColor: '#f9f0f5',
                      }}>
                      <Image
                        resizeMode="contain"
                        style={{width: 30, height: 30}}
                        source={require('../../images/Asset93-.png')}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#c4559e',
                        paddingLeft: 8,
                      }}>
                      Personalised greeting
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 22,
                      color: '#394d58',
                      paddingTop: 10,
                    }}>
                    Your client calls will be answered with a personalised
                    greeting. Our team will reach out to you to finalise the
                    personalised welcome message, so we can start handling your
                    calls.
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
                        backgroundColor: '#f9f0f5',
                      }}>
                      <Image
                        resizeMode="contain"
                        style={{width: 30, height: 30}}
                        source={require('../../images/Asset71-.png')}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#c4559e',
                        paddingLeft: 8,
                      }}>
                      24/7 accessibility
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 22,
                      color: '#394d58',
                      paddingTop: 10,
                    }}>
                    With our virtual receptionist services, your clients will
                    not be simply put on hold and your calls will be managed by
                    a team with 24/7 availability. Whether you are getting calls
                    from local or international clients, you can be sure they
                    will be able to reach you.
                  </Text>
                </View>
                <View style={{paddingTop: 35, width: '100%'}}>
                  <View
                    style={{
                      marginTop: 10,
                      paddingTop: 0,
                      paddingBottom: 10,
                      backgroundColor: '#f1eff7',
                    }}>
                    <View
                      style={{backgroundColor: '#f6e1ec', paddingVertical: 5}}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '700',
                          color: '#c4559e',
                          textAlign: 'center',
                        }}>
                        OUR RATES
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: '#f6e1ec',
                        marginHorizontal: '2%',
                        marginTop: 25,
                        paddingHorizontal: 15,
                        borderLeftColor: '#8765ab',
                        borderLeftWidth: 2,
                      }}>
                      <Text
                        style={{
                          color: '#394d58',
                          paddingVertical: 13,
                        }}>
                        Our <Text style={{fontWeight: '800'}}>Lite</Text>{' '}
                        package comes with a call forwarding service, wherein
                        client calls will be instantly forwarded to your
                        designated phone number. On the other hand, our{' '}
                        <Text style={{fontWeight: '800'}}>Premium</Text> package
                        provides you with an answering service, wherein a
                        trained staff member will answer the call, take note of
                        your client’s enquiry and forward it to you via email.
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
                            fontSize: 14,
                          }}>
                          MONTHLY
                        </Text>
                        <Text
                          style={{
                            width: 95,
                            color: '#394d58',
                            textAlign: 'left',
                            fontWeight: '700',
                            fontSize: 14,
                          }}>
                          YEARLY
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
                          Premium (6-month subscription)
                        </Text>
                        <Text
                          style={{
                            color: '#394d58',
                            fontWeight: '600',
                            width: 95,
                            textAlign: 'left',
                          }}>
                          AED 515.00
                        </Text>
                        <Text
                          style={{
                            color: '#394d58',
                            fontWeight: '600',
                            width: 95,
                            textAlign: 'left',
                          }}>
                          AED 6,174.00
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
                          Premium (3-month subscription)
                        </Text>
                        <Text
                          style={{
                            color: '#394d58',
                            fontWeight: '600',
                            width: 95,
                            textAlign: 'left',
                          }}>
                          AED 567.00
                        </Text>
                        <Text
                          style={{
                            color: '#394d58',
                            fontWeight: '600',
                            width: 95,
                            textAlign: 'left',
                          }}>
                          AED 6,804.00
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
                          Premium (1-month subscription)
                        </Text>
                        <Text
                          style={{
                            color: '#394d58',
                            fontWeight: '600',
                            width: 95,
                            textAlign: 'left',
                          }}>
                          AED 620.00
                        </Text>
                        <Text
                          style={{
                            color: '#394d58',
                            fontWeight: '600',
                            width: 95,
                            textAlign: 'left',
                          }}>
                          AED 7,434.00
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
                          Lite (1-month subscription)
                        </Text>
                        <Text
                          style={{
                            color: '#394d58',
                            fontWeight: '600',
                            width: 95,
                            textAlign: 'left',
                          }}>
                          AED 210.00
                        </Text>
                        <Text
                          style={{
                            color: '#394d58',
                            fontWeight: '600',
                            width: 95,
                            textAlign: 'left',
                          }}>
                          AED 2,520.00
                        </Text>
                      </View>
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
                <View
                  style={{
                    paddingTop: 35,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <Image
                    resizeMethod={'scale'}
                    resizeMode={'contain'}
                    style={{width: '80%', height: 75}}
                    source={require('../../images/logo.png')}
                  />
                </View>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      width: '90%',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      borderLeftColor: '#394c58',
                      borderLeftWidth: 2,
                      marginTop: 35,
                      paddingLeft: 10,
                      paddingVertical: 5,
                    }}>
                    <Text
                      style={{
                        color: '#394c58',
                        fontSize: 16,
                        fontWeight: '600',
                      }}>
                      VIRTUAL RECEPTIONIST INQUIRIES
                    </Text>
                    <Text
                      style={{
                        color: '#394c58',
                        fontSize: 12,
                        fontWeight: '400',
                        paddingTop: 3,
                      }}>
                      +971 4 457 8200
                    </Text>
                    <Text
                      style={{
                        color: '#394c58',
                        fontSize: 12,
                        fontWeight: '400',
                        paddingTop: 3,
                      }}>
                      corporateservices@vz.ae
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      width: '90%',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      borderLeftColor: '#394c58',
                      borderLeftWidth: 2,
                      marginTop: 35,
                      paddingLeft: 10,
                      paddingVertical: 5,
                    }}>
                    <Text
                      style={{
                        color: '#394c58',
                        fontSize: 16,
                        fontWeight: '600',
                      }}>
                      GENERAL INQUIRIES
                    </Text>
                    <Text
                      style={{
                        color: '#394c58',
                        fontSize: 12,
                        fontWeight: '400',
                        paddingTop: 3,
                      }}>
                      Office 404, Al Saaha Offices B, Souk Al Bahar, Burj
                      KhalifaDistrict, Dubai, UAE
                    </Text>
                    <Text
                      style={{
                        color: '#394c58',
                        fontSize: 12,
                        fontWeight: '400',
                        paddingTop: 3,
                      }}>
                      info@vz.ae | www.vz.ae
                    </Text>
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
                backgroundColor: '#c4559e',
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
                  borderColor: '#773360',
                  borderWidth: 2,
                }}>
                <Text
                  style={{color: '#c4559e', fontSize: 16, fontWeight: '700'}}>
                  Send an Inquiry <Text style={{color: '#c4559e'}}>{'>'}</Text>
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
