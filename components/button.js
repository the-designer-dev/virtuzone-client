import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

export default function button(props) {
  return (
    <TouchableOpacity style={styles.nextButton} {...props}>
      <Text style={{textAlign: 'center', fontSize: 20, color: '#FFF'}}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
