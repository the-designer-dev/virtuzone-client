import {
  ImageBackground,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  Alert
} from 'react-native';
import { TextInput } from 'react-native-paper';
import TextField from '../components/inputField';
import React, { useState, useRef, useEffect } from 'react';
import IntlPhoneInput from 'react-native-international-telephone-input';
import { REACT_APP_BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import SidebarLayout from '../layouts/sidebarLayout';
export default function MyAccount({ navigation }) {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(true);
  //const [photo, setPhoto] = React.useState(null);
  const [photo1, setPhoto1] = React.useState(require('../images/zaby.png'));
  var id;
  useFocusEffect(
    React.useCallback(() => {
      console.log('hello');
      getMyStringValue = async () => {
        try {
          id = await AsyncStorage.getItem('@id');
          console.log(id);
          if (id) {
            getData(id);
          } else {
          }
        } catch (e) {
          console.log(e);
        }
      };

      function getData(ids) {
        setLoader(true);

        axios({
          method: 'GET',
          url: `${REACT_APP_BASE_URL}/alluser?id=${ids}`,
        })
          .then(res => {
            console.log(res.data);
            setEmail(res.data.user.email);
            setFirstName(res.data.user.firstName);
            setLastName(res.data.user.lastName);
            setPhoneNumber(res.data.user.mobile);
            setPassword(res.data.user.firstName);
            setLoader(false);
          })
          .catch(function (error) {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
              setLoader(false)
              console.log(error.response.data)

              Alert.alert('Failed', `${error.response.data.message ? error.response.data.message : "Something went wrong"}`, [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
              ]);
            }
          });

        axios({
          method: 'GET',
          url: `${REACT_APP_BASE_URL}/files/62d7e93a54bb2686ed633074`,
        })
          .then(res => {
            //setPhoto(res.data);
            //console.log(`photo: ${photo}`)
          })
          .catch(function (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            }
          });
      }
      getMyStringValue();
    }, []),
  );

  return (
    <View style={[styles.bottomSection, { padding: 24 }]}>
      <SidebarLayout header={'My Account'} />
      {!loader ? (
        <ScrollView
          style={{ width: '100%', height: '100%', paddingVertical: 24, marginBottom: 70 }}>
          <View style={styles.profilePicture}>
            <TouchableOpacity onPress={() => { }}>
              <View style={{ marginBottom: 24 }}>
                <Image
                  style={{
                    maxWidth: 116,
                    maxHeight: 116,
                    minWidth: 116,
                    minHeight: 116,
                    borderRadius: 50,
                  }}
                  source={`${photo1}`}
                />
                <Image
                  style={styles.camera}
                  source={require('../images/camera.png')}
                />
              </View>
            </TouchableOpacity>

            <Text style={styles.textStyle2}>My Account</Text>
          </View>

          <SafeAreaView style={{ marginBottom: 20 }}>
            <Text style={styles.label}>First Name</Text>
            <TextField
              editable={false}
              value={firstName}
              onChangeText={text => setFirstName(text)}
              left={
                <TextInput.Icon
                  name={() => <Image source={require('../images/User1.png')} />}
                />
              }
              right={
                <TextInput.Icon
                  name={() => (
                    <TouchableOpacity>
                      <Image source={require('../images/Pencil.png')} />
                    </TouchableOpacity>
                  )}
                />
              }
            />
          </SafeAreaView>

          <SafeAreaView style={{ marginBottom: 20 }}>
            <Text style={styles.label}>Last Name</Text>
            <TextField
              editable={false}
              value={lastName}
              onChangeText={text => setLastName(text)}
              left={
                <TextInput.Icon
                  name={() => <Image source={require('../images/User1.png')} />}
                />
              }
              right={
                <TextInput.Icon
                  name={() => (
                    <TouchableOpacity>
                      <Image source={require('../images/Pencil.png')} />
                    </TouchableOpacity>
                  )}
                />
              }
            />
          </SafeAreaView>

          <SafeAreaView style={{ marginBottom: 20 }}>
            <Text style={styles.label}>Email Address</Text>

            <TextField
              editable={false}
              value={email}
              onChangeText={text => setEmail(text)}
              left={
                <TextInput.Icon
                  name={() => (
                    <Image source={require('../images/EnvelopeClosed.png')} />
                  )}
                />
              }
              right={
                <TextInput.Icon
                  name={() => (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('UpdateEmail');
                      }}>
                      <Image source={require('../images/Pencil.png')} />
                    </TouchableOpacity>
                  )}
                />
              }
            />
          </SafeAreaView>

          <SafeAreaView style={{ marginBottom: 20 }}>
            <Text style={[styles.label, { marginBottom: 5 }]}>Phone Number</Text>

            <TextField
              editable={false}
              value={phoneNumber}
              onChangeText={text => setPhoneNumber(text)}
              left={
                <TextInput.Icon
                  name={() => (
                    <Text>+92</Text>
                  )}
                />
              }
              right={
                <TextInput.Icon
                  name={() => (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('UpdatePhone');
                      }}>
                      <Image source={require('../images/Pencil.png')} />
                    </TouchableOpacity>
                  )}
                />
              }
            />

          </SafeAreaView>

          <View style={{ marginBottom: 20 }}>
            <Text style={styles.label}>Password</Text>
            <TextField
              value={"dummypass"}
              secureTextEntry
              editable={false}
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
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('UpdatePassword');
                      }}>
                      <Image source={require('../images/Pencil.png')} />
                    </TouchableOpacity>
                  )}
                />
              }
            />
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}>
          <Image source={require('../images/Loading.png')} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  menubar: {
    padding: 24,
    flex: 1,
  },
  profilePicture: {
    //display: "flex",
    // justifyContent: "center",
    alignItems: 'center',
  },
  camera: {
    position: 'absolute',
    top: 90,
    right: 10,
  },
  topheader: {
    height: 300,
    padding: 24,
    flex: 1,
    justifyContent: 'flex-end',
  },
  textStyle: { fontSize: 20, fontWeight: 'bold', color: '#000000' },
  textStyle2: { fontSize: 16, fontWeight: '600', color: '#cf3339' },
  label: {
    fontSize: 16,
    fontFamily: 'inter',
    fontWeight: 'bold',
    color: '#000000',
  },

  bottomSection: {
    backgroundColor: '#eededf',
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
