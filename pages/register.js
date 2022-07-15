import {
    ImageBackground,
    StyleSheet,
    Text,
    Image,
    View,
    Alert,
    TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-paper';
import TextField from '../components/inputField';
import React, { useState, useRef } from 'react'
import PhoneInput from 'react-native-phone-number-input';


export default function Register({ navigation }) {

    const [name, onChangeName] = React.useState(null);
    const [email, onChangeEmail] = React.useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const phoneInput = useRef(null);
    const getPhoneNumber = () => {
        Alert.alert(phoneNumber);
    };

    return (
        <View>
            <ImageBackground
                source={require('../images/signIn.png')}
                style={{ width: '100%', height: 300 }}>
                <View style={styles.topheader}>
                    <View style={styles.textView}>
                        <Text style={styles.textStyle}>Register For</Text>
                        <Text style={[styles.textStyle, { paddingBottom: 20 }]}>
                            New Account
                        </Text>
                        <Text style={styles.textStyle2}>
                            Fill out the details below to signup for a Virtuzone official account.
                        </Text>
                    </View>
                </View>
            </ImageBackground>
            <View style={styles.bottomSection}>
                <TextField
                    style={styles.input}
                    label="Full Name"
                    left={
                        <TextInput.Icon
                            name={() => (
                                <Image source={require('../images/User1.png')} />
                            )}
                        />
                    }
                />
                <TextField
                    style={styles.input}
                    label="Email Address"
                    left={
                        <TextInput.Icon
                            name={() => (
                                <Image source={require('../images/EnvelopeClosed.png')} />
                            )}
                        />
                    }
                />

                <PhoneInput
                    ref={phoneInput}
                    defaultValue={phoneNumber}
                    defaultCode="IN"
                    layout="first"
                    withShadow
                    autoFocus
                    containerStyle={styles.phoneNumberView}
                    textContainerStyle={{ paddingVertical: 0 }}
                    onChangeFormattedText={text => {
                        setPhoneNumber(text);
                    }}
                />


                <TouchableOpacity style={styles.button} onPress={() => getPhoneNumber()}>
                    <Text style={styles.buttonText}>Get Phone Number</Text>
                </TouchableOpacity >



            </View>
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
    bottomSection: {
        backgroundColor: '#f1f1f1',
    },
    bottomSection: {
        backgroundColor: '#f1f1f1',
        height: '100%',
        width: '100%',
    },
    input: {
        margin: 26,
        marginBottom: 0,
        marginTop: 20
    },
    phoneNumberView: {
        width: '80%',
        height: 50,
        backgroundColor: 'white'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        width: '80%',
        padding: 8,
        backgroundColor: '#00B8D4',
    },

    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white'
    }
});
