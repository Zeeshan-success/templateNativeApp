export const registerUser = async (name, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
  
      // Save user data to Firebase Database
      await set(ref(database, "users/" + userId), {
        name,
        email,
        createdAt: new Date().toISOString(),
      });
  
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };