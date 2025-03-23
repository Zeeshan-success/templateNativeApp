import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import GlobalButton from '../components/global/button';
import InputField from '../components/global/InputField';
import { Link, useRouter } from 'expo-router';
import { Signupinputfiled } from '../components/arrays/arrays';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorMessage } from '@hookform/error-message';
import { schemaSignupForm } from '../components/zodSchema/zodSchema';
import { useSignup } from '../components/tanstack/tanstak';
import Toast from 'react-native-toast-message';

const Signup = () => {
  const router = useRouter();
  const signupMutation = useSignup();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemaSignupForm),
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    if (!data.Email || !data.Password) {
      Toast.show({
        type: 'error',
        text1: 'Signup Failed ❌',
        text2: 'Email or Password is missing.',
      });
      return;
    }
    signupMutation.mutate(
      { email: data.Email, password: data.Password },
      {
        onSuccess: () => {
          Toast.show({
            type: 'success',
            text1: 'Success 🎉',
            text2: 'Account Created Successfully!',
          });
          router.push('/login');
        },
        onError: (error) => {
          Toast.show({
            type: 'error',
            text1: 'Signup Failed ❌',
            text2: error.message || 'Something went wrong.',
          });
        },
      }
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.content}>
            <Text style={styles.title}>Create New{'\n'}Account</Text>
            <Text style={styles.subtitle}>
              Already Registered?{' '}
              <Link href="/login" style={styles.linkText}>
                Login
              </Link>{' '}
              here
            </Text>

            <View style={styles.inputWrapper}>
              {Signupinputfiled.map((i, index) => (
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
                        textstyling={styles.inputLabel}
                      />
                    )}
                  />
                  <ErrorMessage
                    errors={errors}
                    name={i.formhook}
                    render={({ message }) => <Text style={styles.errorText}>{message}</Text>}
                  />
                </View>
              ))}

              {/* Terms and Conditions */}
              <View style={styles.termsContainer}>
                <Controller
                  control={control}
                  name="terms"
                  defaultValue={false}
                  render={({ field: { value, onChange } }) => (
                    <TouchableOpacity onPress={() => onChange(!value)} style={styles.checkbox}>
                      {value && <Text style={styles.checkboxText}>✔</Text>}
                    </TouchableOpacity>
                  )}
                />
                <Link href="/terms&conditions" style={styles.termsLink}>
                  Terms and Conditions.
                </Link>
              </View>

              {errors.terms && <Text style={styles.errorText}>{errors.terms.message}</Text>}
            </View>

            {/* Signup Button */}
            <GlobalButton
              onpress={handleSubmit(onSubmit)}
              styling={styles.button}
              text={'Sign Up'}
              textstyling={styles.buttonText}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8034eb',
  },
  scrollView: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '300',
    color: 'white',
  },
  linkText: {
    fontSize: 15,
    fontWeight: '600',
    textDecorationLine: 'underline',
    color: 'white',
  },
  inputWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputContainer: {
    width: 280,
    marginBottom: 15,
  },
  inputLabel: {
    color: 'white',
    fontSize: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginLeft: 5,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 14,
    height: 14,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  checkboxText: {
    color: 'black',
    fontSize: 8,
  },
  termsLink: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: 'white',
    width: 200,
    borderRadius: 10,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default Signup;