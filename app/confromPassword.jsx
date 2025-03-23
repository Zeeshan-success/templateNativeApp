import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ResetPassword } from '../components/tanstack/tanstak';
import { useNavigation } from 'expo-router';
import { useRoute } from '@react-navigation/native';

const ConfirmPassword = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { email } = route.params || {};

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Reset Password</Text>

      {/* Email Icon */}
      <View style={styles.iconContainer}>
        <Icon name="email-newsletter" size={50} color="#8034eb" />
      </View>

      {/* Instructions */}
      <Text style={styles.instruction}>Please click the link in the email sent to:</Text>

      {/* Email Address */}
      <Text style={styles.email}>{email}</Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('forgetpassword')}
          style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit email address</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            ResetPassword(email);
            navigation.navigate('login');
          }}
          style={styles.resendButton}>
          <Text style={styles.resendButtonText}>Resend mail</Text>
        </TouchableOpacity>
      </View>

      {/* Login */}
      <TouchableOpacity onPress={() => navigation.navigate('login')}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Can't find the email?{' '}
          <Text style={styles.link} onPress={() => navigation.navigate('faqs')}>
            Have a look at our FAQ{'\n'}
          </Text>
          or{' '}
          <Text style={styles.link} onPress={() => navigation.navigate('contactus')}>
            contact us.
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  iconContainer: {
    backgroundColor: '#f3e8ff',
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
  },
  instruction: {
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
  },
  email: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 10,
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#8034eb',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  editButtonText: {
    color: '#8034eb',
    fontWeight: '500',
  },
  resendButton: {
    backgroundColor: '#8034eb',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  resendButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  loginText: {
    color: '#8034eb',
    fontSize: 18,
    textDecorationLine: 'underline',
    fontWeight: '500',
    marginTop: 15,
  },
  footer: {
    marginTop: 40,
    paddingBottom: 20,
  },
  footerText: {
    color: '#555',
    textAlign: 'center',
  },
  link: {
    color: '#8034eb',
    textDecorationLine: 'underline',
  },
});

export default ConfirmPassword;
