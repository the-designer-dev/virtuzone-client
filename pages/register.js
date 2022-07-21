import {
    ImageBackground,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    View,
    SafeAreaView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import TextField from '../components/inputField';
import React, { useState, useRef } from 'react';
import IntlPhoneInput from 'react-native-international-telephone-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { REACT_APP_BASE_URL } from '@env';

export default function Register({ navigation }) {
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function sendData() {
        axios({
            method: 'POST',
            url: `${REACT_APP_BASE_URL}/signup`,
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobile: phoneNumber,
                password: password,
                confirmPassword: confirmPassword,
                isVerified: false,
                role: 'client',
            },
        })
            .then(res => {
                console.log(res.message);
                const _storeData = async () => {
                    try {
                        await AsyncStorage.setItem('@id', res.data.objectId);
                    } catch (error) {
                        console.log(error);
                    }
                };
                _storeData();
                navigation.navigate('OtpScreen');
            })
            .catch(err => {
                console.log(err);
                Alert.alert('', 'Email already registered', [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            });
    }

    return (
        <View style={{ height: '100%' }}>
            <ImageBackground
                source={require('../images/signIn.png')}
                style={{ width: '100%', height: 300 }}>
                <View style={styles.topheader}>
                    <View style={styles.textView}>
                        <TouchableOpacity style={{ alignItems: 'flex-start', padding: 0 }}>
                            <Image
                                style={{ padding: 0, alignSelf: 'flex-start' }}
                                source={require('../images/Back.png')}
                            />
                        </TouchableOpacity>
                        <Text style={styles.textStyle}>Register For</Text>
                        <Text style={[styles.textStyle, { paddingBottom: 20 }]}>
                            New Account
                        </Text>
                        <Text style={styles.textStyle2}>
                            Fill out the details below to signup for a Virtuzone official
                            account.
                        </Text>
                    </View>
                </View>
            </ImageBackground>

            <ScrollView style={styles.bottomSection}>
                <View style={{ height: '100%', padding: 24 }}>
                    <SafeAreaView style={{ marginBottom: 20 }}>
                        <TextField
                            label="First Name"
                            onChangeText={text => setFirstName(text)}
                            left={
                                <TextInput.Icon
                                    name={() => <Image source={require('../images/User1.png')} />}
                                />
                            }
                        />
                    </SafeAreaView>
                    <SafeAreaView style={{ marginBottom: 20 }}>
                        <TextField
                            label="Last Name"
                            onChangeText={text => setLastName(text)}
                            left={
                                <TextInput.Icon
                                    name={() => <Image source={require('../images/User1.png')} />}
                                />
                            }
                        />
                    </SafeAreaView>

                    <SafeAreaView style={{ marginBottom: 20 }}>
                        <TextField
                            label="Email Address"
                            onChangeText={text => setEmail(text)}
                            left={
                                <TextInput.Icon
                                    name={() => (
                                        <Image source={require('../images/EnvelopeClosed.png')} />
                                    )}
                                />
                            }
                        />
                    </SafeAreaView>

                    <SafeAreaView style={{ marginBottom: 20 }}>
                        <IntlPhoneInput
                            flagStyle={{ display: 'none' }}
                            defaultCountry="PK"
                            renderAction={() => <Text>XX</Text>}
                            containerStyle={styles.phoneInput}
                            onChangeText={data => {
                                if (data.phoneNumber[0] === '0') {
                                    setPhoneNumber(
                                        `${data.dialCode}${data.phoneNumber.substring(1)}`.replace(
                                            ' ',
                                            '',
                                        ),
                                    );
                                } else {
                                    setPhoneNumber(
                                        `${data.dialCode}${data.phoneNumber}`.replace(' ', ''),
                                    );
                                }
                            }}
                            lang="EN"
                        />
                    </SafeAreaView>

                    <View style={{ marginBottom: 20 }}>
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

                    <View style={{ marginBottom: 20 }}>
                        <TextField
                            label="Confirm Password"
                            secureTextEntry
                            onChangeText={text => setConfirmPassword(text)}
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
                        onPress={async () => {
                            const _storeData = async () => {
                                try {
                                    await AsyncStorage.setItem('@email', email);
                                } catch (error) {
                                    console.log(error);
                                }
                            };
                            _storeData();
                            sendData();
                        }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, color: '#FFF' }}>
                            Register Now
                        </Text>
                    </TouchableOpacity>

                    <View
                        style={{
                            marginBottom: 24,
                            alignSelf: 'center',
                            justifyContent: 'flex-start',
                        }}>
                        <Image source={require('../images/Tagline.png')} />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    topheader: {
        height: 300,
        padding: 24,
        flex: 1,
        justifyContent: 'flex-end',
    },
    textStyle: { fontSize: 35, fontWeight: 'bold', color: '#FFF' },
    textStyle2: { fontSize: 16, fontWeight: '400', color: '#FFF' },

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
