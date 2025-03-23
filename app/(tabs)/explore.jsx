import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
// import { auth } from "../../firebaseConfig"; // Ensure you import Firebase auth
// import { onAuthStateChanged, signOut } from "firebase/auth";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    // const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //   setUser(currentUser);
    // });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const handleLogout = async () => {
    try {
      // await signOut(auth);
      // setUser(null);
      navigation.navigate('login');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: user.photoURL || 'https://via.placeholder.com/100' }}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>{user.displayName || 'Anonymous User'}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.authContainer}>
          <Text style={styles.welcomeText}>Welcome to ZPN VPN</Text>
          <Text style={styles.descriptionText}>Sign in to enjoy unlimited, secure browsing.</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.signupButton}
              onPress={() => navigation.navigate('signup')}>
              <Text style={styles.signupText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate('login')}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 24,
  },
  profileContainer: {
    width: '100%',
    alignItems: 'center',
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: '#8034eb',
  },
  userName: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: '600',
    color: '#8034eb',
  },
  userEmail: {
    color: 'gray',
  },
  logoutButton: {
    marginTop: 24,
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  logoutText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  authContainer: {
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'gray',
    marginBottom: 16,
  },
  descriptionText: {
    textAlign: 'center',
    color: 'gray',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  signupButton: {
    width: 192,
    borderWidth: 1,
    borderColor: '#8034eb',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  signupText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#8034eb',
  },
  loginButton: {
    width: 192,
    backgroundColor: '#8034eb',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  loginText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
});
