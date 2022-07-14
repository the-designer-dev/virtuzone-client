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
      <View>
        <ImageBackground
          source={require('../images/signIn.png')}
          style={{width: '100%', height: '100%'}}>
          <Text>Sign In</Text>
          <Text>To Account</Text>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
