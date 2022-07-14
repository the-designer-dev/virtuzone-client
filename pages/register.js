import {
    ImageBackground,
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-paper';
import TextField from '../components/inputField';



export default function Register({ navigation }) {

    const [name, onChangeName] = React.useState(null);
    const [email, onChangeEmail] = React.useState(null);
    const [phone, onChangePhone] = React.useState(null);
    const [number, onChangeNumber] = React.useState(null);

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
                    label="Email Address"
                    left={
                        <TextInput.Icon
                            name={() => (
                                <Image source={require('../images/EnvelopeClosed.png')} />
                            )}
                        />
                    }
                />
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
});
