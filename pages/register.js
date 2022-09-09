import {
  ImageBackground,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import TextField from '../components/inputField';
import React, {useState, useRef} from 'react';
import IntlPhoneInput from 'react-native-international-telephone-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {REACT_APP_BASE_URL} from '@env';

const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');

export default function Register({navigation}) {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function sendData() {
    console.log(REACT_APP_BASE_URL);
    axios({
      method: 'POST',
      url: `${REACT_APP_BASE_URL}/signup`,
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobile: phoneNumber,
        password: password,
        confirmPassword: confirmPassword,
        isVerified: false,
        role: 'client',
      },
    })
      .then(res => {
        console.log(res.message);
        const _storeData = async () => {
          try {
            await AsyncStorage.setItem('@id', res.data.objectId);
          } catch (error) {
            console.log(error);
          }
        };
        _storeData();
        navigation.navigate('OtpScreen');
      })
      .catch(err => {
        console.log(err);
        Alert.alert('', 'Email already registered', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      });
  }

  return (
    <View style={{height: '100%'}}>
      <ImageBackground
        source={require('../images/SignIn.jpg')}
        style={{width: '100%', height: 250}}>
        <View style={styles.topheader}>
          <View style={styles.textView}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{alignItems: 'flex-start', padding: 0}}>
              <Image
                style={{padding: 0, alignSelf: 'flex-start'}}
                source={require('../images/Back.png')}
              />
            </TouchableOpacity>
            <Text style={styles.textStyle}>Register for</Text>
            <Text style={[styles.textStyle, {paddingBottom: 20}]}>
              New Account
            </Text>
            {/* <Text style={styles.textStyle2}>
              Fill out the details below to signup for a Virtuzone official
              account.
            </Text> */}
          </View>
        </View>
      </ImageBackground>

      <ScrollView style={styles.bottomSection}>
        <View style={{height: '100%', padding: 24}}>
          <SafeAreaView style={{marginBottom: 20}}>
            <TextField
              label="First Name"
              onChangeText={text => setFirstName(text)}
              left={
                <TextInput.Icon
                  resizeMode="contain"
                  style={{width: 25}}
                  name={() => (
                    <Image
                      resizeMode="contain"
                      style={{width: 25}}
                      source={require('../images/User1.png')}
                    />
                  )}
                />
              }
            />
          </SafeAreaView>
          <SafeAreaView style={{marginBottom: 20}}>
            <TextField
              label="Last Name"
              onChangeText={text => setLastName(text)}
              left={
                <TextInput.Icon
                  name={() => (
                    <Image
                      resizeMode="contain"
                      style={{width: 25}}
                      source={require('../images/User1.png')}
                    />
                  )}
                />
              }
            />
          </SafeAreaView>

          <SafeAreaView style={{marginBottom: 20}}>
            <TextField
              label="Email Address"
              onChangeText={text => setEmail(text)}
              left={
                <TextInput.Icon
                  name={() => (
                    <Image
                      resizeMode="contain"
                      style={{width: 25}}
                      source={require('../images/EnvelopeClosed.png')}
                    />
                  )}
                />
              }
            />
          </SafeAreaView>

          <SafeAreaView style={{marginBottom: 20}}>
            <IntlPhoneInput
              // flagStyle={{display: 'none'}}
              defaultCountry="AE"
              renderAction={() => <Text>XX</Text>}
              containerStyle={styles.phoneInput}
              onChangeText={data => {
                if (data.phoneNumber[0] === '0') {
                  setPhoneNumber(
                    `${data.dialCode}${data.phoneNumber.substring(1)}`.replace(
                      ' ',
                      '',
                    ),
                  );
                } else {
                  setPhoneNumber(
                    `${data.dialCode}${data.phoneNumber}`.replace(' ', ''),
                  );
                }
              }}
              lang="EN"
            />
          </SafeAreaView>

          <View style={{marginBottom: 20}}>
            <TextField
              label="Password"
              secureTextEntry
              onChangeText={text => setPassword(text)}
              left={
                <TextInput.Icon
                  name={() => (
                    <Image
                      resizeMode="contain"
                      style={{width: 25}}
                      source={require('../images/password_icon.png')}
                    />
                  )}
                />
              }
              right={
                <TextInput.Icon
                  onPress={() => {
                    setShowPassword(!showPassword);
                  }}
                  name={() =>
                    showPassword ? (
                      <Image
                        resizeMode="contain"
                        style={{width: 25}}
                        source={require('../images/eyeOpen.png')}
                      />
                    ) : (
                      <Image
                        resizeMode="contain"
                        style={{width: 25}}
                        source={require('../images/Hide.png')}
                      />
                    )
                  }
                />
              }
            />
          </View>

          <View style={{marginBottom: 20}}>
            <TextField
              label="Confirm Password"
              secureTextEntry
              onChangeText={text => setConfirmPassword(text)}
              left={
                <TextInput.Icon
                  name={() => (
                    <Image
                      resizeMode="contain"
                      style={{width: 25}}
                      source={require('../images/password_icon.png')}
                    />
                  )}
                />
              }
              right={
                <TextInput.Icon
                  onPress={() => {
                    setShowConfirmPassword(!showConfirmPassword);
                  }}
                  name={() =>
                    showConfirmPassword ? (
                      <Image
                        resizeMode="contain"
                        style={{width: 25}}
                        source={require('../images/eyeOpen.png')}
                      />
                    ) : (
                      <Image
                        resizeMode="contain"
                        style={{width: 25}}
                        source={require('../images/Hide.png')}
                      />
                    )
                  }
                />
              }
            />
          </View>

          <TouchableOpacity
            style={styles.signInButton}
            onPress={async () => {
              const _storeData = async () => {
                try {
                  await AsyncStorage.setItem('@email', email);
                } catch (error) {
                  console.log(error);
                }
              };
              _storeData();
              sendData();
            }}>
            <Text style={{textAlign: 'center', fontSize: 20, color: '#FFF'}}>
              Register Now
            </Text>
          </TouchableOpacity>

          <View
            style={{
              marginBottom: 24,
              alignSelf: 'center',
              justifyContent: 'flex-start',
            }}>
            <Image
              resizeMode="contain"
              style={{width: PAGE_WIDTH - 186}}
              source={require('../images/Tagline.png')}
            />
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
    flex: 1,
    justifyContent: 'flex-end',
  },
  textStyle: {fontSize: 35, fontWeight: 'bold', color: '#FFF'},
  textStyle2: {fontSize: 16, fontWeight: '400', color: '#FFF'},

  bottomSection: {
    backgroundColor: '#f1f1f1',
    height: '100%',
    width: '100%',
  },
  phoneInput: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.20)',
    roundness: 10,
    width: '100%',
    height: 60,
    backgroundColor: '#ffffff',
  },
  signInButton: {
    width: '100%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#CF3339',
    marginBottom: 16,
  },
});
