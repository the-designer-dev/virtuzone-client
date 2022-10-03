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
import Lottie from 'lottie-react-native';

import TextField from '../components/inputField';
const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');

export default function ReachPartner({route, navigation}) {
  const [id, setId] = useState(null);
  const [option, setOption] = useState(1);
  const {companyName} = route.params;

  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <LinearGradient
      colors={['#eedfe0', '#dbdcdc']}
      style={styles.gradientStyle}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}>
        <SafeAreaView style={{flex: 1}}>
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
                {/* <Image
                  style={{width: 150, height: 150}}
                  resizeMode="contain"
                  source={require('../images/Icon.png')}
                /> */}


<Lottie
      resizeMode="cover"
      style={{
        width: 150,
        // height: '100%',
      }}
      source={require('../images/success_lottie.json')}
      loop={false}
      autoPlay
    />

                <Text
                  style={{
                    paddingTop: 31,
                    fontSize: 24,
                    fontWeight: '500',
                    color: '#1A8E2D',
                    textAlign: 'center',
                  }}>
                  Thank You
                </Text>
                <Text
                  style={{
                    paddingTop: 10,
                    fontSize: 15,
                    fontWeight: '500',
                    color: '#000',
                    textAlign: 'center',
                  }}>
                  We have received your message and will contact you as soon as
                  possible.
                </Text>
                <Pressable
                  style={[styles.doneButton]}
                  onPress={() => setModalVisible(false)}>
                  <Text
                    style={{color: '#FFF', fontSize: 17, fontWeight: '700'}}>
                    Close
                  </Text>
                </Pressable>
              </View>
            </View>
          </Modal>
      <View style={{flex: 1, padding: 24}}>
          <SidebarLayout header={companyName} />
          <View style={{flexDirection:'row' , alignItems:'center' ,width:'100%' , paddingTop:12}}>

<TouchableOpacity
  onPress={() => navigation.goBack()}
  style={{alignItems: 'flex-start'}}>
  <Image
    style={{padding: 0, alignSelf: 'flex-start'}}
    source={require('../images/BackBlack.png')}
  />
</TouchableOpacity>
<Text
style={{
  fontSize: 20,
  fontWeight: '700',
  color: '#222222',
  textAlign: 'center',
  width:PAGE_WIDTH-125
}}>
{companyName}</Text>
</View>

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

              <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.sendButton}>
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
      </View>
        </SafeAreaView>
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
});
