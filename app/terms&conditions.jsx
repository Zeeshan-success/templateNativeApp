import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

const TermsConditions = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Header */}
        <Text style={styles.title}>Terms and Conditions</Text>
        <Text style={styles.subtitle}>Last Updated: March 2025</Text>

        {/* Sections */}
        {termsSections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.isLink ? (
              <Text style={styles.sectionText}>
                {section.content}{' '}
                <Link href="/privacypolicy">
                  <Text style={styles.link}>Privacy Policy</Text>
                </Link>
                .
              </Text>
            ) : (
              <Text style={styles.sectionText}>{section.content}</Text>
            )}
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

const termsSections = [
  {
    title: '1. Introduction',
    content:
      'Welcome to ZPN VPN. By using our app, you agree to these Terms and Conditions. Please read them carefully before using our service.',
  },
  {
    title: '2. Privacy Policy',
    content:
      'Your privacy is important to us. We do not track, log, or store any browsing activity. For details, view our',
    isLink: true,
  },
  {
    title: '3. Acceptable Use Policy',
    content:
      'You agree not to use ZPN VPN for illegal activities, hacking, spamming, or any activity that violates laws. Misuse may result in access restrictions.',
  },
  {
    title: '4. Security & Fair Use',
    content:
      'While we provide secure connections, we cannot guarantee 100% protection from cyber threats. Avoid sharing personal information on untrusted websites.',
  },
  {
    title: '5. Limitations of Liability',
    content:
      'We provide ZPN VPN "as is" without warranties. We are not responsible for connection failures, third-party data breaches, or service interruptions.',
  },
  {
    title: '6. Updates & Changes',
    content: 'We may update these Terms. Continued use of ZPN VPN means you accept the changes.',
  },
  {
    title: '7. Contact Us',
    content: 'If you have questions, email us at support@zpnvpn.com.',
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
  link: {
    color: '#8034eb',
    textDecorationLine: 'underline',
  },
  footer: {
    color: 'gray',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 30,
  },
});

export default TermsConditions;
