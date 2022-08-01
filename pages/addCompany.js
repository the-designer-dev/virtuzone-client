import {
    ImageBackground,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    View,
    SafeAreaView,
    Modal,
    Pressable,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import TextField from '../components/inputField';
import React, { useState, useRef } from 'react';
import IntlPhoneInput from 'react-native-international-telephone-input';
import { REACT_APP_BASE_URL } from '@env';
import axios from 'axios';

export default function Register({ navigation }) {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [comments, setComments] = useState('');
    const [modalVisible, setModalVisible] = useState(false);


    function sendData() {
        console.log(REACT_APP_BASE_URL);
        axios({
            method: 'POST',
            url: `${REACT_APP_BASE_URL}/startuprequest`,
            headers: {
                "x-auth-token": "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImNzMTkxMjI5MUBzemFiaXN0LnBrIiwicm9sZSI6ImFkbWluIn0.5bBMbd6py7bLWCjWYZCgVz6wWKJ56MdvbEnIEdOWsSU "
            },
            data: {
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                address: address,
                comments: comments,
                requestStatus: "pending"
            },
        })
            .then(res => {
                console.log(res.message);
                setModalVisible(true)
            })
            .catch(err => {
                console.log(err);
                Alert.alert('Failed', "Something went wrong", [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            });
    }

    return (
        <View style={{ height: '100%' }}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View
                    style={[
                        styles.centeredView,
                        modalVisible ? { backgroundColor: 'rgba(0,0,0,0.5)' } : '',
                    ]}>
                    <View style={styles.modalView}>
                        <Image source={require('../images/Icon.png')} />

                        <Text
                            style={{
                                fontSize: 24,
                                fontWeight: '500',
                                color: '#cf3339',
                                textAlign: 'center',
                            }}>
                            Request Submitted
                        </Text>
                        <Text
                            style={{
                                paddingTop: 10,
                                paddingBottom: 20,
                                fontSize: 15,
                                fontWeight: '500',
                                color: '#000',
                                textAlign: 'center',
                            }}>
                            Thank you for submitting your inquiry. We will be in touch shortly.
                        </Text>
                        <Pressable
                            style={[styles.signInButton]}
                            onPress={() => navigation.goBack()}>
                            <Text style={{ color: '#FFF', fontSize: 17, fontWeight: '700' }}>
                                Done
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <ImageBackground
                source={require('../images/signIn.png')}
                style={{ width: '100%', height: 300 }}>

                <View style={styles.topheader}>
                    <View style={styles.textView}>
                        <TouchableOpacity style={{ alignItems: "flex-start", padding: 0 }}>
                            <Image style={{ padding: 0, alignSelf: "flex-start" }} source={require('../images/Back.png')} />
                        </TouchableOpacity>
                        <Text style={[styles.textStyle, { paddingBottom: 20 }]}>
                            New Business Setup
                        </Text>
                        <View style={{ marginBottom: 25 }}>
                            <Text style={styles.textStyle2}>
                                Are you looking to set up a new business
                            </Text>
                            <Text style={styles.textStyle2}>
                                in the UAE?
                            </Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>

            <ScrollView style={styles.bottomSection}>
                <View style={{ height: '100%', padding: 24 }}>
                    <Text style={styles.label}>
                        Fill in your details below to get started.
                    </Text>
                    <SafeAreaView
                        style={{ marginBottom: 20 }}
                    >
                        <TextField
                            label="Full Name"
                            onChangeText={text => setName(text)}
                            left={
                                <TextInput.Icon
                                    name={() => <Image source={require('../images/User1.png')} />}
                                />
                            }
                        />
                    </SafeAreaView>

                    <SafeAreaView
                        style={{ marginBottom: 20 }}
                    >
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

                    <SafeAreaView
                        style={{ marginBottom: 20 }}
                    >
                        <IntlPhoneInput
                            flagStyle={{ display: "none" }}
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

                    <SafeAreaView
                        style={{ marginBottom: 20 }}
                    >
                        <TextField
                            label="Address"
                            onChangeText={text => setAddress(text)}
                            left={
                                <TextInput.Icon
                                    name={() => (
                                        <Image source={require('../images/Home.png')} />
                                    )}
                                />
                            }
                        />
                    </SafeAreaView>

                    <SafeAreaView
                        style={{ marginBottom: 20 }}
                    >
                        <TextField
                            label="Comments (Optional)"
                            onChangeText={text => setComments(text)}

                        />
                    </SafeAreaView>

                    <TouchableOpacity
                        style={styles.signInButton}
                        onPress={() => {
                            sendData()
                        }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, color: '#FFF' }}>
                            Next
                        </Text>
                    </TouchableOpacity>

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
    textStyle: { fontSize: 35, fontWeight: 'bold', color: '#FFF' },
    textStyle2: { fontSize: 16, fontWeight: '400', color: '#FFF' },
    label: { fontSize: 16, fontFamily: 'inter', fontWeight: 'bold', color: '#000000', marginBottom: 24 },

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
    otpBox: {
        borderRadius: 15,
        width: 50,
        padding: 20,
        height: 60,
        backgroundColor: '#d5d3d3',
        borderWidth: 1,
        color: '#000',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});
