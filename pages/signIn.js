import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import TextField from '../components/inputField';
import axios from 'axios';
import {REACT_APP_BASE_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function SignIn({navigation}) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  function signIn() {
    console.log(REACT_APP_BASE_URL);
    axios({
      method: 'POST',
      url: `${REACT_APP_BASE_URL}/login`,
      data: {
        email: email,
        password: password,
      },
    })
      .then(async res => {
        console.log(res.data);
        await AsyncStorage.setItem('@id', res.data._id);
        navigation.navigate('HomeStack');
      })
      .catch(er => console.log(er.response));
  }
  return (
    <View style={{height: '100%'}}>
      <ImageBackground
        source={require('../images/signIn.png')}
        style={{width: '100%', height: 250}}>
        <View style={styles.topheader}>
          <View style={styles.textView}>
            <Text style={styles.textStyle}>Sign In</Text>
            <Text style={[styles.textStyle, {paddingBottom: 20}]}>
              To Account
            </Text>
            <Text style={styles.textStyle2}>
              Sign with username or email and password to use your account.
            </Text>
          </View>
        </View>
      </ImageBackground>
      <ScrollView style={styles.bottomSection}>
        <View style={{height: '100%', padding: 24}}>
          <View style={{paddingBottom: 20}}>
            <TextField
              style={{marginBottom: 5}}
              label="Email Address"
              onChangeText={text => setEmail(text)}
              left={
                <TextInput.Icon
                  name={() => (
                    <Image source={require('../images/EnvelopeClosed.png')} />
                  )}
                />
              }
            />
            <TouchableOpacity style={{alignSelf: 'flex-end'}}>
              <Text style={styles.forgotButtonStyle}>Forgot Email ID?</Text>
            </TouchableOpacity>
          </View>
          <View style={{paddingBottom: 20}}>
            <TextField
              style={{marginBottom: 5}}
              label="Password"
              secureTextEntry
              onChangeText={text => {
                setPassword(text);
              }}
              left={
                <TextInput.Icon
                  name={() => (
                    <Image source={require('../images/Password.png')} />
                  )}
                />
              }
              right={
                <TextInput.Icon
                  name={() => (
                    <TouchableOpacity>
                      <Image source={require('../images/Hide.png')} />
                    </TouchableOpacity>
                  )}
                />
              }
            />
            <TouchableOpacity style={{alignSelf: 'flex-end'}}>
              <Text style={styles.forgotButtonStyle}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => {
              if (email !== null && password !== null) {
                signIn();
              }
            }}>
            <Text style={{textAlign: 'center', fontSize: 20, color: '#FFF'}}>
              Sign In
            </Text>
          </TouchableOpacity>
          <View style={{width: '100%', height: 50}}>
            <View
              style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{fontSize: 14, fontWeight: '500', paddingRight: 5}}>
                Don’t have account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#CF3339',
                    fontWeight: 'bold',
                    textDecorationLine: 'underline',
                  }}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                flex: 2,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flex: 2,
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image source={require('../images/FingerprintScan.png')} />
                <Text style={{width: 100, textAlign: 'center'}}>
                  Login with Fingerprint
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{width: 5}}>
              <Image source={require('../images/Rectangle.png')} />
            </View>

            <TouchableOpacity
              style={{
                flex: 2,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flex: 2,
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image source={require('../images/FaceId.png')} />
                <Text style={{width: 100, textAlign: 'center'}}>
                  Login with Face ID
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 50,
              alignSelf: 'center',
              justifyContent: 'flex-end',
            }}>
            <Image source={require('../images/Tagline.png')} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  topheader: {
    height: 250,
    padding: 24,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  textStyle: {fontSize: 35, fontWeight: 'bold', color: '#FFF'},
  textStyle2: {fontSize: 16, fontWeight: '400', color: '#FFF'},
  bottomSection: {
    flexGrow: 1,
    backgroundColor: '#f1f1f1',
    height: '100%',
    width: '100%',
  },
  forgotButtonStyle: {
    fontSize: 10,
    fontWeight: '500',
    color: '#777777',
  },
  signInButton: {
    width: '100%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#CF3339',
    marginBottom: 15,
  },
});
