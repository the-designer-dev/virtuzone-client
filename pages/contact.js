import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
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
import TextField from '../components/inputField';
import MenuBox from '../components/menuBox';
import SidebarLayout from '../layouts/sidebarLayout';
import {ScrollView} from 'react-native-gesture-handler';

const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');

export default function Home({navigation}) {
  const swiper = useRef(null);
  const [entries, setEntries] = useState([
    {
      documentType: 'Trade License',
      status: 'Active',
      companyName: 'Express PRO FZ LLC',
      licenseNo: '5522114',
      expiryDate: '02-Jun-2025',
    },
    {
      documentType: 'Trade License',
      status: 'Active',
      companyName: 'Express PRO FZ LLC',
      licenseNo: '5522114',
      expiryDate: '02-Jun-2025',
    },
  ]);
  const progressValue = useSharedValue(0);

  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH * 0.85 - 90,
    height: '100%',
  };

  return (
    <LinearGradient
      colors={['#eedfe0', '#dbdcdc']}
      style={styles.gradientStyle}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}>
      <View style={{height: '100%', padding: 24}}>
        <SidebarLayout header={'Contact'} />
        <ScrollView style={{width: '100%', width: '100%'}}>
          <View
            style={{
              paddingVertical: 24,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                backgroundColor: '#131313',
                borderTopRightRadius: 16,
                borderTopLeftRadius: 16,
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 14,
                  color: '#FFFFFF',
                }}>
                Main Office
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#fff',
                padding: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{flex: 1, flexWrap: 'wrap'}}>
                Al Saaha Office B, 404, Souk Al Bahar Burj Khalifa District,
                Dubai, UAE.
              </Text>
              <View style={{alignItems: 'center'}}>
                <Image
                  resizeMode="contain"
                  source={require('../images/Location.png')}
                />
                <Text style={{fontWeight: '700', fontSize: 10}}>
                  Get Directions
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#cf3339',
                paddingHorizontal: 28,
                paddingVertical: 6,
                borderBottomRightRadius: 16,
                borderBottomLeftRadius: 16,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image source={require('../images/Phone.png')} />
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: 14,
                    color: '#fff',
                    paddingLeft: 10,
                  }}>
                  Call Us Now
                </Text>
              </View>

              <View
                style={{
                  flex: 1,

                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image source={require('../images/Line.png')} />
              </View>
              <View
                style={{
                  flex: 1,

                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image source={require('../images/chat.png')} />
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: 14,
                    color: '#fff',
                    paddingLeft: 10,
                  }}>
                  Chat with Us
                </Text>
              </View>
            </View>
          </View>
          <View style={{paddingHorizontal: 24, alignItems: 'center'}}>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 14,
                textAlign: 'center',
                color: '#131313',
              }}>
              Have a question for us? You can also send a custom message by
              filling the form below.
            </Text>
          </View>
          <View>
            <TextField
              style={{marginTop: 24}}
              label="Subject"
              onChangeText={text => {
                setPassword(text);
              }}
            />
            <TextField
              style={{marginTop: 24}}
              label="Your Message"
              multiline
              numberOfLines={4}
              onChangeText={text => {
                setPassword(text);
              }}
            />
            <Pressable
              style={[styles.signInButton]}
              onPress={() => navigation.navigate('SignIn')}>
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 17,
                  fontWeight: '700',
                  textAlign: 'center',
                }}>
                Sign In
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientStyle: {
    width: '100%',
    height: '100%',
  },
  signInButton: {
    width: '100%',
    marginTop: 22,
    alignSelf: 'center',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#CF3339',
  },
});