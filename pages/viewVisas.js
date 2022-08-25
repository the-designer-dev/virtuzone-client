import {
  Dimensions,
  FlatList,
  Image,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import SidebarLayout from '../layouts/sidebarLayout';
import Pdf from 'react-native-pdf';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';

import {REACT_APP_BASE_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ExpandableListItem from '../components/expandableVisaItem';

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
        console.log(companyData.data.company[0]._id);
        const documents = await axios({
          method: 'GET',
          url: `${REACT_APP_BASE_URL}/visa?company=${companyData.data.company[0]._id}`,

          headers: {
            'x-auth-token': token,
          },
        }).catch(err => console.log(err));

        var allVisasVar = [];

        for (const visa of documents?.data?.visa) {
          var allFilesVar = [];

          for (const element of visa.entryPermit) {
            allFilesVar.push({name: 'Entry Permit', file: element});
          }
          for (const element of visa.passport) {
            allFilesVar.push({name: 'Passport', file: element});
          }
          for (const element of visa.residencyVisa) {
            allFilesVar.push({name: 'Residency Visa', file: element});
          }
          for (const element of visa.emiratesId) {
            allFilesVar.push({name: 'Emirates Id', file: element});
          }
          allVisasVar.push({
            name: visa.firstName + ' ' + visa.lastName,
            files: allFilesVar,
          });
        }
        setAllFiles(allVisasVar);
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
        <SidebarLayout header={'UAE Visas'} />
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
            <ExpandableListItem item={item} navigation={navigation} />
            // <View
            //   style={{
            //     flexDirection: 'column',
            //     marginVertical: 11,
            //   }}>
            //   <View
            //     style={{
            //       paddingVertical: 11,
            //       paddingHorizontal: 29,
            //       backgroundColor: '#fff',
            //       flexDirection: 'row',
            //       alignItems: 'center',
            //       justifyContent: 'space-between',
            //       borderTopLeftRadius: 10,
            //       borderTopRightRadius: 10,
            //     }}>
            //     <Text
            //       style={{
            //         fontSize: 12,
            //         flex: 1,
            //         fontWeight: '600',
            //         color: '#000',
            //         borderBottomColor: '#000',
            //         paddingBottom: 10,
            //         borderBottomWidth: 1,
            //       }}>
            //       {item.name}
            //     </Text>
            //     <Image
            //       // style={{transform: [{rotate: '90deg'}]}}
            //       source={require('../images/ViewBlack.png')}
            //     />
            //   </View>
            //   <View
            //     style={{
            //       backgroundColor: '#fff',
            //       // paddingHorizontal: 28,
            //       paddingVertical: 6,
            //       borderBottomRightRadius: 16,
            //       borderBottomLeftRadius: 16,
            //       flexDirection: 'column',
            //       justifyContent: 'space-evenly',
            //     }}>
            //     {item.files.map(el => (
            //       <View
            //         style={{
            //           paddingHorizontal: 29,
            //           paddingVertical: 11,
            //           flexDirection: 'row',
            //           justifyContent: 'space-between',
            //           alignItems: 'center',
            //         }}>
            //         <Text
            //           style={{fontSize: 10, fontWeight: '600', color: '#000'}}>
            //           {el.name}
            //         </Text>
            //         <View style={{flexDirection: 'row'}}>
            //           <TouchableOpacity
            //             onPress={() => displayDocument(el.file)}>
            //             <View
            //               style={{
            //                 flex: 1,
            //                 flexDirection: 'row',
            //                 alignItems: 'center',
            //                 justifyContent: 'center',
            //               }}>
            //               <Image
            //                 resizeMode="contain"
            //                 style={{width: 15}}
            //                 source={require('../images/viewRed.png')}
            //               />
            //               <Text
            //                 style={{
            //                   fontWeight: '500',
            //                   fontSize: 12,
            //                   color: '#CF3339',
            //                   paddingHorizontal: 10,
            //                 }}>
            //                 View
            //               </Text>
            //             </View>
            //           </TouchableOpacity>
            //           <View
            //             style={{
            //               flexDirection: 'row',
            //               alignItems: 'center',
            //               justifyContent: 'center',
            //             }}>
            //             <Image source={require('../images/Line.png')} />
            //           </View>
            //           <TouchableOpacity
            //             onPress={() => downloadDocument(el.file)}>
            //             <View
            //               style={{
            //                 flex: 1,
            //                 paddingHorizontal: 10,

            //                 flexDirection: 'row',
            //                 alignItems: 'center',
            //                 justifyContent: 'center',
            //               }}>
            //               <Image
            //                 resizeMode="contain"
            //                 style={{width: 15}}
            //                 source={require('../images/downloadRed.png')}
            //               />
            //               <Text
            //                 style={{
            //                   fontWeight: '500',
            //                   fontSize: 12,
            //                   color: '#CF3339',
            //                   paddingLeft: 10,
            //                 }}>
            //                 Download
            //               </Text>
            //             </View>
            //           </TouchableOpacity>
            //         </View>
            //       </View>
            //     ))}
            //   </View>
            // </View>
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
      </SafeAreaView >
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
