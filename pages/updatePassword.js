import {
    ImageBackground,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    View,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import TextField from '../components/inputField';
import React, { useState, useRef } from 'react';
import IntlPhoneInput from 'react-native-international-telephone-input';

export default function UpdatePassword({ navigation }) {


    return (
        <View style={{ height: '100%' }}>
            <ImageBackground
                source={require('../images/signIn.png')}
                style={{ width: '100%', height: 300 }}>

                <View style={styles.topheader}>
                    <View style={styles.textView}>
                        <TouchableOpacity style={{ alignItems: "flex-start", padding: 0 }}>
                            <Image style={{ padding: 0, alignSelf: "flex-start" }} source={require('../images/Back.png')} />
                        </TouchableOpacity>
                        <Text style={styles.textStyle}></Text>
                        <Text style={[styles.textStyle, { paddingBottom: 20 }]}>
                            Update Password
                        </Text>
                        <Text style={styles.textStyle2}>
                            You'll need to enter OTP received on your

                        </Text>
                        <Text style={styles.textStyle2}>
                            registered mobile number to make
                        </Text>
                        <Text style={styles.textStyle2}>
                            this change.
                        </Text>
                    </View>
                </View>
            </ImageBackground>
            <ScrollView style={styles.bottomSection}>
                <View style={{ height: '100%', padding: 24 }}>

                    <View
                        style={{ marginBottom: 20 }}
                    >
                        <Text style={styles.label}>
                            Current Password
                        </Text>
                        <TextField
                            label="Password"
                            secureTextEntry
                            onChangeText={text => setPassword(text)}
                            left={
                                <TextInput.Icon
                                    name={() => (
                                        <Image source={require('../images/Password.png')} />
                                    )}
                                />
                            }
                            right={
                                <TextInput.Icon
                                    name={() => (
                                        <TouchableOpacity>
                                            <Image source={require('../images/Hide.png')} />
                                        </TouchableOpacity>
                                    )}
                                />
                            }
                        />
                    </View>

                    <View
                        style={{ marginBottom: 20 }}
                    >
                        <Text style={styles.label}>
                            New Password
                        </Text>
                        <TextField
                            label="Password"
                            secureTextEntry
                            onChangeText={text => setPassword(text)}
                            left={
                                <TextInput.Icon
                                    name={() => (
                                        <Image source={require('../images/Password.png')} />
                                    )}
                                />
                            }
                            right={
                                <TextInput.Icon
                                    name={() => (
                                        <TouchableOpacity>
                                            <Image source={require('../images/Hide.png')} />
                                        </TouchableOpacity>
                                    )}
                                />
                            }
                        />
                    </View>


                    <View
                        style={{ marginBottom: 20 }}
                    >
                        <Text style={styles.label}>
                            Confirm New Password
                        </Text>
                        <TextField
                            label="Password"
                            secureTextEntry
                            onChangeText={text => setPassword(text)}
                            left={
                                <TextInput.Icon
                                    name={() => (
                                        <Image source={require('../images/Password.png')} />
                                    )}
                                />
                            }
                            right={
                                <TextInput.Icon
                                    name={() => (
                                        <TouchableOpacity>
                                            <Image source={require('../images/Hide.png')} />
                                        </TouchableOpacity>
                                    )}
                                />
                            }
                        />
                    </View>



                    <TouchableOpacity
                        style={styles.signInButton}
                        onPress={() => {
                            // if (swiper.current.state.index > 1) {
                            //     navigation.navigate('SignIn');
                            // } else {
                            //     swiper.current.scrollBy(1);
                            // }
                        }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, color: '#FFF' }}>
                            Save Changes
                        </Text>
                    </TouchableOpacity>

                    <View style={{ width: '100%', marginBottom: 40 }}>
                        <View
                            style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>

                            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: '#CF3339',
                                        fontWeight: 'bold',

                                    }}>
                                    CANCEL
                                </Text>
                            </TouchableOpacity>

                        </View>




                    </View>


                </View>

            </ScrollView >
        </View >
    );
}

const styles = StyleSheet.create({
    topheader: {
        height: 300,
        padding: 24,
        flex: 1,
        justifyContent: 'flex-end',
    },
    textStyle: { fontSize: 20, fontWeight: 'bold', color: '#FFF', fontFamily: 'inter' },
    textStyle2: { fontSize: 16, fontFamily: 'inter', fontWeight: '400', color: '#FFF' },
    label: { fontSize: 16, fontFamily: 'inter', fontWeight: 'bold', color: '#000000' },

    bottomSection: {
        backgroundColor: '#f1f1f1',
        height: '100%',
        width: '100%',
    },
    phoneInput: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.20)',
        roundness: 10,
        width: '100%',
        height: 60,
        backgroundColor: '#ffffff',
    },
    signInButton: {
        width: '100%',
        alignSelf: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#CF3339',
        marginBottom: 16,
    },
});
