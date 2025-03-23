import React, { useState, useRef, useEffect } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen() {
  const [vpnStatus, setVpnStatus] = useState("off");
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (vpnStatus === "connected") {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      glowAnim.setValue(0);
    }
  }, [vpnStatus]);

  const handlePress = () => {
    if (vpnStatus === "off") {
      setVpnStatus("loading");
      setTimeout(() => setVpnStatus("finding-route"), 1500);
      setTimeout(() => setVpnStatus("connecting"), 3000);
      setTimeout(() => setVpnStatus("connected"), 5000);
    } else {
      setVpnStatus("disconnecting");
      setTimeout(() => setVpnStatus("off"), 3000);
    }

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#8034eb" barStyle="light-content" />
      {/* Banner Ad */}
      <View style={styles.bannerAd}>
        <Text style={styles.bannerText}>[ Banner Ad Here ]</Text>
      </View>

      {/* VPN Button */}
      <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
        <Animated.View
          style={[
            styles.vpnButtonContainer,
            {
              shadowOpacity: vpnStatus === "connected" ? 0.6 : 0.3,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <LinearGradient
            colors={
              vpnStatus === "connected"
                ? ["#34D399", "#059669"]
                : ["#8034eb", "#5A23A9"]
            }
            style={styles.vpnButton}
          >
            {vpnStatus === "loading" && (
              <ActivityIndicator color="white" size="large" />
            )}
            {vpnStatus === "finding-route" && (
              <Text style={styles.statusText}>Finding Best Route...</Text>
            )}
            {vpnStatus === "connecting" && (
              <Text style={styles.statusText}>Connecting Tunnel...</Text>
            )}
            {vpnStatus === "connected" && (
              <Animated.View style={{ opacity: glowAnim }}>
                <Feather name="check-circle" size={50} color="white" />
              </Animated.View>
            )}
            {vpnStatus === "disconnecting" && (
              <Text style={styles.statusText}>Disconnecting...</Text>
            )}
            {vpnStatus === "off" && (
              <Feather name="power" size={50} color="white" />
            )}
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>

      {/* VPN Status Label */}
      <Text style={styles.statusLabel}>
        {vpnStatus === "off" && "VPN is Off"}
        {vpnStatus === "loading" && "Starting VPN..."}
        {vpnStatus === "finding-route" && "Finding Best Route..."}
        {vpnStatus === "connecting" && "Connecting Tunnel..."}
        {vpnStatus === "connected" && "Connected"}
        {vpnStatus === "disconnecting" && "Disconnecting..."}
      </Text>

      {/* Banner Ad */}
      <View style={styles.bannerAd}>
        <Text style={styles.bannerText}>[ Banner Ad Here ]</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 24,
  },
  bannerAd: {
    width: "100%",
    height: 80,
    backgroundColor: "black",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerText: {
    color: "white",
    fontSize: 18,
  },
  vpnButtonContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#8034eb",
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 12,
  },
  vpnButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
  },
  statusText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  statusLabel: {
    color: "black",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 16,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
