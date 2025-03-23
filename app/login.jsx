import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ErrorMessage } from '@hookform/error-message';
import GlobalButton from '../components/global/button';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '../components/global/InputField';
import { LoginInputfiled } from '../components/arrays/arrays';
import { schemaloginForm } from '../components/zodSchema/zodSchema';
import { useLogin } from '../components/tanstack/tanstak';
import Toast from 'react-native-toast-message';
import { Link, useRouter } from 'expo-router';

const Login = () => {
  const router = useRouter();
  const loginMutation = useLogin();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemaloginForm),
    mode: 'onChange',
  });

  const handlePress = (i) => {
    router.push(i.label === 'Password' ? '/forgetpassword' : '/emailverify');
  };

  const onSubmit = (data) => {
    loginMutation.mutate(
      {
        email: data.Email,
        password: data.Password,
      },
      {
        onSuccess: () => {
          Toast.show({ type: 'success', text1: 'Success 🎉', text2: 'Login Successfully!' });
          router.replace('/(tabs)');
        },
        onError: (error) => {
          let errorMessage = 'Invalid Email and Password';
          if (error.code === 'auth/user-not-found')
            errorMessage = 'User not found. Please check your email.';
          else if (error.code === 'auth/wrong-password')
            errorMessage = 'Invalid password. Please try again.';
          else if (error.code === 'auth/invalid-email') errorMessage = 'Invalid email format.';
          else if (error.code === 'auth/user-disabled')
            errorMessage = 'This account has been disabled.';

          Toast.show({ type: 'error', text1: 'Login Failed ❌', text2: errorMessage });
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.purpleBackground} />
      <Text style={styles.title}>Login</Text>
      <Text style={styles.signupText}>
        Create New Account{' '}
        <Link href="/signup" style={styles.signupLink}>
          Signup
        </Link>{' '}
        here
      </Text>

      <View style={styles.inputWrapper}>
        {LoginInputfiled.map((i, index) => (
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
                  style={styles.inputField}
                />
              )}
            />
            <View style={styles.errorWrapper}>
              <View style={{ flex: 1 }}>
                <ErrorMessage
                  errors={errors}
                  name={i.formhook}
                  render={({ message }) => <Text style={styles.errorText}>{message}</Text>}
                />
              </View>
              <TouchableOpacity onPress={() => handlePress(i)}>
                <Text style={styles.forgotText}>
                  {i.label === 'Password' ? 'Forgot Password?' : 'Not Verify?'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <GlobalButton
        onpress={handleSubmit(onSubmit)}
        styling={styles.button}
        text={'Log in'}
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
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  purpleBackground: {
    backgroundColor: '#8034eb',
    position: 'absolute',
    transform: [{ rotate: '-10deg' }],
    width: '140%',
    height: 350,
    top: -150,
  },
  title: {
    fontSize: 50,
    fontWeight: '500',
  },
  signupText: {
    textAlign: 'center',
    fontWeight: 'normal',
    color: 'black',
  },
  signupLink: {
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#8034eb',
  },
  inputWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  inputText: {
    color: 'black',
    fontSize: 15,
  },
  inputField: {
    width: '100%',
    textAlign: 'center',
  },
  errorWrapper: {
    width: 280,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  forgotText: {
    color: '#8034eb',
    fontSize: 12,
    textAlign: 'right',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#8034eb',
    width: 200,
    borderRadius: 10,
    height: 35,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default Login;
