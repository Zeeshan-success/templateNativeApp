import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const PrivacyPolicy = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Header */}
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.subtitle}>Last Updated: March 2025</Text>

        {/* Sections */}
        {privacySections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionText}>{section.content}</Text>
          </View>
        ))}

        {/* Footer */}
        <Text style={styles.footer}>
          © {new Date().getFullYear()} ZPN VPN. All rights reserved.
        </Text>
      </View>
    </ScrollView>
  );
};

const privacySections = [
  {
    title: '1. Introduction',
    content:
      'Welcome to ZPN VPN. Your privacy is important to us. This policy explains how we collect, use, and protect your data.',
  },
  {
    title: '2. Information We Collect',
    content:
      'We do not track, log, or store any browsing activity. However, we may collect minimal data for security and functionality:\n\n- Email Address: Used for account creation & support.\n- Device Information: To optimize performance.\n- Crash Reports: Helps improve stability.',
  },
  {
    title: '3. How We Use Your Data',
    content:
      '- To provide secure VPN services.\n- To send important updates (no spam!).\n- To improve user experience & app security.',
  },
  {
    title: '4. Data Security',
    content:
      'We use encryption and secure servers to protect your data. We never sell or share your personal data.',
  },
  {
    title: '5. Third-Party Services',
    content:
      'ZPN VPN may use third-party services (e.g., Google Analytics) for performance tracking but does not share sensitive data.',
  },
  {
    title: '6. Your Rights',
    content:
      '- You can delete your account anytime.\n- You can request data removal.\n- You can opt-out of marketing emails.',
  },
  {
    title: '7. Updates & Changes',
    content:
      'We may update this Privacy Policy. Continued use of ZPN VPN means you accept the changes.',
  },
  {
    title: '8. Contact Us',
    content: 'If you have any concerns, contact us at support@zpnvpn.com.',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  innerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#8034eb',
    textAlign: 'center',
  },
  subtitle: {
    color: 'gray',
    textAlign: 'center',
    marginTop: 8,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8034eb',
  },
  sectionText: {
    color: '#555',
    marginTop: 5,
    lineHeight: 22,
  },
  footer: {
    color: 'gray',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 30,
  },
});

export default PrivacyPolicy;
