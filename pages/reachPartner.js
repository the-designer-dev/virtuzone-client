import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import SidebarLayout from '../layouts/sidebarLayout';

import TextField from '../components/inputField';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNFS from 'react-native-fs';
import {PermissionsAndroid, Platform} from 'react-native';
import {REACT_APP_BASE_URL} from '@env';
import {socket} from '../sockets/socketConfig';
import IntlPhoneInput from 'react-native-international-telephone-input';

const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');

export default function ReachPartner({route, navigation}) {
  const [id, setId] = useState(null);
  const [option, setOption] = useState(1);
  const {companyName} = route.params;

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <LinearGradient
      colors={['#eedfe0', '#dbdcdc']}
      style={styles.gradientStyle}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}>
      <View style={{flex: 1, padding: 24}}>
        <SafeAreaView style={{flex: 1}}>
          <SidebarLayout header={companyName} />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{alignItems: 'flex-start', paddingTop: 12}}>
            <Image
              style={{padding: 0, alignSelf: 'flex-start'}}
              source={require('../images/BackBlack.png')}
            />
          </TouchableOpacity>

          <ScrollView style={{width: '100%', width: '100%'}}>
            <View style={{height: '100%'}}>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 18,
                  color: '#000',
                  textAlign: 'center',
                  paddingTop: 36,
                }}>
                What Request Do You Have For {companyName}
              </Text>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 16,
                  color: '#000',
                  textAlign: 'center',
                  paddingTop: 20,
                }}>
                Someone from our team would respond to your request.
              </Text>

              <TextField
                style={{
                  fontWeight: '500',
                  fontSize: 16,
                  color: '#000',
                  textAlign: 'center',
                  marginTop: 20,
                  paddingBottom: 50,
                }}
                label="Your Message"
                multiline
                numberOfLines={4}
                onChangeText={text => {
                  setMessage(text);
                }}
              />

              <TouchableOpacity style={styles.sendButton}>
                <Image
                  style={{width: 13, height: 13}}
                  source={require('../images/sendArrow.png')}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 12,
                    fontWeight: '600',
                    color: '#FFF',
                    paddingLeft: 7,
                  }}>
                  Submit Request
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientStyle: {
    width: '100%',
    height: '100%',
  },

  pdf: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  sendButton: {
    backgroundColor: '#CF3339',
    alignSelf: 'center',
    paddingHorizontal: 35,
    paddingVertical: 12,
    borderRadius: 120,
    marginTop: 18,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  buttonStyle: {
    borderRadius: 10,
    borderColor: '#CF3339',
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginHorizontal: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
