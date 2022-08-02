import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  Alert,
  FlatList,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Dimensions} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {REACT_APP_BASE_URL} from '@env';

import SidebarLayout from '../layouts/sidebarLayout';
import {useFocusEffect} from '@react-navigation/native';

const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');

export default function SpecialOffers({navigation}) {
  const [allRecords, setAllRecords] = useState([{}, {}]);
  useFocusEffect(
    React.useCallback(() => {
      function getData() {
        axios({
          method: 'GET',
          url: `${REACT_APP_BASE_URL}/calculator`,
        })
          .then(res => {
            setAllRecords(res.data.calculator);
          })
          .catch(function (error) {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
              console.log(error.response.data);

              Alert.alert(
                'Failed',
                `${
                  error.response.data.message
                    ? error.response.data.message
                    : 'Something went wrong'
                }`,
                [{text: 'OK', onPress: () => console.log('OK Pressed')}],
              );
            }
          });
      }
      getData();
    }, []),
  );

  return (
    <LinearGradient
      colors={['#eedfe0', '#dbdcdc']}
      style={styles.gradientStyle}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}>
      <View style={{height: '100%', padding: 24}}>
        <SidebarLayout header={'Special Offers'} />

        <FlatList
          style={{paddingTop: 24, marginBottom: 70}}
          data={allRecords}
          renderItem={({item}) => (
            <View
              style={{
                paddingVertical: 24,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  backgroundColor: '#cf3339',
                  borderTopRightRadius: 16,
                  borderTopLeftRadius: 16,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 14,
                    color: '#FFFFFF',
                  }}>
                  {item.emirates} - {item.name}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#fff',
                  padding: 20,
                  flexDirection: 'column',
                }}>
                <Text
                  style={{
                    flex: 1,
                    flexWrap: 'wrap',
                    fontSize: 12,
                    fontWeight: '500',
                    color: '#000',
                    textAlign: 'left',
                  }}>
                  {item.description}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    padding: 16,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={require('../images/Frame.png')} />
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontWeight: '700',
                        fontSize: 11,
                        color: '#000',
                      }}>
                      {item.ownership ? '100%' : '0%'} Ownership
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={require('../images/Frame.png')} />
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontWeight: '700',
                        fontSize: 11,
                        color: '#000',
                      }}>
                      {item.visaAllocation} Visa Allocation
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 16,
                  }}>
                  {item.noOfShareholders <= 1 ? (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image source={require('../images/Frame.png')} />
                      <Text
                        style={{
                          paddingLeft: 10,
                          fontWeight: '700',
                          fontSize: 11,
                          color: '#000',
                        }}>
                        Single Shareholder
                      </Text>
                    </View>
                  ) : (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image source={require('../images/Frame.png')} />
                      <Text
                        style={{
                          paddingLeft: 10,
                          fontWeight: '700',
                          fontSize: 11,
                          color: '#000',
                        }}>
                        Multiple Shareholders
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              <View
                style={{
                  borderBottomRightRadius: 16,
                  borderBottomLeftRadius: 16,
                  flexDirection: 'row',
                  overflow: 'hidden',
                  justifyContent: 'space-evenly',
                }}>
                <LinearGradient
                  colors={['#6F6F6F', '#553C3C']}
                  style={{
                    borderBottomRightRadius: 16,
                    borderBottomLeftRadius: 16,
                    position: 'absolute',
                    left: 0,
                    width: PAGE_WIDTH - 48,
                    height: '100%',
                  }}
                  start={{x: 0.5, y: 0}}
                  end={{x: 0.5, y: 1}}
                />
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 28,
                    paddingVertical: 11,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{fontWeight: '500', fontSize: 12, color: '#fff'}}>
                    Click for inquiry
                  </Text>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: 20,
                      color: '#fff',
                      paddingLeft: 6,
                    }}>
                    AED {item.price}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientStyle: {
    width: '100%',
    height: '100%',
  },
  signInButton: {
    width: '100%',
    marginTop: 22,
    alignSelf: 'center',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#CF3339',
  },
});
