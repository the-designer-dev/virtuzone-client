import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import SidebarLayout from '../layouts/sidebarLayout';
import Pdf from 'react-native-pdf';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNFS from 'react-native-fs';
import {PermissionsAndroid, Platform} from 'react-native';
import {REACT_APP_BASE_URL} from '@env';
import {socket} from '../sockets/socketConfig';

export default function BusinessSupportServices({route, navigation}) {
  const [id, setId] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [allFiles, setAllFiles] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      async function func() {
        const id = await AsyncStorage.getItem('@id');
        setId(id);
        const token = await AsyncStorage.getItem('@jwt');
        const supportServices = await axios({
          method: 'GET',
          url: `${REACT_APP_BASE_URL}/supportServices`,
          headers: {
            'x-auth-token': token,
          },
        }).catch(err => console.log(err));
        var suppSer = supportServices.data.supportServices.map(el => {
          return {name: el.name, description: el.description};
        });

        setAllFiles(suppSer);
      }
      func();
    }, []),
  );

  async function sendInquiry(name) {
    socket.emit(
      'recieveNotification',
      id,
      `Business Support Inquiry`,
      `requested for an inquiry regarding ${name}.`,
      new Date(),
    );
    setModalVisible(true);
  }

  return (
    <LinearGradient
      colors={['#eedfe0', '#dbdcdc']}
      style={styles.gradientStyle}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}>
      <View style={{flex: 1, padding: 24}}>
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
              <Image
                style={{width: 150, height: 150}}
                resizeMode="contain"
                source={require('../images/Icon.png')}
              />

              <Text
                style={{
                  paddingTop: 31,
                  fontSize: 24,
                  fontWeight: '500',
                  color: '#1A8E2D',
                  textAlign: 'center',
                }}>
                Request Submitted
              </Text>
              <Text
                style={{
                  paddingTop: 10,
                  fontSize: 15,
                  fontWeight: '500',
                  color: '#000',
                  textAlign: 'center',
                }}>
                Thank you for submitting your request. Someone from our team
                will contact you soon.
              </Text>
              <Pressable
                style={[styles.doneButton]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={{color: '#FFF', fontSize: 17, fontWeight: '700'}}>
                  Done
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <SafeAreaView style={{flex: 1}}>
          <SidebarLayout header={'Business Support'} />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{alignItems: 'flex-start', paddingTop: 12}}>
            <Image
              style={{padding: 0, alignSelf: 'flex-start'}}
              source={require('../images/BackBlack.png')}
            />
          </TouchableOpacity>
          <FlatList
            style={{paddingTop: 12}}
            data={allFiles}
            renderItem={({item}) => (
              <ImageBackground
                source={require('../images/CardBG.jpg')}
                style={{
                  marginVertical: 11,
                  width: '100%',
                  // height: '100%',
                  borderRadius: 25,
                  overflow: 'hidden',
                }}>
                <View
                  style={{
                    paddingVertical: 11,
                    marginVertical: 11,
                    paddingHorizontal: 29,
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      flex: 1,
                      fontWeight: '600',
                      color: '#cf3339',
                    }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      flex: 1,
                      fontWeight: '600',
                      color: '#fff',
                      paddingVertical: 12,
                    }}>
                    {item.description}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      sendInquiry(item.name);
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingHorizontal: 48,
                        paddingVertical: 5,
                        borderRadius: 8,
                        marginTop: 10,
                        borderColor: '#cf3339',
                        borderWidth: 2,
                      }}>
                      <Text style={{color: '#fff'}}>Inquire</Text>
                      <Image source={require('../images/ArrowIcon.png')} />
                    </View>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            )}
          />
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
    // marginTop: 22,
  },
  doneButton: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 50,
    paddingVertical: 16,
    borderRadius: 10,
    backgroundColor: '#000',
    marginTop: 40,
    marginBottom: 16,
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
