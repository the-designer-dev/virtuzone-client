import {
  ImageBackground,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import TextField from '../components/inputField';
import React, {useState, useRef} from 'react';
import IntlPhoneInput from 'react-native-international-telephone-input';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register({navigation}) {
  const [firstName, setFirstName] = useState(null);
  const [lastName, seLastName] = useState(null);
  const [email, setEmail] = useState(null);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScrollView>
      <ImageBackground
        source={require('../images/signIn.png')}
        style={{width: '100%', height: 300}}>
        <View style={styles.topheader}>
          <View style={styles.textView}>
            <Text style={styles.textStyle}>Register For</Text>
            <Text style={[styles.textStyle, {paddingBottom: 20}]}>
              New Account
            </Text>
            <Text style={styles.textStyle2}>
              Fill out the details below to signup for a Virtuzone official
              account.
            </Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.bottomSection}>
        <TextField
          label="First Name"
          onChangeText={text => setName(text)}
          left={
            <TextInput.Icon
              name={() => <Image source={require('../images/User1.png')} />}
            />
          }
        />
        <TextField
          label="Last Name"
          onChangeText={text => setFirstName(text)}
          left={
            <TextInput.Icon
              name={() => <Image source={require('../images/User1.png')} />}
            />
          }
        />
        <TextField
          label="Email Address"
          onChangeText={text => {
            setLastName(text);
          }}
          left={
            <TextInput.Icon
              name={() => (
                <Image source={require('../images/EnvelopeClosed.png')} />
              )}
            />
          }
        />

        <SafeAreaView>
          <IntlPhoneInput
            defaultCountry="PK"
            renderAction={() => <Text>XX</Text>}
            containerStyle={styles.phoneInput}
            onChangeText={data => {
              if (data.phoneNumber[0] === '0') {
                console.log(
                  `${data.dialCode}${data.phoneNumber.substring(1)}`.replace(
                    ' ',
                    '',
                  ),
                );
              } else {
                console.log(
                  `${data.dialCode}${data.phoneNumber}`.replace(' ', ''),
                );
              }
            }}
            lang="EN"
          />
        </SafeAreaView>

        <View>
          <TextField
            label="Password"
            secureTextEntry
            onChangeText={text => setPassword(text)}
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
        </View>

        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => {
            navigation.navigate('OtpScreen');
            const saveData = async () => {
              try {
                const save = await AsyncStorage.setItem('@email', email);
              } catch (e) {
                console.log('hello');
              }
            };
            saveData();
          }}>
          <Text style={{textAlign: 'center', fontSize: 20, color: '#FFF'}}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  topheader: {
    height: 300,
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
    padding: 24,
  },
  phoneInput: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.20)',
    roundness: 10,
    width: '100%',
    height: 60,
    marginTop: 7,
    backgroundColor: '#ffffff',
  },
  signInButton: {
    width: '100%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#CF3339',
    marginTop: 15,
  },
});
