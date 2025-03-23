import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Icons
import { faqsData } from '../components/arrays/arrays';

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Header */}
        <Text style={styles.title}>Frequently Asked Questions</Text>
        <Text style={styles.subtitle}>
          Find answers to the most common questions about ZPN VPN.
        </Text>

        {/* FAQ List */}
        <View style={styles.faqList}>
          {faqsData.map((faq, index) => (
            <View key={index} style={styles.faqItem}>
              <TouchableOpacity onPress={() => toggleFAQ(index)} style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Ionicons
                  name={openIndex === index ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color="#8034eb"
                />
              </TouchableOpacity>

              {openIndex === index && (
                <View style={styles.faqAnswer}>
                  <Text style={styles.answerText}>{faq.answer}</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Contact Support Section */}
        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Need More Help?</Text>
          <Text style={styles.contactText}>
            If your question isn't listed here, feel free to contact us at{' '}
            <Text style={styles.contactEmail}>support@zpnvpn.com</Text>.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

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
  faqList: {
    marginTop: 20,
  },
  faqItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#f2f2f2',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8034eb',
    flex: 1,
  },
  faqAnswer: {
    padding: 15,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  answerText: {
    color: '#555',
  },
  contactSection: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8034eb',
  },
  contactText: {
    color: '#555',
    marginTop: 5,
  },
  contactEmail: {
    fontWeight: 'bold',
    color: '#8034eb',
  },
});

export default FAQs;
