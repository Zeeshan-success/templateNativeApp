import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function HomeScreen() {
  const [vpnStatus, setVpnStatus] = useState('off');
  const scaleAnim = new Animated.Value(1);

  const handlePress = () => {
    if (vpnStatus === 'off') {
      setVpnStatus('loading');
      setTimeout(() => setVpnStatus('finding-route'), 1500);
      setTimeout(() => setVpnStatus('connecting'), 3000);
      setTimeout(() => setVpnStatus('connected'), 5000);
    } else {
      setVpnStatus('disconnecting');
      setTimeout(() => setVpnStatus('off'), 3000);
    }
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.1, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.bannerAd}>
        <Text style={styles.bannerText}>[ Banner Ad Here ]</Text>
      </View>

      <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
        <Animated.View
          style={[
            styles.vpnButton,
            {
              backgroundColor: vpnStatus === 'connected' ? '#34D399' : '#8034eb',
              transform: [{ scale: scaleAnim }],
            },
          ]}>
          {vpnStatus === 'loading' && <ActivityIndicator color="white" size="large" />}
          {vpnStatus === 'finding-route' && (
            <Text style={styles.statusText}>Finding Best Route...</Text>
          )}
          {vpnStatus === 'connecting' && (
            <Text style={styles.statusText}>Connecting Tunnel...</Text>
          )}
          {vpnStatus === 'connected' && <Feather name="check-circle" size={50} color="white" />}
          {vpnStatus === 'disconnecting' && <Text style={styles.statusText}>Disconnecting...</Text>}
          {vpnStatus === 'off' && <Feather name="power" size={50} color="white" />}
        </Animated.View>
      </TouchableOpacity>

      <Text style={styles.statusLabel}>
        {vpnStatus === 'off' && 'VPN is Off'}
        {vpnStatus === 'loading' && 'Starting VPN...'}
        {vpnStatus === 'finding-route' && 'Finding Best Route...'}
        {vpnStatus === 'connecting' && 'Connecting Tunnel...'}
        {vpnStatus === 'connected' && 'Connected'}
        {vpnStatus === 'disconnecting' && 'Disconnecting...'}
      </Text>

      <View style={styles.bannerAd}>
        <Text style={styles.bannerText}>[ Banner Ad Here ]</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 24,
  },
  bannerAd: {
    width: '100%',
    height: 80,
    backgroundColor: '#2d2d2d',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerText: {
    color: 'white',
    fontSize: 18,
  },
  vpnButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statusLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
});
