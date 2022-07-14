import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';
import TextField from '../components/inputField';
export default function SignIn({navigation}) {
  return (
    <View>
      <ImageBackground
        source={require('../images/signIn.png')}
        style={{width: '100%', height: 300}}>
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
      <View style={styles.bottomSection}>
        <TextField
          label="Email Address"
          left={
            <TextInput.Icon
              name={() => (
                <Image source={require('../images/EnvelopeClosed.png')} />
              )}
            />
          }
        />
        <TextField
          label="Password"
          secureTextEntry
          left={
            <TextInput.Icon
              name={() => <Image source={require('../images/Password.png')} />}
            />
          }
        />
      </View>
    </View>
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
  },
});
