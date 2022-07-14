import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

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
      <View></View>
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
  },
});
