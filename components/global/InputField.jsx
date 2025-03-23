import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const InputField = ({ label, placeholder, onChangeText, secureTextEntry, textstyling, value }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={{ display: 'flex', gap: 5 }}>
      {/* Label */}
      <Text style={[{ fontSize: 15, color: 'black', fontWeight: '500' }, textstyling]}>
        {label}
      </Text>

      {/* Input Field with Password Toggle */}
      <View
        style={{
          position: 'relative',
          width: 280,
          backgroundColor: '#f3f3f3',
          borderRadius: 12,
          paddingHorizontal: 12,
          height: 45,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          elevation: 3, // Android shadow
          shadowColor: '#000', // iOS shadow
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 3.84,
        }}>
        <TextInput
          style={{
            flex: 1,
            fontSize: 15,
            color: '#333',
            paddingVertical: 8,
          }}
          placeholder={placeholder}
          placeholderTextColor="gray"
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          value={value}
        />

        {/* Eye Icon for Password Visibility Toggle */}
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather name={showPassword ? 'eye' : 'eye-off'} size={20} color="gray" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default InputField;
