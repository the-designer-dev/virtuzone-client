import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnBoarding from './pages/onBoarding';
import SignIn from './pages/signIn';
import Register from './pages/register';
import OtpScreen from './pages/otpScreen';
import UpdateEmail from './pages/updateEmail';
import UpdatePhone from './pages/updatePhone';
import UpdatePassword from './pages/updatePassword';
import AddCompany from './pages/addCompany';
import Home from './pages/home';
import MyAccount from './pages/myAccount';
import Contact from './pages/contact';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {configureStore} from '@reduxjs/toolkit';
import sidebarReducer from './reducers/sidebar';
import {Provider} from 'react-redux';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
  },
});
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    SplashScreen.show();

    const timer = setTimeout(() => {
      SplashScreen.hide();
    }, 0);
    return () => clearTimeout(timer);
  }, []);
  function HomeStack() {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          unmountOnBlur: true,
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 24,
            zIndex: 1,
            marginHorizontal: 24,
            backgroundColor: '#131313',
            borderRadius: 10,
            height: 70,
            paddingHorizontal: 20,
            borderColor: 'transparent',
            borderWidth: 0,
            shadowOpacity: '0%',
          },
          tabBarActiveBackgroundColor: '#fff',
          tabBarItemStyle: {
            marginVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 10,
            width: '100%',
            flex: 1,
            alignContent: 'center',
            alignItems: 'center',

            justifyContent: 'center',
          },
          tabBarActiveTintColor: '#cf3339',
          tabBarLabelPosition: 'beside-icon',
          tabBarLabel: ({focused}) => {
            let label;
            return (label = focused ? (
              <Text
                style={{
                  fontSize: 13,
                  color: '#cf3339',
                  fontWeight: '700',
                  paddingLeft: 18,
                }}>
                {route.name}
              </Text>
            ) : null);
          },
        })}>
        <Tab.Screen
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <Image
                  resizeMode={'contain'}
                  source={
                    focused
                      ? require('./images/home2.png')
                      : require('./images/homegrey.png')
                  }
                  style={{width: 20}}
                />
              );
            },
            tabBarShowLabel: true,
          }}
          name="Home"
          component={Home}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <Image
                  resizeMode={'contain'}
                  source={
                    focused
                      ? require('./images/envelope.png')
                      : require('./images/envelopegrey.png')
                  }
                  // style={styles.icon}
                />
              );
            },
            // tabBarShowLabel: false,
          }}
          name="Contact"
          component={Contact}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <Image
                  resizeMode={'contain'}
                  source={
                    focused
                      ? require('./images/account.png')
                      : require('./images/accountGrey.png')
                  }
                  // style={styles.icon}
                />
              );
            },
            // tabBarShowLabel: false,
          }}
          name="Profile"
          component={MyAccount}
        />
      </Tab.Navigator>
    );
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="HomeStack" component={HomeStack} />
              <Stack.Screen name="OnBoarding1" component={OnBoarding} />
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="AddCompany" component={AddCompany} />
              <Stack.Screen name="UpdatePhone" component={UpdatePhone} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="UpdateEmail" component={UpdateEmail} />
              <Stack.Screen name="OtpScreen" component={OtpScreen} />
              <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
