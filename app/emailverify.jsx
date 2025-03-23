import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, useNavigation, useRouter } from 'expo-router';
import { ErrorMessage } from '@hookform/error-message';
import GlobalButton from '../components/global/button';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '../components/global/InputField';
import { EmailVerifyInputfiled } from '../components/arrays/arrays';
import { schemaEmailVerifyForm } from '../components/zodSchema/zodSchema';

const EmailVerify = () => {
  const router = useRouter();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemaEmailVerifyForm),
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    console.log('Verify Email Data:', data.Email);
    const email = data.Email;
    navigation.navigate('conformEmail', { email });
  };

  return (
    <View style={styles.container}>
      {/* Heading */}
      <Text style={styles.title}>Email Verify</Text>
      <Text style={styles.subtitle}>
        Already Verified?{' '}
        <Link href="/login" style={styles.linkText}>
          Login
        </Link>{' '}
        here
      </Text>

      {/* Input Fields */}
      <View style={styles.inputWrapper}>
        {EmailVerifyInputfiled.map((i, index) => (
          <View key={index} style={styles.inputContainer}>
            <Controller
              control={control}
              name={i.formhook}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  label={i.label}
                  placeholder={i.placeholder}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry={i.secureTextEntry}
                  textstyling={styles.inputText}
                />
              )}
            />
            {/* Error Message */}
            <ErrorMessage
              errors={errors}
              name={i.formhook}
              render={({ message }) => <Text style={styles.errorText}>{message}</Text>}
            />
          </View>
        ))}
      </View>

      {/* Verify Button */}
      <GlobalButton
        onpress={handleSubmit(onSubmit)}
        styling={styles.button}
        text={'Verify Email'}
        textstyling={styles.buttonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8034eb',
  },
  title: {
    color: 'white',
    fontSize: 50,
    fontWeight: '500',
  },
  subtitle: {
    color: 'white',
    fontSize: 15,
    fontWeight: '300',
    textAlign: 'center',
  },
  linkText: {
    fontSize: 15,
    fontWeight: '600',
    textDecorationLine: 'underline',
    color: 'white',
  },
  inputWrapper: {
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  inputContainer: {
    width: 280,
    marginBottom: 10,
  },
  inputText: {
    color: 'white',
    fontSize: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 3,
  },
  button: {
    backgroundColor: 'white',
    width: 200,
    borderRadius: 10,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default EmailVerify;
