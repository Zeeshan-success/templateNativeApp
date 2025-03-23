import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    console.log('Message Sent:', { name, email, message });
    // Here, integrate API or email service for sending messages.
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <Text style={styles.title}>Contact Us</Text>
        <Text style={styles.subtitle}>Have questions? Feel free to reach out!</Text>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          {/* Name Input */}
          <View style={styles.inputBox}>
            <Ionicons name="person-outline" size={20} color="#8034eb" />
            <TextInput
              placeholder="Your Name"
              placeholderTextColor="#888"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
          </View>

          {/* Email Input */}
          <View style={styles.inputBox}>
            <Ionicons name="mail-outline" size={20} color="#8034eb" />
            <TextInput
              placeholder="Your Email"
              placeholderTextColor="#888"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
          </View>

          {/* Message Input */}
          <View style={styles.messageBox}>
            <TextInput
              placeholder="Write your message..."
              placeholderTextColor="#888"
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={4}
              style={styles.messageInput}
            />
          </View>
        </View>

        {/* Send Button */}
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send Message</Text>
        </TouchableOpacity>

        {/* Contact Info */}
        <View style={styles.contactInfo}>
          <Text style={styles.contactTitle}>Other Ways to Contact</Text>
          <Text style={styles.contactText}>📧 Email: support@zpnvpn.com</Text>
          <Text style={styles.contactText}>🌍 Website: www.zpnvpn.com</Text>
          <Text style={styles.contactText}>📍 Address: 123 ZPN Street, VPN City</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8034eb',
    textAlign: 'center',
  },
  subtitle: {
    color: '#555',
    textAlign: 'center',
    marginTop: 8,
  },
  inputContainer: {
    marginTop: 20,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: '#333',
  },
  messageBox: {
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    padding: 15,
    height: 120,
  },
  messageInput: {
    color: '#333',
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#8034eb',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactInfo: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    marginTop: 30,
    paddingTop: 20,
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8034eb',
  },
  contactText: {
    color: '#555',
    marginTop: 6,
  },
});

export default ContactUs;
