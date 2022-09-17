import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
  SafeAreaView,
  Pressable,
  Modal,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Dimensions} from 'react-native';
import Lottie from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {REACT_APP_BASE_URL} from '@env';
import Carousel from 'react-native-reanimated-carousel';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import MenuBox from '../components/menuBox';
import SidebarLayout from '../layouts/sidebarLayout';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setSidebar} from '../reducers/sidebar';
import {useSelector} from 'react-redux';
import {formatDistanceStrict} from 'date-fns';
import {
  Gesture,
  GestureDetector,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';
const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');

export default function Home({navigation}) {
  const swiper = useRef(null);
  const dispatch = useDispatch();
  const [company, setCompany] = useState(null);
  const [expiry, setExpiry] = useState(null);
  const [demo, setDemo] = useState(null);
  const [modalVisible , setModalVisible] = useState(false)
  const {promotions} = useSelector(state => state.promotions);

  const [entries, setEntries] = useState([]);
  const progressValue = useSharedValue(0);

  useEffect(() => {
    async function func() {
      const token = await AsyncStorage.getItem('@jwt');
      const id = await AsyncStorage.getItem('@id');
      setDemo(await AsyncStorage.getItem('@demo'))
      console.log(await AsyncStorage.getItem('@demo'))
      const companyData = await axios({
        method: 'GET',
        url: `${REACT_APP_BASE_URL}/company?owner=${id}`,
      }).catch(err => console.log(err));
      console.log(companyData.data.company[0].name);
      setCompany(companyData.data.company[0]);
      setExpiry(
        new Date() > new Date(companyData.data.company[0].expiryDate)
          ? `Expired since: ${formatDistanceStrict(
              new Date(),
              new Date(companyData.data.company[0].expiryDate),
              {
                unit:'day'
              }
            )}`
          : `Expires in: ${formatDistanceStrict(
              new Date(companyData.data.company[0].expiryDate),
              new Date(),
              {
                unit:'day'
              }
            )}`,
      );
    }
    func();
    return () => {
      // dispatch(setSidebar(false));
    };
  }, []);
  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH - 24,
    height: '100%',
  };
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const onSingleTapEvent = event => {
    alert('Hey single tap!');

    if (event.nativeEvent.state === State.ACTIVE) {
      alert('Hey single tap!');
    }
  };
  var seconds = 0;
  var timer;
  return (
    <LinearGradient
      colors={['#eedfe0', '#dbdcdc']}
      style={styles.gradientStyle}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}>
      <SafeAreaView style={{flex: 1}}>
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
                        source={require('../images/error_cone.json')}
                        loop={false}
                        autoPlay
                      />

              <Text
                style={{
                  paddingTop: 31,
                  fontSize: 24,
                  fontWeight: '500',
                  color: '#CF3339',
                  textAlign: 'center',
                }}>
                Looks like your company is not registered
              </Text>
              <Text
                style={{
                  paddingTop: 10,
                  fontSize: 15,
                  fontWeight: '500',
                  color: '#000',
                  textAlign: 'center',
                }}>
                Please contact one of our sales representatives
              </Text>
              <Pressable
                style={[styles.doneButton]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={{color: '#FFF', fontSize: 17, fontWeight: '700'}}>
                  Done
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <View style={{flex: 1, padding: 24}}>
          <SidebarLayout header={company?.name} subheader={expiry} />

          <View style={{paddingTop: 24, flexDirection: 'row'}}>
            {/* <TouchableOpacity
            onPress={() => {
              setEntries([
                ...entries,
                {
                  documentType: 'Trade License',
                  status: 'Active',
                  companyName: 'Express PRO FZ LLC',
                  licenseNo: '5522114',
                  expiryDate: '02-Jun-2025',
                },
              ]);
            }}>
            <View
              style={{
                backgroundColor: '#e3dede',
                borderWidth: 2,
                borderColor: 'rgba(0, 0, 0, 0.15)',
                height: 180,
                width: 50,
                borderRadius: 16,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{padding: 0, alignSelf: 'center'}}
                source={require('../images/X_Mark.png')}
              />
            </View>
          </TouchableOpacity> */}

            <Carousel
              {...baseOptions}
              loop={false}
              ref={swiper}
              style={{width: '100%', paddingLeft: 0, height: 180}}
              autoPlay={false}
              autoPlayInterval={2000}
              onProgressChange={(_, absoluteProgress) =>
                (progressValue.value = absoluteProgress)
              }
              data={promotions}
              pagingEnabled={true}
              onSnapToItem={index => console.log('current index:', index)}
              renderItem={({item, index}) => {
                return (
                  <View style={{flex: 1, marginRight: 20}}>
                    <TouchableOpacity
                      onPressIn={() => {
                        seconds = 0;
                        timer = setInterval(function () {
                          seconds++;
                        }, 5);
                      }}
                      onPressOut={() => {
                        console.log(seconds);
                        if (seconds < 5) {
                          seconds = 0;

                          Linking.openURL(`http://${item.link}`).catch(err =>
                            console.error("Couldn't load page", err),
                          );
                          seconds = 0;
                          clearTimeout(timer);
                        } else {
                          seconds = 0;
                          clearTimeout(timer);
                        }
                      }}
                      // onPress={() => {
                      //   Linking.openURL(`http://${item.link}`).catch(err =>
                      //     console.error("Couldn't load page", err),
                      //   );
                      // }}
                    >
                      {/* <TapGestureHandler 
                       onHandlerStateChange={event => {
                         if (event.nativeEvent.state === State.ACTIVE) {
                           console.log('hello');
                           Linking.openURL(`http://${item.link}`).catch(err =>
                             console.error("Couldn't load page", err),
                           );
                         }
                       }}
                       enabled={true}
                       onHandlerStateChange={onSingleTapEvent}> */}
                      <ImageBackground
                        source={{uri: item.image}}
                        resizeMode="stretch"
                        style={{
                          width: '100%',
                          height: 180,
                          borderRadius: 25,
                          overflow: 'hidden',
                        }}></ImageBackground>
                      {/* </TapGestureHandler> */}
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
              alignSelf: 'center',
              paddingVertical: 24,
            }}>
            {promotions.map((data, index) => {
              return (
                <PaginationItem
                  backgroundColor={'#CF3339'}
                  animValue={progressValue}
                  index={index}
                  key={index}
                  length={promotions.length}
                />
              );
            })}
          </View>
          <ScrollView
            style={{
              height: '100%',
              width: '100%',
              marginBottom: 30,
            }}>
            <View style={{width: '100%'}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Refer');
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <ImageBackground
                    resizeMode="cover"
                    source={require('../images/VZ_Banner.jpg')}
                    style={{
                      width: '100%',
                      height: '100%',
                      overflow: 'hidden',
                      borderRadius: 16,
                      borderWidth: 4,
                      borderColor: '#DB7E81',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingLeft: 31,
                        // paddingVertical: 21,
                        height: 100,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                      }}>
                      {/* <View>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '600',
                            color: '#000',
                          }}>
                          Refer & Earn upto
                        </Text>
                        <Text
                          style={{
                            fontSize: 28,
                            fontWeight: '700',
                            color: '#CF3339',
                          }}>
                          AED 2,500
                        </Text>
                      </View> */}
                      {/* <Image source={require('../images/referImage.png')} /> */}
                      <Lottie
                        resizeMode="cover"
                        style={{
                          width: '50%',
                          height: '100%',
                        }}
                        source={require('../images/referLottie.json')}
                        loop={true}
                        autoPlay
                      />
                    </View>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                paddingVertical: 24,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity
                onPress={() => demo==="false"? navigation.navigate('ViewTradeLicense'):setModalVisible(true)}>
                <MenuBox
                  image={require('../images/license.png')}
                  PAGE_WIDTH={PAGE_WIDTH}
                  title="Trade Licence"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  demo==="false"? 
                  navigation.navigate('ViewIncorporationDocuments'):
                  setModalVisible(true)
                }>
                <MenuBox
                  image={require('../images/documents.png')}
                  PAGE_WIDTH={PAGE_WIDTH}
                  title="Inc. Documents"
                />
              </TouchableOpacity>
              <TouchableOpacity
            
                onPress={() =>   demo==="false"? navigation.navigate('ViewVisas') : setModalVisible(true)}
                
                >
                <MenuBox
                  image={require('../images/passport.png')}
                  PAGE_WIDTH={PAGE_WIDTH}
                  title="UAE Visas"
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                paddingBottom: 24,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ServiceRequest')}>
                <MenuBox
                  image={require('../images/globe.png')}
                  PAGE_WIDTH={PAGE_WIDTH}
                  title="Service Request"
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('BusinessSupportServices')}>
                <MenuBox
                  image={require('../images/team.png')}
                  PAGE_WIDTH={PAGE_WIDTH}
                  title="Business Support"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('BookAnAppointment');
                }}>
                <MenuBox
                  image={require('../images/Calendar.png')}
                  PAGE_WIDTH={PAGE_WIDTH}
                  title="Book an Appointment"
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                paddingBottom: 40,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('BankingPartners')}>
                <MenuBox
                  image={require('../images/handshake.png')}
                  PAGE_WIDTH={PAGE_WIDTH}
                  title="Partners"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SpecialOffers');
                }}>
                <MenuBox
                  image={require('../images/badge.png')}
                  PAGE_WIDTH={PAGE_WIDTH}
                  title="Special Offers"
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const PaginationItem = props => {
  const {animValue, index, length, backgroundColor} = props;
  const width = 10;
  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  }, [animValue, index, length]);
  return (
    <View
      style={{
        backgroundColor: 'white',
        marginHorizontal: 3,
        width: width,
        height: width,
        borderRadius: 50,
        overflow: 'hidden',
        transform: [
          {
            rotateZ: '0deg',
          },
        ],
      }}>
      <Animated.View
        style={[
          {
            borderRadius: 50,
            width: 10,
            backgroundColor,
            flex: 1,
          },
          animStyle,
        ]}
      />
    </View>
  );
};

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