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
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Dimensions} from 'react-native';

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
const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');

export default function Home({navigation}) {
  const swiper = useRef(null);
  const dispatch = useDispatch();
  const [company, setCompany] = useState(null);
  const [expiry, setExpiry] = useState(null);
  const {promotions} = useSelector(state => state.promotions);

  const [entries, setEntries] = useState([]);
  const progressValue = useSharedValue(0);

  useEffect(() => {
    async function func() {
      const token = await AsyncStorage.getItem('@jwt');
      const id = await AsyncStorage.getItem('@id');
      const companyData = await axios({
        method: 'GET',
        url: `${REACT_APP_BASE_URL}/company?owner=${id}`,
      }).catch(err => console.log(err));
      console.log(companyData.data.company[0].name);
      setCompany(companyData.data.company[0]);
      setExpiry(
        formatDistanceStrict(
          new Date(),
          new Date(companyData.data.company[0].expiryDate),
        ),
      );
    }
    func();
    return () => {
      // dispatch(setSidebar(false));
    };
  }, []);
  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH * 0.85,
    height: '100%',
  };

  return (
    <LinearGradient
      colors={['#eedfe0', '#dbdcdc']}
      style={styles.gradientStyle}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}>
        <SafeAreaView style={{flex:1}}>
      <View style={{flex: 1, padding: 24}}>
        <SidebarLayout
          header={company?.name}
          subheader={`Exipires in: ${expiry}`}
        />

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
                    onPress={() => {
                      Linking.openURL(`http://${item.link}`).catch(err =>
                        console.error("Couldn't load page", err),
                      );
                    }}>
                    <ImageBackground
                      source={{uri: item.image}}
                      resizeMode="stretch"
                      style={{
                        width: '100%',
                        height: 180,
                        borderRadius: 25,
                        overflow: 'hidden',
                      }}>
                      {/* <View
                      style={{
                        flex: 1,
                        paddingHorizontal: 15,
                        paddingVertical: 17,
                      }}>
                      <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                      style={{
                        fontSize: 10,
                        fontWeight: '700',
                        color: '#808487',
                      }}>
                      {item.documentType}
                      </Text>
                      <View
                      style={{
                        paddingVertical: 3,
                        paddingHorizontal: 12,
                        backgroundColor: '#1A8E2D',
                        borderRadius: 30,
                          }}>
                          <Text
                          style={{
                            fontSize: 8,
                            fontWeight: '700',
                            color: '#fff',
                          }}>
                          {item.status}
                          </Text>
                          </View>
                          </View>
                          <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                          }}>
                          <Text
                          style={{
                            fontWeight: '600',
                            fontSize: 20,
                            color: '#FDFDFD',
                          }}>
                          {item.companyName}
                          </Text>
                          </View>
                          <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View>
                          <Text
                          style={{
                            fontSize: 8,
                            fontWeight: '500',
                            color: '#CF3339',
                          }}>
                          License No:
                          </Text>
                          <Text
                          style={{
                            fontSize: 11,
                              fontWeight: '700',
                              color: '#FFF',
                            }}>
                            {item.licenseNo}
                            </Text>
                            </View>
                            <View>
                            <Text
                            style={{
                              fontSize: 8,
                              fontWeight: '500',
                              color: '#CF3339',
                              textAlign: 'right',
                            }}>
                            Expiry
                            </Text>
                            <Text
                            style={{
                              fontSize: 11,
                              fontWeight: '700',
                              color: '#FFF',
                              textAlign: 'right',
                            }}>
                            {item.expiryDate}
                            </Text>
                            </View>
                            </View>
                          </View> */}
                    </ImageBackground>
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
        <ScrollView style={{height: '100%', width: '100%', marginBottom: 60 }}>
          <View style={{width: '100%'}}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <ImageBackground
                resizeMode="stretch"
                source={require('../images/referBackground.png')}
                style={{
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                  borderRadius: 16,
                  borderWidth: 4,
                  borderColor: '#FFF',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 31,
                    paddingVertical: 21,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Text
                      style={{fontSize: 14, fontWeight: '600', color: '#000'}}>
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
                  </View>
                  <Image source={require('../images/referImage.png')} />
                </View>
              </ImageBackground>
            </View>
          </View>
          <View
            style={{
              paddingVertical: 24,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ViewTradeLicense')}>
              <MenuBox
                image={require('../images/license.png')}
                PAGE_WIDTH={PAGE_WIDTH}
                title="Trade License"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('ViewIncorporationDocuments')}>
              <MenuBox
                image={require('../images/documents.png')}
                PAGE_WIDTH={PAGE_WIDTH}
                title="Inc. Documents"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ViewVisas')}>
              <MenuBox
                image={require('../images/passport.png')}
                PAGE_WIDTH={PAGE_WIDTH}
                title="UAE Visas"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('ServiceRequest')}>
              <MenuBox
                image={require('../images/globe.png')}
                PAGE_WIDTH={PAGE_WIDTH}
                title="Service Request"
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
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

const styles = StyleSheet.create({
  gradientStyle: {
    width: '100%',
    height: '100%',
  },
});

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
