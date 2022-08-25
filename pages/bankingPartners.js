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

export default function BankingPartners({navigation}) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [id, setId] = useState(null);

  useEffect(() => {
    getMyStringValue = async () => {
      try {
        setId(await AsyncStorage.getItem('@id'));
        console.log(`${id} mila`);
      } catch (e) {
        console.log(e);
      }
    };
    getMyStringValue();
  }, []);

  async function sendData() {
    socket.emit(
      'recieveNotification',
      id,
      `Partner Inquiry`,
      `requested for an inquiry regarding banking partners.`,
      new Date(),
    );
  }

  return (
    <LinearGradient
      colors={['#eedfe0', '#dbdcdc']}
      style={styles.gradientStyle}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}>
        <SafeAreaView style={{flex:1}}>

      <View style={{height: '100%', padding: 24}}>
        <SidebarLayout header={'Partners'} />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{alignItems: 'flex-start', paddingTop: 12}}>
          <Image
            style={{padding: 0, alignSelf: 'flex-start'}}
            source={require('../images/BackBlack.png')}
          />
        </TouchableOpacity>
        <ScrollView style={{width: '100%', width: '100%', marginBottom: 70}}>
          <View
            style={{
              marginTop: 14,
              paddingHorizontal: 24,
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              borderRadius: 10,
            }}>
            <Text
              style={{
                paddingVertical: 24,
                fontSize: 16,
                fontWeight: '600',
                textAlign: 'center',
                color: '#000',
              }}>
              Get a UAE Bank Account
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                textAlign: 'center',
                color: '#000',
              }}>
              Our extensive partner programme gives our clients access to a
              range of exclusive benefits and services that build the foundation
              of their success.
            </Text>
            {/* <View style={{flex: 1, flexDirection: 'row', height: '100%'}}> */}
            <Image
              resizeMode="contain"
              style={{width: '100%', height: 400, alignSelf: 'flex-start'}}
              source={require('../images/banking.jpeg')}
            />
            {/* </View> */}
            <Pressable style={[styles.signInButton]} onPress={() => sendData()}>
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 17,
                  fontWeight: '700',
                  textAlign: 'center',
                }}>
                Learn More
              </Text>
            </Pressable>
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
