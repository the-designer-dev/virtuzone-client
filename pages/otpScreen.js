import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  Pressable,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OtpScreen({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  var email;
  useEffect(() => {
    getMyStringValue = async () => {
      try {
        email = await AsyncStorage.getItem('@email');
      } catch (e) {
        console.log(e);
      }
    };
    getMyStringValue();
  }, []);

  return (
    <View style={styles.topheader}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={[
            styles.centeredView,
            modalVisible ? {backgroundColor: 'rgba(0,0,0,0.5)'} : '',
          ]}>
          <View style={styles.modalView}>
            <Image source={require('../images/Illustration.png')} />
            <Text
              style={{
                paddingTop: 20,
                paddingBottom: 20,
                fontSize: 15,
                fontWeight: '500',
                textAlign: 'center',
                color: '#000',
              }}>
              Congratulations
            </Text>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '500',
                color: '#cf3339',
                textAlign: 'center',
              }}>
              You are member now!
            </Text>
            <Text
              style={{
                paddingTop: 10,
                paddingBottom: 20,
                fontSize: 15,
                fontWeight: '500',
                color: '#000',
                textAlign: 'center',
              }}>
              Get ready to start using Virtuzone App for your business setup.
            </Text>
            <Pressable
              style={[styles.signInButton]}
              onPress={() => navigation.navigate('SignIn')}>
              <Text style={{color: '#FFF', fontSize: 17, fontWeight: '700'}}>
                Sign In
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <ImageBackground
        source={require('../images/signIn.png')}
        style={{width: '100%', height: '100%'}}>
        <ScrollView>
          <View style={{flex: 1, flexDirection: 'column', padding: 24}}>
            <View style={styles.textView}>
              <TouchableOpacity>
                <Image source={require('../images/Back.png')} />
              </TouchableOpacity>
              <Text style={[styles.textStyle, {paddingBottom: 20}]}>
                Enter OTP
              </Text>
              <Text style={styles.textStyle2}>
                We have just sent you 4 digit code at your mobile _number_
              </Text>
            </View>
            <OTPInputView
              autoFocusOnLoad
              codeInputFieldStyle={styles.otpBox}
              style={{width: 280, height: 120, alignSelf: 'center'}}
              pinCount={4}
            />
            <TouchableOpacity style={styles.buttonStyle}>
              <Text style={{textAlign: 'center', fontSize: 20, color: '#FFF'}}>
                Continue
              </Text>
            </TouchableOpacity>

            <View style={{width: '100%', height: 70, padding: 10}}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: '500',
                    paddingRight: 5,
                  }}>
                  Didn’t receive code?
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#CF3339',
                      fontWeight: 'bold',
                      textDecorationLine: 'underline',
                    }}>
                    Resend Code
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  topheader: {
    height: '100%',
  },
  textStyle: {fontSize: 35, fontWeight: 'bold', color: '#FFF'},
  textStyle2: {fontSize: 16, fontWeight: '400', color: '#FFF'},
  bottomSection: {
    backgroundColor: '#f1f1f1',
    height: '100%',
    width: '100%',
  },
  forgotButtonStyle: {
    fontSize: 10,
    fontWeight: '500',
    color: '#777777',
  },
  buttonStyle: {
    width: '100%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#CF3339',
    marginBottom: 15,
  },
  signInButton: {
    width: '100%',
    alignSelf: 'center',
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 30,
    backgroundColor: '#CF3339',
    marginBottom: 15,
  },
  otpBox: {
    borderRadius: 15,
    width: 50,
    padding: 20,
    height: 60,
    backgroundColor: '#d5d3d3',
    borderWidth: 1,
    color: '#000',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
