/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, Text, StyleSheet, View, Linking} from 'react-native';
import BackIcon from '../../assets/back-icon';

const ItemText = ({title, text}: {text: string; title: string}) => {
  return (
    <View style={{display: 'flex', flexDirection: 'row', paddingRight: 30}}>
      <Text style={{...styles.subHeader, marginRight: 10}}>-</Text>
      <Text style={styles.text2}>
        <Text style={styles.sectionTitle2}>
          {title !== '' ? `${title}: ` : ''}
        </Text>
        {text}
      </Text>
    </View>
  );
};

const TermsAndPrivacyPolicyScreen: React.FC = () => {
  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{height: 40}} />

      <Text style={styles.header}>
        Thymio Suite Mobile App Terms of Service
      </Text>
      <Text style={styles.text}>
        Welcome to the Thymio Suite Mobile app (the "App") provided by Mobsya
        Association. This policy explains our practices regarding information
        collection, use, and disclosure through the App. By using the App, you
        agree to the terms of this policy.
      </Text>
      <Text style={styles.sectionTitle}>Disclaimers:</Text>
      <Text style={styles.text}>
        This App and associated content are provided on an "as is" basis without
        warranties of any kind. Our company disclaims liability for any damages
        from App use to the fullest extent permitted by law. Users agree to use
        the App at their own risk.
      </Text>
      <Text style={styles.sectionTitle}>Updates:</Text>
      <Text style={styles.text}>
        This Terms of Service and Privacy Policy may be updated periodically.
        Material changes will be communicated through the App. Your continued
        use constitutes acceptance of the updated terms.
      </Text>
      <Text style={styles.sectionTitle}>Termination:</Text>
      <Text style={styles.text}>
        We reserve the right to modify, suspend or terminate the App at any
        time. Advance notice will be provided as required.
      </Text>
      <Text style={styles.sectionTitle}>Legal Disputes:</Text>
      <Text style={styles.text}>
        These terms are governed by the laws of Switzerland. Disputes will be
        resolved through binding arbitration or courts in Lausanne, Vaud Canton.
      </Text>
      <Text style={styles.sectionTitle}>Contact</Text>
      <Text style={styles.text}>
        For any privacy policy questions{' '}
        <Text
          style={styles.link}
          onPress={() => handleLinkPress('mailto:info@mobsya.org')}>
          info@mobsya.org
        </Text>
        ,{' '}
        <Text
          style={styles.link}
          onPress={() => handleLinkPress('http://www.thymio.org')}>
          www.thymio.org
        </Text>
      </Text>

      <View style={{height: 40}} />

      <Text style={styles.header}>Thymio Suite Mobile App Privacy Policy</Text>
      <Text style={styles.text}>
        Welcome to the Thymio Suite Mobile app (the "App") provided by Mobsya
        Association. This policy explains our practices regarding information
        collection, use, and disclosure through the App. By using the App, you
        agree to the terms of this policy.
      </Text>

      <Text style={styles.sectionTitle}>Information Collection and Use:</Text>
      <ItemText
        title="No User Registration"
        text="The App does not require any user registration, account creation, or login. We do not collect any personal information such as names, email addresses, phone numbers, or other directly identifying data."
      />

      <ItemText
        title="Technical Data"
        text="The App collects limited technical data like IP address, device model, operating system, and unique device identifiers solely to enable communication between the device and Thymio robots."
      />

      <ItemText
        title="Children's Privacy"
        text="For users under 18 years old, we never collect, use, or disclose any personal information whatsoever in compliance with common laws such as GDPR. Our commitment is to never target children with unauthorized advertisements or content prohibited for their age."
      />

      <Text style={styles.sectionTitle}>Data Practices:</Text>

      <ItemText
        title="Data Storage"
        text="Any user-created programs or projects are stored locally on the device only. We do not transmit or store any user data."
      />

      <ItemText
        title="Data Sharing"
        text=" We never share, sell, trade, or disclose any user information to third parties. Should we decide to do so, we will get your explicit and informed consent to do so."
      />

      <ItemText
        title="Data Retention and Deletion"
        text="Since we do not retain any user data, we have no data retention or deletion policies. User data resides solely on user devices."
      />

      <Text style={styles.sectionTitle}>Third-Party Services:</Text>

      <ItemText
        title="Analytics"
        text="To distribute and publish this application, we use Google Play. Through the Google Play Console, we receive reports on the application's downloads. However, we do not implement additional settings to analyze user or usage trends. Furthermore, we have disabled all third-party data collection in this application to ensure your privacy."
      />

      <ItemText
        title="External Platforms"
        text="The App doesn't interface with external services like YouTube for videos, social media, or other platforms."
      />

      <Text style={styles.sectionTitle}>Security:</Text>

      <ItemText
        title=""
        text="We employ industry-standard security measures to protect all data and technical information required for the operation of the application. However, while we strive to secure your data, we cannot guarantee that data transmission will be completely immune to unauthorized access or use that is contrary to our terms of service."
      />

      <Text style={styles.sectionTitle}>Contact</Text>
      <Text style={styles.text}>
        For any privacy policy questions, contact{' '}
        <Text
          style={styles.link}
          onPress={() => handleLinkPress('mailto:info@mobsya.org')}>
          info@mobsya.org
        </Text>
        , visit{' '}
        <Text
          style={styles.link}
          onPress={() => handleLinkPress('http://www.thymio.org')}>
          www.thymio.org
        </Text>
      </Text>
      <View style={{height: 20}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
  },
  header: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 5,
  },
  sectionTitle2: {
    fontSize: 13,
    fontWeight: '500',
  },
  text: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 10,
  },
  text2: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 10,
  },
  link: {
    color: '#007AFF', // iOS default blue color for links
    textDecorationLine: 'underline',
  },
});

export default TermsAndPrivacyPolicyScreen;
