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
import Test from './pages/test';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

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
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  function HomeStack() {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 20,
            marginHorizontal: 24,
            backgroundColor: '#131313',
            borderRadius: 10,
            height: 70,
            paddingHorizontal: 20,
          },
          tabBarActiveBackgroundColor: '#fff',
          tabBarItemStyle: {
            marginVertical: 10,
            borderRadius: 10,
            width: '100%',
          },
          tabBarActiveTintColor: '#cf3339',
          tabBarLabelPosition: 'beside-icon',
        }}>
        <Tab.Screen
          options={{tabBarShowLabel: false}}
          name="Home"
          component={Home}
        />
        <Tab.Screen
          options={{tabBarShowLabel: false}}
          name="Test"
          component={Test}
        />
        <Tab.Screen
          options={{tabBarShowLabel: false}}
          name="MyAccount"
          component={MyAccount}
        />
      </Tab.Navigator>
    );
  }

  return (
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
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="OtpScreen" component={OtpScreen} />
            <Stack.Screen name="UpdateEmail" component={UpdateEmail} />
            <Stack.Screen name="UpdatePhone" component={UpdatePhone} />
            <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
            <Stack.Screen name="AddCompany" component={AddCompany} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
