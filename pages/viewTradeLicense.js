import {
  Animated,
  Dimensions,
  Easing,
  FlatList,
  Image,
  PermissionsAndroid,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import SidebarLayout from '../layouts/sidebarLayout';
import Pdf from 'react-native-pdf';
import ExpandableListItem from '../components/expandableListItem';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {REACT_APP_BASE_URL} from '@env';
const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');

export default function ViewDocuments({route, navigation}) {
  const [doc, setDoc] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [allFiles, setAllFiles] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      async function func() {
        const id = await AsyncStorage.getItem('@id');
        const token = await AsyncStorage.getItem('@jwt');
        const companyData = await axios({
          method: 'GET',
          url: `${REACT_APP_BASE_URL}/company?owner=${id}`,
        }).catch(err => console.log(err));

        const documents = await axios({
          method: 'GET',
          url: `${REACT_APP_BASE_URL}/tradelicense?company=${companyData.data.company[0]._id}`,
          headers: {
            'x-auth-token': token,
          },
        }).catch(err => console.log(err));
        var allFilesVar = [];
        for (const element of documents.data.tradeLicense[0].file) {
          allFilesVar.push({name: 'Trade Licence', file: element});
        }
        setAllFiles(allFilesVar);
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
                <SafeAreaView style={{flex:1}}>


      <View style={{flex: 1, padding: 24}}>
        <SidebarLayout header={'Trade Licence'} />
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
Trade Licence</Text>
</View>
        <FlatList
          style={{paddingTop: 12}}
          data={allFiles}
          renderItem={({item}) => (
            <ExpandableListItem navigation={navigation} item={item} />
          )}
        />
      </View>

      {doc && (
        <Pdf
          trustAllCerts={false}
          source={{
            uri: doc,
            cache: true,
          }}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={styles.pdf}
        />
      )}
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
});
