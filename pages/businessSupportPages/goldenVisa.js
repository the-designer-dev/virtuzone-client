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
                backgroundColor: '#b0924a',
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
                        backgroundColor: '#f5f2eb',
                        padding: 10,
                        borderRadius: 100,
                      }}>
                      <Image
                        resizeMode="contain"
                        resizeMethod="resize"
                        style={{width: 30, height: 30}}
                        source={require('../../images/GoldenVisa.png')}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '700',
                        color: '#fff',
                        paddingLeft: 10,
                      }}>
                      Golden
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
                    Obtain a UAE Golden Visa through a seamless application
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
                    source={require('../../images/GoldenVisaimage.png')}
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
                  The UAE Golden Visa was launched in 2019 to attract and retain
                  professionals, investors, entrepreneurs and outstanding
                  students from all over the world. Our team will assist you and
                  help you have a seamless application process for a golden
                  visa, so you can fully enjoy its benefits, which include
                  long-term residency in the UAE, 100% company ownership in the
                  mainland, and the opportunity to live, work and study in the
                  country.
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
                    MUST KNOW
                  </Text>
                  <View
                    style={{
                      marginTop: 10,
                      padding: 13,
                      backgroundColor: '#f8f7f1',
                    }}>
                    <Text style={{color: '#394d58'}}>
                      The standard application processing time may take 2 to 4
                      weeks, subject to additional requirements.
                    </Text>
                  </View>
                </View>
                <View style={{paddingTop: 35}}>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 20,
                      textAlign: 'justify',
                      fontWeight: '700',
                      color: '#394d58',
                    }}>
                    OUR GOLDEN VISA SERVICES
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
                        backgroundColor: '#f5f2eb',
                      }}>
                      <Image
                        resizeMode="contain"
                        style={{width: 30, height: 30}}
                        source={require('../../images/Asset114-.png')}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#b0924a',
                        paddingLeft: 8,
                      }}>
                      Client assessment
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 22,
                      color: '#394d58',
                      paddingTop: 10,
                    }}>
                    Our team will assess your profile and eligibility for the
                    Golden Visa programme and walk you through the complete
                    process and all the requirements involved.
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
                        backgroundColor: '#f5f2eb',
                      }}>
                      <Image
                        resizeMode="contain"
                        style={{width: 30, height: 30}}
                        source={require('../../images/Asset113-.png')}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#b0924a',
                        paddingLeft: 8,
                      }}>
                      Documentation
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 22,
                      color: '#394d58',
                      paddingTop: 10,
                    }}>
                    We will assist you in collecting and preparing the documents
                    required by the bank. These could include:
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 22,
                      color: '#394d58',
                      paddingTop: 25,
                    }}>
                    • Certified company incorporation documents
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 22,
                      color: '#394d58',
                      paddingTop: 3,
                    }}>
                    • Company profile
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 22,
                      color: '#394d58',
                      paddingTop: 3,
                    }}>
                    • Personal profiles (CVs) of all shareholders
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 22,
                      color: '#394d58',
                      paddingTop: 3,
                    }}>
                    • Valid passport copies of all shareholders
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 22,
                      color: '#394d58',
                      paddingTop: 3,
                    }}>
                    • 6 months personal bank statements of all shareholders
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 22,
                      color: '#394d58',
                      paddingTop: 3,
                    }}>
                    • Emirates ID and residence visa copy of at least the
                    signatory
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 22,
                      color: '#394d58',
                      paddingTop: 3,
                    }}>
                    • A copy of your Ejari/proof of UAE residential address
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    paddingTop: 30,
                  }}>
                  <View
                    style={{
                      padding: 10,
                      width: '100%',
                    }}>
                    <View
                      style={{
                        padding: 10,
                        backgroundColor: '#f5f2eb',
                        width: '100%',
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '700',
                          color: '#b0924a',
                          textAlign: 'center',
                        }}>
                        Standard requirements
                      </Text>
                    </View>

                    <Text style={{paddingTop: 5}}>
                      • Copies of your passport, visa and EID card
                    </Text>
                    <Text style={{paddingTop: 3}}>• UAE labour contract </Text>
                    <Text style={{paddingTop: 3}}>
                      • Salary certificate/income confirmation letter
                    </Text>
                    <Text style={{paddingTop: 3}}>
                      • Education certificate fully attested and legalised by
                      the UAE Ministry of Foreign Affairs
                    </Text>
                    <Text style={{paddingTop: 3}}>
                      • 6 months personal bank statements{' '}
                    </Text>
                    <Text style={{paddingTop: 3}}>
                      • Title deed, if you own property in the UAE{' '}
                    </Text>
                    <Text style={{paddingTop: 3}}>
                      • Reference letter from your employer or a person of
                      influence regarding your contribution to your industry or
                      the UAE economy
                    </Text>
                    <Text style={{paddingTop: 3}}>
                      • Copy of your CV or LinkedIn profile{' '}
                    </Text>
                    <Text style={{paddingTop: 3}}>
                      • Published articles and write-ups about you, your
                      business or your contribution to the UAE economy
                    </Text>
                  </View>
                  <View
                    style={{
                      padding: 10,
                      width: '100%',
                    }}>
                    <View
                      style={{
                        padding: 10,
                        backgroundColor: '#f5f2eb',
                        width: '100%',
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '700',
                          color: '#b0924a',
                          textAlign: 'center',
                        }}>
                        Existing UAE residents on a non-Dubai visa
                      </Text>
                    </View>

                    <Text style={{paddingTop: 5}}>
                      • AED 2 million fixed deposit for 2 years; non-breakable
                      in a local bank; bank confirmation letter is required
                    </Text>
                    <Text style={{paddingTop: 3}}>
                      • If the deposit is withdrawn/encashed, the visa will no
                      longer be available (risk of auto cancellation confirmed
                      by immigration){' '}
                    </Text>
                  </View>
                  <View
                    style={{
                      padding: 10,
                      width: '100%',
                    }}>
                    <View
                      style={{
                        padding: 10,
                        backgroundColor: '#f5f2eb',
                        width: '100%',
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '700',
                          color: '#b0924a',
                          textAlign: 'center',
                        }}>
                        Existing UAE residents on a Dubai visa (company
                        owners/investors)
                      </Text>
                    </View>

                    <Text style={{paddingTop: 5}}>
                      • Bank statements showing approximately AED 2 to 3 million
                      worth of movement/cash in bank accounts
                    </Text>
                    <Text style={{paddingTop: 3}}>
                      • All corporate document copies (licence, share
                      certificate, etc.)
                    </Text>
                    <Text style={{paddingTop: 3}}>
                      • If you hold the position of CEO, you must have been in
                      this position for more than 3 years.
                    </Text>
                    <Text style={{paddingTop: 3}}>
                      • If you are a company executive, you must have been in
                      this position for more than 5 years.
                    </Text>
                    <Text style={{paddingTop: 3}}>• Office lease or Ejari</Text>
                    <Text style={{paddingTop: 3}}>
                      • Audited financial statements
                    </Text>
                    <Text style={{paddingTop: 3}}>
                      • Audit firm’s licence copy
                    </Text>
                  </View>
                </View>
                <View style={{paddingTop: 35, width: '100%'}}>
                  <View
                    style={{
                      marginTop: 10,
                      paddingTop: 0,
                      paddingBottom: 10,
                      backgroundColor: '#f8f7f1',
                    }}>
                    <View
                      style={{backgroundColor: '#f1ebe0', paddingVertical: 5}}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '700',
                          color: '#b0924a',
                          textAlign: 'center',
                        }}>
                        OUR RATES
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: '#f1ebe0',
                        marginHorizontal: '2%',
                        marginTop: 25,
                        paddingHorizontal: 15,
                        borderLeftColor: '#b1934b',
                        borderLeftWidth: 2,
                      }}>
                      <Text
                        style={{
                          color: '#394d58',
                          paddingVertical: 13,
                        }}>
                        Enjoy the premium benefits of the UAE Golden Visa.
                        Initiate your golden visa application now with the
                        expert assistance of our team.
                      </Text>
                    </View>
                    <View
                      style={{
                        marginHorizontal: '2%',
                        marginTop: 25,
                        paddingHorizontal: 15,
                        borderTopColor: '#b1934b',
                        borderTopWidth: 1,
                        borderBottomColor: '#b1934b',
                        borderBottomWidth: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          color: '#394d58',
                          paddingVertical: 10,
                        }}>
                        Success fee*
                      </Text>
                      <Text
                        style={{
                          color: '#394d58',
                          paddingVertical: 10,
                          fontWeight: '600',
                        }}>
                        AED 25,000.00
                      </Text>
                    </View>
                    <View
                      style={{
                        marginHorizontal: '2%',
                        paddingHorizontal: 15,
                        borderBottomColor: '#b1934b',
                        borderBottomWidth: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#394d58',
                          paddingVertical: 10,
                          width: '60%',
                        }}>
                        Disbursements (including visa fees, VIP medical test and
                        EID card registration fees)
                      </Text>
                      <Text
                        style={{
                          color: '#394d58',
                          paddingVertical: 10,
                          fontWeight: '600',
                        }}>
                        AED 25,000.00
                      </Text>
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
                        * A non-refundable pre-approval fee of AED 2,100 is
                        required in advance. This is included in the success
                        fee.
                      </Text>
                      <Text
                        style={{
                          color: '#394d58',
                          fontSize: 10,
                          padddingTop: 5,
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
                backgroundColor: '#b0924a',
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
                  borderColor: '#b0924a',
                  borderWidth: 2,
                }}>
                <Text
                  style={{color: '#b0924a', fontSize: 16, fontWeight: '700'}}>
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
