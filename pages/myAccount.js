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

export default function MyAccount({ navigation }) {
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.bottomSection}>

            <ScrollView style={styles.bottomSection}>
                <View style={styles.menubar}>
                    <TouchableOpacity style={{ alignItems: "flex-start", padding: 0 }}>
                        <Image style={{ padding: 0, alignSelf: "flex-start" }} source={require('../images/hamburger.png')} />
                    </TouchableOpacity>

                    <Text style={styles.textStyle}>
                        My Account
                    </Text>

                    <TouchableOpacity style={{ alignItems: "flex-start", padding: 0 }}>
                        <Image style={{ padding: 0, alignSelf: "flex-start" }} source={require('../images/Notification.png')} />
                    </TouchableOpacity>
                </View>

                <View style={{ height: '100%', padding: 24 }}>
                    <View style={styles.profilePicture}>
                        <TouchableOpacity >
                            <View style={{ marginBottom: 24 }}>
                                <Image style={{ maxWidth: 116, maxHeight: 116, borderRadius: 50 }} source={require('../images/zaby.png')} />
                                <Image style={styles.camera} source={require('../images/camera.png')} />
                            </View>
                        </TouchableOpacity>

                        <Text style={styles.textStyle2}>
                            My Account
                        </Text>
                    </View>

                    <SafeAreaView
                        style={{ marginBottom: 20 }}
                    >
                        <Text style={styles.label}>
                            First Name
                        </Text>
                        <TextField
                            label="First Name"
                            onChangeText={text => setFirstName(text)}
                            left={
                                <TextInput.Icon
                                    name={() => (
                                        <Image source={require('../images/User1.png')} />
                                    )}
                                />
                            }
                            right={
                                <TextInput.Icon
                                    name={() => (
                                        <TouchableOpacity>
                                            <Image source={require('../images/Pencil.png')} />
                                        </TouchableOpacity>
                                    )}
                                />
                            }
                        />
                    </SafeAreaView>

                    <SafeAreaView
                        style={{ marginBottom: 20 }}
                    >
                        <Text style={styles.label}>
                            Last Name
                        </Text>
                        <TextField
                            label="Last Name"
                            onChangeText={text => setLastName(text)}
                            left={
                                <TextInput.Icon
                                    name={() => (
                                        <Image source={require('../images/User1.png')} />
                                    )}
                                />
                            }
                            right={
                                <TextInput.Icon
                                    name={() => (
                                        <TouchableOpacity>
                                            <Image source={require('../images/Pencil.png')} />
                                        </TouchableOpacity>
                                    )}
                                />
                            }
                        />
                    </SafeAreaView>

                    <SafeAreaView
                        style={{ marginBottom: 20 }}
                    >
                        <Text style={styles.label}>
                            Email Address
                        </Text>
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
                            right={
                                <TextInput.Icon
                                    name={() => (
                                        <TouchableOpacity>
                                            <Image source={require('../images/Pencil.png')} />
                                        </TouchableOpacity>
                                    )}
                                />
                            }
                        />
                    </SafeAreaView>


                    <SafeAreaView
                        style={{ marginBottom: 20 }}
                    >
                        <Text style={[styles.label, { marginBottom: 5 }]}>
                            Phone Number
                        </Text>
                        <IntlPhoneInput
                            flagStyle={{ display: "none" }}
                            defaultCountry="PK"
                            renderAction={() => <Image source={require('../images/Pencil.png')} />}
                            containerStyle={styles.phoneInput}
                            onChangeText={data => {
                                if (data.phoneNumber[0] === '0') {
                                    console.log(
                                        `${data.dialCode}${data.phoneNumber.substring(1)}`.replace(
                                            ' ',
                                            '',
                                        ),
                                    );
                                } else {
                                    console.log(
                                        `${data.dialCode}${data.phoneNumber}`.replace(' ', ''),
                                    );
                                }
                            }}
                            lang="EN"
                        />
                    </SafeAreaView>

                    <View
                        style={{ marginBottom: 20 }}
                    >
                        <Text style={styles.label}>
                            Password
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
                                            <Image source={require('../images/Pencil.png')} />
                                        </TouchableOpacity>
                                    )}
                                />
                            }
                        />
                    </View>

                </View>
            </ScrollView>

        </View >
    );
}

const styles = StyleSheet.create({
    menubar: {
        padding: 26,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    profilePicture: {
        //display: "flex",
        // justifyContent: "center",
        alignItems: "center",
    },
    camera: {
        position: "absolute",
        top: 90,
        right: 10
    },
    topheader: {
        height: 300,
        padding: 24,
        flex: 1,
        justifyContent: 'flex-end',
    },
    textStyle: { fontSize: 20, fontWeight: 'bold', color: '#000000' },
    textStyle2: { fontSize: 16, fontWeight: '600', color: '#cf3339' },
    label: { fontSize: 16, fontFamily: 'inter', fontWeight: 'bold', color: '#000000' },

    bottomSection: {
        backgroundColor: '#eededf',
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