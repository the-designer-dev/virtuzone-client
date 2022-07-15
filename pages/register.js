import {
  ImageBackground,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  View,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TextInput} from 'react-native-paper';
import TextField from '../components/inputField';
import React, {useState, useRef} from 'react';
import IntlPhoneInput from 'react-native-international-telephone-input';

export default function Register({navigation}) {
  const [name, onChangeName] = React.useState(null);
  const [email, onChangeEmail] = React.useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');

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
          style={styles.input}
          label="Full Name"
          left={
            <TextInput.Icon
              name={() => <Image source={require('../images/User1.png')} />}
            />
          }
        />
        <TextField
          style={styles.input}
          label="Email Address"
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
            lang="EN"
          />
        </SafeAreaView>

        <View>
          <TextField
            style={styles.input}
            label="Password"
            secureTextEntry
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
            // if (swiper.current.state.index > 1) {
            //     navigation.navigate('SignIn');
            // } else {
            //     swiper.current.scrollBy(1);
            // }
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
  input: {
    roundness: 10,
    width: '100%',
    height: 50,
    marginBottom: 0,
    marginTop: 20,
    backgroundColor: '#ffffff',
  },
  phoneInput: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.20)',
    roundness: 10,
    width: '100%',
    height: 50,
    marginBottom: 0,
    marginTop: 20,
    padding: 1,
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
