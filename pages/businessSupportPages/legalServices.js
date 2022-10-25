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
                backgroundColor: '#d1353c',
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
                        backgroundColor: '#fbedf0',
                        padding: 10,
                        borderRadius: 100,
                      }}>
                      <Image
                        resizeMode="contain"
                        resizeMethod="resize"
                        style={{width: 30, height: 30}}
                        source={require('../../images/LegalServices.png')}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '700',
                        color: '#fff',
                        paddingLeft: 10,
                      }}>
                      Legal
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '300',
                          color: '#fff',
                        }}>
                        {' '}
                        Services
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
                    Get expert legal advice and understand the UAE’s business
                    laws{' '}
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
                    source={require('../../images/LegalServicesimage.png')}
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
                  Our legal team will guide you in understanding the nuances and
                  intricacies of the UAE’s business laws and regulations. Our
                  legal consultants have specialised expertise in mergers and
                  acquisitions, company law, corporate restructuring, financial
                  law, economic law and dispute resolution, among others.
                </Text>
                <Text
                  style={{
                    paddingTop: 10,
                    fontSize: 16,
                    lineHeight: 22,
                    textAlign: 'justify',
                    color: '#394d58',
                  }}>
                  Through our legal services, you can make informed decisions
                  about your business while ensuring compliance with the UAE’s
                  corporate policies.
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
                    OUR LEGAL SERVICES
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
                        backgroundColor: '#fbedf0',
                      }}>
                      <Image
                        resizeMode="contain"
                        style={{width: 30, height: 30}}
                        source={require('../../images/Asset103-.png')}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#d1353c',
                        paddingLeft: 8,
                      }}>
                      Corporate law
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 22,
                      color: '#394d58',
                      paddingTop: 10,
                    }}>
                    We will assist you in all aspects of economic and
                    competition law and in negotiations with your trading
                    partners, from negotiation and implementation of licenses
                    and commercial agreements, to developing pricing and
                    commercial practices
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
                        backgroundColor: '#fbedf0',
                      }}>
                      <Image
                        resizeMode="contain"
                        style={{width: 30, height: 30}}
                        source={require('../../images/partnershandshake.png')}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#d1353c',
                        paddingLeft: 8,
                      }}>
                      Economic law and competition
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 22,
                      color: '#394d58',
                      paddingTop: 10,
                    }}>
                    We will assist you in all aspects of economic and
                    competition law and in negotiations with your trading
                    partners, from negotiation and implementation of licenses
                    and commercial agreements, to developing pricing and
                    commercial practices.
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
                        backgroundColor: '#fbedf0',
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
                        color: '#d1353c',
                        paddingLeft: 8,
                      }}>
                      Mergers and acquisitions
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 22,
                      color: '#394d58',
                      paddingTop: 10,
                    }}>
                    Backed with years of experience and profound market
                    knowledge, our team will guide you in the acquisition and
                    sale of companies and implementation of joint venture
                    agreements. We will also assist you through each stage of
                    these processes, including preparatory work, negotiations
                    and signing of the final documentation.
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
                        backgroundColor: '#fbedf0',
                      }}>
                      <Image
                        resizeMode="contain"
                        style={{width: 30, height: 30}}
                        source={require('../../images/Asset101-.png')}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#d1353c',
                        paddingLeft: 8,
                      }}>
                      Dispute resolution
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 22,
                      color: '#394d58',
                      paddingTop: 10,
                    }}>
                    Our team will represent you in complex civil cases and
                    commercial disputes before all jurisdictions. The scope of
                    our service includes pre-litigation and litigation (both
                    local and international), as well as commercial and
                    corporate litigation related to payment guarantees,
                    cancellation of sales or shareholder agreements, and stock
                    and capital markets.
                  </Text>
                </View>
                <View style={{paddingTop: 35, width: '100%'}}>
                  <View
                    style={{
                      marginTop: 10,
                      paddingTop: 0,
                      paddingBottom: 10,
                      backgroundColor: '#fbedf0',
                    }}>
                    <View
                      style={{backgroundColor: '#f8dbdd', paddingVertical: 5}}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '700',
                          color: '#d1353c',
                          textAlign: 'center',
                        }}>
                        OUR RATES
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: '#f8dbdd',
                        marginHorizontal: '2%',
                        marginTop: 25,
                        paddingHorizontal: 15,
                        borderLeftColor: '#d1353c',
                        borderLeftWidth: 2,
                      }}>
                      <Text
                        style={{
                          color: '#394d58',
                          paddingVertical: 13,
                        }}>
                        Our legal consultancy services are aimed at assisting
                        startups, SMEs and international corporations and
                        helping entrepreneurs, decision makers and executives
                        understand the complexities of the UAE law, enabling
                        them to make informed decisions and protect the
                        interests of their companies.
                      </Text>
                    </View>
                    <View
                      style={{
                        marginHorizontal: '2%',
                        marginTop: 25,
                        paddingHorizontal: 15,
                        borderTopColor: '#d1353c',
                        borderTopWidth: 1,
                        borderBottomColor: '#d1353c',
                        borderBottomWidth: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          color: '#394d58',
                          paddingVertical: 10,
                        }}>
                        30-minute consultation
                      </Text>
                      <Text
                        style={{
                          color: '#394d58',
                          paddingVertical: 10,
                          fontWeight: '600',
                        }}>
                        AED 500.00
                      </Text>
                    </View>
                    <View
                      style={{
                        marginHorizontal: '2%',
                        // marginTop: 25,
                        paddingHorizontal: 15,
                        // borderTopColor: '#d1353c',
                        // borderTopWidth: 1,
                        borderBottomColor: '#d1353c',
                        borderBottomWidth: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          color: '#394d58',
                          paddingVertical: 10,
                        }}>
                        60-minute consultation
                      </Text>
                      <Text
                        style={{
                          color: '#394d58',
                          paddingVertical: 10,
                          fontWeight: '600',
                        }}>
                        AED 750.00
                      </Text>
                    </View>
                    <View
                      style={{
                        marginHorizontal: '2%',
                        // marginTop: 25,
                        paddingHorizontal: 15,
                        // borderTopColor: '#d1353c',
                        // borderTopWidth: 1,
                        borderBottomColor: '#d1353c',
                        borderBottomWidth: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          color: '#394d58',
                          paddingVertical: 10,
                        }}>
                        5-hour consultation
                      </Text>
                      <Text
                        style={{
                          color: '#394d58',
                          paddingVertical: 10,
                          fontWeight: '600',
                        }}>
                        AED 3,000.00
                      </Text>
                    </View>
                    <View
                      style={{
                        marginHorizontal: '2%',
                        // marginTop: 25,
                        paddingHorizontal: 15,
                        // borderTopColor: '#d1353c',
                        // borderTopWidth: 1,
                        borderBottomColor: '#d1353c',
                        borderBottomWidth: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          color: '#394d58',
                          paddingVertical: 10,
                        }}>
                        10-hour consultation
                      </Text>
                      <Text
                        style={{
                          color: '#394d58',
                          paddingVertical: 10,
                          fontWeight: '600',
                        }}>
                        AED 5,000.00
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
                backgroundColor: '#d1353c',
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
                  borderColor: '#d1353c',
                  borderWidth: 2,
                }}>
                <Text
                  style={{color: '#d1353c', fontSize: 16, fontWeight: '700'}}>
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
