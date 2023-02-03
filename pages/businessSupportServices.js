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
import SidebarLayout from '../layouts/sidebarLayout';
import Pdf from 'react-native-pdf';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNFS from 'react-native-fs';
import {PermissionsAndroid, Platform} from 'react-native';
import SupportCard from '../images/support_card.svg';
import {REACT_APP_BASE_URL} from '@env';
import {socket} from '../sockets/socketConfig';
import Lottie from 'lottie-react-native';
const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');

export default function BusinessSupportServices({route, navigation}) {
  const [id, setId] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [allFiles, setAllFiles] = useState([
    {
      cardColor: '#6f5499',
      circleColor: '#8766ab',
      description:
        "Open a bank account with any of the UAE's most trusted banks.",
      image: require('../images/BankAccountOpening.png'),
      name1: 'Bank Account',
      name2: 'Opening',
      page: 'BankAccountOpening',
    },
    {
      cardColor: '#05a26a',
      circleColor: '#12b17b',
      description:
        'Manage your accounting, payroll and financial reports efficiently.',
      image: require('../images/AccountingIcon.png'),
      name1: 'Accounting',
      name2: '& Payroll Services',
      page: 'AccountingServices',
    },
    {
      cardColor: '#127039',
      circleColor: '#088241',
      description:
        'Ensure your business complies with the UAE’s tax regulations.',
      image: require('../images/VATIcon.png'),
      name1: 'VAT',
      name2: '& Tax Consultancy',
      page: 'VATServices',
    },
    {
      cardColor: '#13aa93',
      circleColor: '#02b6a6',
      description: 'Choose from a broad range of health insurance packages.',
      image: require('../images/HealthInsuranceIcon.png'),
      name1: 'Health',
      name2: 'Insurance',
      page: 'HealthInsurance',
    },
    {
      cardColor: '#e8812b',
      circleColor: '#f79835',
      description: 'Let us guide you through complex business regulations.',
      image: require('../images/MandatoryCompliance.png'),
      name1: 'Mandatory Compliance',
      name2: 'Services',
      page: 'MandatoryCompliance',
    },
    {
      cardColor: '#263e80',
      circleColor: '#374ca0',
      description:
        'Make sure someone is always available to collect your mail.',
      image: require('../images/MailManagement.png'),
      name1: 'Mail',
      name2: 'Management',
      page: 'MailManagement',
    },
    {
      cardColor: '#ac4b8f',
      circleColor: '#c4559e',
      description: 'Take your business online and enjoy 24/7 tech support.',
      image: require('../images/VirtualReceptionist.png'),
      name1: 'Virtual',
      name2: 'Receptionist',
      page: 'VirtualReceptionist',
    },
    {
      cardColor: '#0f86af',
      circleColor: '#1a98cf',
      description: 'Take your business online and enjoy 24/7 tech support.',
      image: require('../images/ITServices.png'),
      name1: 'IT',
      name2: 'Services',
      page: 'ITServices',
    },
    {
      cardColor: '#b92d39',
      circleColor: '#d1353c',
      description:
        'Get expert legal advice and understand the UAE’s business laws.',
      image: require('../images/LegalServices.png'),
      name1: 'Legal',
      name2: 'Services',
      page: 'LegalServices',
    },
    {
      cardColor: '#f27873',
      circleColor: '#f3837a',
      description: 'Leave the time-consuming admin tasks to our PRO team.',
      image: require('../images/PROServices.png'),
      name1: 'PRO',
      name2: 'Services',
      page: 'ProServices',
    },
    {
      cardColor: '#a07d3b',
      circleColor: '#1a2b54',
      description:
        'Access top European and Caribbean citizenship-by-investment programme.',
      image: require('../images/SecondCitizenship.png'),
      name1: 'Second',
      name2: 'Citizenship',
      page: 'SecondCitizenship',
    },
    {
      cardColor: '#09b2af',
      circleColor: '#10bac0',
      description:
        'Enjoy a smooth and hassle-free tourist visa application process.',
      image: require('../images/TouristVisa.png'),
      name1: 'Tourist',
      name2: 'Visa',
      page: 'TouristVisa',
    },

    {
      cardColor: '#a58542',
      circleColor: '#b0924a',
      description:
        'Enjoy a smooth and hassle-free tourist visa application process.',
      image: require('../images/GoldenVisa.png'),
      name1: 'Golden',
      name2: 'Visa',
      page: 'GoldenVisa',
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [inquiry, setInquiry] = useState('');

  // useFocusEffect(
  //   React.useCallback(() => {
  //     async function func() {
  //       const id = await AsyncStorage.getItem('@id');
  //       setId(id);
  //       const token = await AsyncStorage.getItem('@jwt');
  //       const supportServices = await axios({
  //         method: 'GET',
  //         url: `${REACT_APP_BASE_URL}/supportServices`,
  //         headers: {
  //           'x-auth-token': token,
  //         },
  //       }).catch(err => console.log(err));
  //       console.log(supportServices.data.supportServices[0]);
  //       var suppSer = [];
  //       await Promise.all(
  //         supportServices.data.supportServices.map(async (el, i) => {
  //           var file = await axios({
  //             method: 'GET',
  //             url: `${REACT_APP_BASE_URL}/files/${el.image}/true`,
  //             headers: {
  //               'x-auth-token': token,
  //             },
  //           }).catch(err => console.log(err));
  //           suppSer[i] = {
  //             ...el,
  //             icon: `data:${file.headers['content-type']};base64,${file.data}`,
  //           };

  //           return file;
  //         }),
  //       );
  //       setAllFiles(suppSer);
  //     }
  //     func();
  //   }, []),
  // );

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
        <View style={{flex: 1, padding: 24}}>
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

          <SafeAreaView style={{flex: 1}}>
            <SidebarLayout header={'Business Support'} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                paddingTop: 12,
              }}>
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
                  width: PAGE_WIDTH - 125,
                }}>
                Business Support
              </Text>
            </View>
            <FlatList
              style={{paddingTop: 12}}
              data={allFiles}
              renderItem={({item}) => (
                <View
                  style={{
                    marginVertical: 11,
                    width: '100%',
                    height: 180,
                    position: 'relative',
                  }}>
                  <SupportCard
                    style={{position: 'absolute', top: 0}}
                    width={'100%'}
                    height={180}
                    fill={item.circleColor}
                    fillSecondary={item.cardColor}
                  />

                  <View
                    style={{
                      paddingVertical: 11,
                      // marginVertical: 11,
                      paddingHorizontal: 29,
                      width: '100%',
                      height: 180,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        borderRadius: 10,
                        width: PAGE_WIDTH - 230,
                        // height: '100%',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignContent: 'flex-start',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: '700',
                            color: '#fff',
                          }}>
                          {item.name1}
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: '300',
                              color: '#fff',
                            }}>
                            {' ' + item.name2}
                          </Text>
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '600',
                          color: '#fff',
                          paddingVertical: 12,
                          flexWrap: 'wrap',
                        }}>
                        {item.description}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate(item.page);
                          // setConfirmModalVisible(true);
                          // setInquiry(item.name);
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            paddingHorizontal: 10,
                            paddingVertical: 2,
                            borderRadius: 12,
                            borderColor: '#fff',
                            borderWidth: 1,
                            alignItems: 'center',
                          }}>
                          <Text style={{fontSize: 11, color: '#fff'}}>
                            Inquire
                          </Text>
                          <Image source={require('../images/ArrowIcon.png')} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        padding: 25,
                        backgroundColor: '#f0eff7',
                        borderRadius: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={item.image}
                        resizeMode="contain"
                        style={{
                          width: 60,
                          height: 60,
                        }}
                      />
                    </View>
                  </View>
                </View>
              )}
            />
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
