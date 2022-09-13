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
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REACT_APP_BASE_URL} from '@env';
import HTML from 'react-native-render-html';

export default function BusinessSupportServices({route, navigation}) {
  const [id, setId] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const {width} = useWindowDimensions();
  const newWidth = width - 50;

  useFocusEffect(
    React.useCallback(() => {
      async function func() {
        const id = await AsyncStorage.getItem('@id');
        setId(id);
        const token = await AsyncStorage.getItem('@jwt');
        const notifications = await axios({
          method: 'GET',
          url: `${REACT_APP_BASE_URL}/notification?id=${id}`,
          headers: {
            'x-auth-token': token,
          },
        }).catch(err => console.log(err));
        setNotifications(notifications?.data?.notification);
        console.log(notifications?.data);
      }
      func();
    }, []),
  );

  return (
    <LinearGradient
      colors={['#eedfe0', '#dbdcdc']}
      style={styles.gradientStyle}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}>
      <View style={{flex: 1, padding: 24}}>
        <SafeAreaView style={{flex: 1}}>
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
            data={notifications}
            renderItem={({item}) => (
              <View
                style={{
                  paddingVertical: 11,
                  marginVertical: 11,
                  // paddingLeft: 29,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  borderRadius: 10,
                }}>
                <Image
                  resizeMethod="resize"
                  resizeMode="contain"
                  style={{height: 30, width: 30, marginRight: 20}}
                  source={require('../images/notificationIcon.png')}
                />
                <Text style={{color: '#000', width: width - 100}}>
                  {item?.message}
                </Text>
              </View>
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
