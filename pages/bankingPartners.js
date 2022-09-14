import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  Alert,
  SafeAreaView,
  FlatList,
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
import SidebarLayout from '../layouts/sidebarLayout';
import {ScrollView} from 'react-native-gesture-handler';
import {socket} from '../sockets/socketConfig';

const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');

export default function BankingPartners({navigation}) {
  const allFiles = [
    {name: 'INFORMATION', image: require('../images/partner1.png')},
    {
      name: 'TRANSPORTATION & LOGISTICS',
      image: require('../images/partner2.png'),
    },
    {name: 'INSURANCE', image: require('../images/partner3.png')},
    {
      name: 'INTERNATIONAL PARCEL DELIVERY',
      image: require('../images/partner4.png'),
    },
    {
      name: 'INNOVATION LAUNCHPAD FOR ENTREPRENEURS',
      image: require('../images/partner5.png'),
    },
    {
      name: 'VIRTUAL PERSONAL ASSISTANT SERVICE',
      image: require('../images/partner6.png'),
    },
    {
      name: 'PAYMENT SOLUTION FOR MICRO BUSINESSES',
      image: require('../images/partner7.png'),
    },
    {name: 'MOTIVACTION BY ETISALAT', image: require('../images/partner8.png')},
    {
      name: 'DIGITAL BANKING FOR ENTREPRENEURS',
      image: require('../images/partner9.png'),
    },
    {name: 'CRM PLATFORM AND SERVICES', image: require('../images/partner10.png')},
    {name: 'BUSINESS FOR SALES MARKETPLACE', image: require('../images/partner11.png')},
    {name: 'INVESTMENT', image: require('../images/partner12.png')},
    {name: 'HELLO BUSINESS HUB', image: require('../images/partner13.png')},
    {name: 'ISO CERTIFICATION SYSTEMS', image: require('../images/partner14.png')},
    {name: 'DIGITAL MARKETING SOLUTIONS', image: require('../images/partner15.png')},
    {name: 'CAR RENTAL SERVICE', image: require('../images/partner16.png')},
    {name: 'ONLINE PAYMENTS AND TRANSACTIONS', image: require('../images/partner17.png')},
    {name: 'PAYMENT GATEWAY', image: require('../images/partner18.png')},
    {name: 'PHOTOGRAPHY', image: require('../images/partner19.png')},
    {name: 'PREMIUM OFFICE SPACE AND WORKSPACE SOLUTIONS', image: require('../images/partner20.png')},
  ];

  return (
    <LinearGradient
      colors={['#eedfe0', '#dbdcdc']}
      style={styles.gradientStyle}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{height: '100%', padding: 24}}>
          <SidebarLayout header={'Our Partners'} />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{alignItems: 'flex-start', paddingTop: 12}}>
            <Image
              style={{padding: 0, alignSelf: 'flex-start'}}
              source={require('../images/BackBlack.png')}
            />
          </TouchableOpacity>

          <Text
            style={{
              fontWeight: '700',
              fontSize: 12,
              color: '#000',
              textAlign: 'center',
            }}>
            ENJOY EXCLUSIVE BENEFITS
          </Text>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 12,
              color: '#000',
              textAlign: 'center',
              paddingTop: 20,
            }}>
            Our extensive partner programme gives our clients access to a range
            of exclusive benefits and services that build the foundation of
            their success.
          </Text>

          <FlatList
            style={{marginTop: 12}}
            data={allFiles}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ReachPartners', {companyName: item.name})
                }>
                <View
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 16,

                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 4.65,

                    elevation: 8,
                    width: (PAGE_WIDTH - 86) / 2,
                    height: 120,
                    marginLeft: 14,
                    marginBottom: 14,
                    paddingBottom: 17,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    resizeMethod="resize"
                    resizeMode="contain"
                    style={{
                      width: 100,
                      height: 40,
                      marginHorizontal: 47,
                      marginVertical: 17,
                    }}
                    source={item.image}
                  />
                  <Text
                    style={{
                      paddingHorizontal: 5,
                      fontWeight: '600',
                      fontSize: 12,
                      color: '#000',
                      textAlign: 'center',
                    }}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            numColumns={2}
          />
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
  signInButton: {
    marginVertical: 24,
    marginTop: 22,
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: '#CF3339',
  },
});
