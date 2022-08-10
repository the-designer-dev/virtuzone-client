import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {firebase} from '@react-native-firebase/analytics';
// ...
import {
  Animated,
  Easing,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
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
import {Provider, useSelector} from 'react-redux';
import MyTabBar from './components/tabBar';
import ViewTradeLicense from './pages/viewTradeLicense';
import ViewVisas from './pages/viewVisas';
import ViewIncorporationDocuments from './pages/viewIncorporationDocs';
import ServiceRequest from './pages/serviceRequest';
import CostCalculator from './pages/costCalculator';
import SpecialOffers from './pages/specialOffers';
import BusinessSupportServices from './pages/businessSupportServices';
import BookAnAppointment from './pages/bookAnAppointment';
import BankingPartners from './pages/bankingPartners';
import {connectToSocket, socket} from './sockets/socketConfig';
import {Notifications} from 'react-native-notifications';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
  },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [loggedIn, setLoggedIn] = useState(false);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    SplashScreen.show();
    Notifications.registerRemoteNotifications();

    Notifications.events().registerRemoteNotificationsRegistered(event => {
      // TODO: Send the token to my server so it could send back push notifications...
      console.log('Device Token Received', event.deviceToken);
    });
    Notifications.events().registerRemoteNotificationsRegistrationFailed(
      event => {
        console.error(event);
      },
    );

    Notifications.events().registerNotificationReceivedForeground(
      (notification, completion) => {
        console.log('Notification Received - Foreground', notification.payload);

        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({alert: true, sound: true, badge: false});
      },
    );

    Notifications.events().registerNotificationOpened(
      (notification, completion, action) => {
        console.log('Notification opened by device user', notification.payload);
        console.log(
          `Notification opened with an action identifier: ${action.identifier} and response text: ${action.text}`,
        );
        completion();
      },
    );

    Notifications.events().registerNotificationReceivedBackground(
      (notification, completion) => {
        console.log('Notification Received - Background', notification.payload);

        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({alert: true, sound: true, badge: false});
      },
    );

    Notifications.getInitialNotification()
      .then(notification => {
        console.log(
          'Initial notification was:',
          notification ? notification.payload : 'N/A',
        );
      })
      .catch(err => console.error('getInitialNotifiation() failed', err));

    func = async () => {
      const jwt = await AsyncStorage.getItem('@jwt');
      if (jwt !== null) {
        console.log(jwt);
        const defaultAppAnalytics = firebase.analytics();
        await defaultAppAnalytics.setAnalyticsCollectionEnabled(true);
        defaultAppAnalytics.logAppOpen();
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }

      setTimeout(() => {
        SplashScreen.hide();
      }, 3000);
    };
    func();
  }, []);

  function HomeStack({route, navigation}) {
    const {shouldRedirect} = route.params;
    useEffect(() => {
      shouldRedirect === true ? navigation.navigate('OnBoarding1') : '';
    }, [shouldRedirect]);

    useFocusEffect(
      React.useCallback(() => {
        if (!socket.connected && !shouldRedirect) {
          connectToSocket();

          console.log(socket);
        }
      }),
    );
    return (
      <Tab.Navigator
        tabBar={props => <MyTabBar {...props} />}
        screenOptions={({route}) => ({
          unmountOnBlur: true,
          headerShown: false,
        })}>
        <Tab.Screen
          options={{
            tabBarIcon: focused => {
              return (
                <Image
                  resizeMode={'contain'}
                  source={
                    focused
                      ? require('./images/home2.png')
                      : require('./images/homegrey.png')
                  }
                  style={{width: 20, height: 20}}
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
            tabBarIcon: focused => {
              return (
                <Image
                  resizeMode={'contain'}
                  source={
                    focused
                      ? require('./images/envelope.png')
                      : require('./images/envelopegrey.png')
                  }
                  style={{width: 20, height: 20}}
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
            tabBarIcon: focused => {
              return (
                <Image
                  resizeMode={'contain'}
                  source={
                    focused
                      ? require('./images/account.png')
                      : require('./images/accountGrey.png')
                  }
                  style={{width: 20, height: 20}}
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
              <Stack.Screen
                name="HomeStack"
                component={HomeStack}
                initialParams={{shouldRedirect: !loggedIn}}
              />
              <Stack.Screen name="OnBoarding1" component={OnBoarding} />
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="AddCompany" component={AddCompany} />
              <Stack.Screen name="UpdatePhone" component={UpdatePhone} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="UpdateEmail" component={UpdateEmail} />
              <Stack.Screen name="OtpScreen" component={OtpScreen} />
              <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
              <Stack.Screen name="CostCalculator" component={CostCalculator} />
              <Stack.Screen name="ServiceRequest" component={ServiceRequest} />
              <Stack.Screen name="SpecialOffers" component={SpecialOffers} />
              <Stack.Screen
                name="BankingPartners"
                component={BankingPartners}
              />
              <Stack.Screen
                name="BookAnAppointment"
                component={BookAnAppointment}
              />
              <Stack.Screen
                name="BusinessSupportServices"
                component={BusinessSupportServices}
              />
              <Stack.Screen
                name="ViewTradeLicense"
                component={ViewTradeLicense}
              />
              <Stack.Screen name="ViewVisas" component={ViewVisas} />
              <Stack.Screen
                name="ViewIncorporationDocuments"
                component={ViewIncorporationDocuments}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
