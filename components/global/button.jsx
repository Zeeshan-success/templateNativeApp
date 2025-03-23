import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const GlobalButton = ({ styling, text, onpress, textstyling }) => {
  return (
    <TouchableOpacity onPress={onpress} style={[styles.button, styling]}>
      <Text style={[styles.buttonText, textstyling]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 280,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#8034eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
    fontWeight: '600',
  },
});

export default GlobalButton;
