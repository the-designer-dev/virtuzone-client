import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

export default function OnBoarding1({navigation}) {
  useEffect(() => {
    console.log('hello');
  }, []);

  return (
    <View style={{height: '100%'}}>
      <Swiper
        style={{height: '100%'}}
        dot={
          <View
            style={{
              backgroundColor: 'rgba(172 ,172 , 176 , 0.35)',
              width: 70,
              height: 8,
              borderRadius: 20,
              marginBottom: 100,
            }}
          />
        }
        activeDot={
          <View
            style={{
              backgroundColor: '#FFF',
              width: 70,
              height: 8,
              borderRadius: 20,
              marginBottom: 100,
            }}
          />
        }>
        <View>
          <ImageBackground
            source={require('../images/onBoarding1.png')}
            style={{width: '100%', height: '100%'}}>
            <LinearGradient
              colors={['#CF333900', '#CF3339']}
              style={styles.gradientStyle}
              start={{x: 0.5, y: 0.5}}
              end={{x: 0.5, y: 1.5}}
            />
            <View style={styles.sectionContainer}>
              <Text style={styles.titleStyle}>Manage Your</Text>
              <Text style={styles.titleStyle}>Business On Your</Text>
              <Text style={styles.titleStyle}>Fingertips</Text>
            </View>
          </ImageBackground>
        </View>
        <View>
          <Text>Hello</Text>
        </View>
      </Swiper>
      <TouchableOpacity style={styles.nextButton}>
        <Text style={{textAlign: 'center', fontSize: 20, color: '#FFF'}}>
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    color: '#000',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
    padding: 24,

    paddingBottom: 150,
  },
  gradientStyle: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  titleStyle: {
    color: '#FFF',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'left',
    width: '100%',
  },
  nextButton: {
    width: '90%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#CF3339',
    marginTop: 26,
    marginBottom: 40,
    bottom: 0,
    position: 'absolute',
  },
});
