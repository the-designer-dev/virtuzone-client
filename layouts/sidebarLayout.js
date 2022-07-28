import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Switch} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {useSwipe} from '../customHooks/useSwipe';
import Sidebar from 'react-native-sidebar';
import {useFocusEffect} from '@react-navigation/native';

const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');

const sidebarLayout = ({header, subheader}) => {
  const dispatch = useDispatch();
  const {sidebar} = useSelector(state => state.sidebar);
  const [photo1, setPhoto1] = React.useState(require('../images/zaby.png'));
  const [faceId, setFaceId] = React.useState(false);
  const [fingerprint, setFingerprint] = React.useState(false);
  var leftValue = React.useRef(new Animated.Value(-PAGE_WIDTH)).current;

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        console.log('rum');
        leftValue.current = leftValue;
      };
    }, []),
  );

  moveLR = () => {
    Animated.timing(leftValue, {
      toValue: 0,
      duration: 500, // the duration of the animation
      easing: Easing.linear, // the style of animation
      useNativeDriver: true,
    }).start();
  };

  moveRL = () => {
    Animated.timing(leftValue, {
      toValue: -PAGE_WIDTH,
      duration: 500, // the duration of the animation
      easing: Easing.linear, // the style of animation
      useNativeDriver: true,
    }).start();
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TouchableOpacity style={{padding: 0}} onPress={() => moveLR()}>
        <Image
          style={{padding: 0, alignSelf: 'flex-start'}}
          source={require('../images/hamburger.png')}
        />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          paddingLeft: 20,
          justifyContent: 'flex-start',
        }}>
        <Text
          style={{
            fontSize: subheader ? 16 : 20,
            fontWeight: '700',
            color: '#222222',
          }}>
          {header}
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontWeight: '700',
            color: '#3E3E3E',
            opacity: 0.4,
            display: subheader ? 'flex' : 'none',
          }}>
          {subheader}
        </Text>
      </View>
      <View>
        <TouchableOpacity>
          <Image
            style={{padding: 0, alignSelf: 'flex-start'}}
            source={require('../images/BellIcon.png')}
          />
          <View
            style={{
              backgroundColor: '#CF3339',
              padding: 5,
              width: '100%',
              borderRadius: 100,
              position: 'absolute',
              top: -12,
              right: -10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#ffffff',
                fontWeight: '700',
                fontSize: 10,
              }}>
              3
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          width: PAGE_WIDTH,
          height: PAGE_HEIGHT,
          transform: [{translateX: leftValue}],
          zIndex: 1,
        }}>
        <View
          style={{
            width: PAGE_WIDTH * 0.8,
            height: PAGE_HEIGHT,
            backgroundColor: '#fff',
            position: 'absolute',
            zIndex: 100,
            top: -24,
            left: sidebar ? -24 : PAGE_WIDTH + 24,
            flex: 1,
            zIndex: 2,

            padding: 24,
          }}>
          <LinearGradient
            colors={['#131313', '#241515']}
            style={{
              width: PAGE_WIDTH * 0.8,
              height: PAGE_HEIGHT,
              position: 'absolute',
              top: 0,
              left: 0,
            }}
            start={{x: 1.0, y: 0}}
            end={{x: 0, y: 1}}
          />

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 28,
              position: 'relative',
            }}>
            <TouchableOpacity
              onPress={() => moveRL()}
              style={{position: 'absolute', right: 0, top: 16}}>
              <Image source={require('../images/x.png')} />
            </TouchableOpacity>
            <Image
              style={{
                width: '100%',
                height: '100%',
                maxWidth: 116,
                maxHeight: 116,
                minWidth: 116,
                minHeight: 116,
                borderRadius: 50,
              }}
              source={`${photo1}`}
            />
            <Text
              style={{
                fontWeight: '700',
                fontSize: 18,
                color: '#cf3339',
                paddingTop: 10,
              }}>
              John Doe
            </Text>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 12,
                color: '#fff',
                paddingTop: 10,
              }}>
              johndoe@domain.com
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'flex-start',
              paddingTop: 29,
            }}>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 14,
                color: '#9CA4AB',
              }}>
              Quick Menu
            </Text>

            <View
              style={{
                paddingTop: 16,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                style={{height: 24, width: 24}}
                source={require('../images/Calculator.png')}
              />

              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 14,
                  paddingLeft: 16,
                  color: '#FFF',
                }}>
                Quick Menu
              </Text>
            </View>
            <View
              style={{
                paddingTop: 16,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                style={{height: 24, width: 24}}
                source={require('../images/briefcase.png')}
              />

              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 14,
                  paddingLeft: 16,
                  color: '#FFF',
                }}>
                New Business Setup
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'flex-start',
              paddingTop: 29,
            }}>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 14,
                color: '#9CA4AB',
              }}>
              Security
            </Text>

            <View
              style={{
                paddingTop: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{height: 24, width: 24}}
                  source={require('../images/FaceId.png')}
                />
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: 14,
                    paddingLeft: 16,
                    color: '#FFF',
                  }}>
                  Face Id
                </Text>
              </View>
              <Switch
                trackColor={{true: '#F2F2F5', false: '#F2F2F5'}}
                thumbColor={faceId ? '#cf3339' : '#ffffff'}
                value={faceId}
                onValueChange={() => {
                  setFaceId(!faceId);
                }}
              />
            </View>
            <View
              style={{
                paddingTop: 24,
                flexDirection: 'row',

                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{height: 24, width: 24}}
                  source={require('../images/briefcase.png')}
                />

                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: 14,
                    paddingLeft: 16,
                    color: '#FFF',
                  }}>
                  New Business Setup
                </Text>
              </View>
              <Switch
                trackColor={{true: '#F2F2F5', false: '#F2F2F5'}}
                thumbColor={faceId ? '#cf3339' : '#ffffff'}
                value={faceId}
                onValueChange={() => {
                  setFaceId(!faceId);
                }}
              />
            </View>
            <View
              style={{
                paddingTop: 24,
                flexDirection: 'row',

                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{height: 24, width: 24}}
                  source={require('../images/Lock.png')}
                />

                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: 14,
                    paddingLeft: 16,
                    color: '#FFF',
                  }}>
                  Change Password
                </Text>
              </View>
              <Image source={require('../images/ArrowIcon.png')} />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              flex: 1,
              paddingBottom: 38,
            }}>
            <TouchableOpacity>
              <Text style={{fontWeight: '500', fontSize: 16, color: '#cf3339'}}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default sidebarLayout;

const styles = StyleSheet.create({});
