import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";
import Toast from "react-native-toast-message";

export const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, password }) => {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // ✅ Send verification email immediately
      await sendEmailVerification(user);

      // ✅ Log out the user to prevent immediate login before verification
      await signOut(auth);

      // ✅ Show success message to the user
      Toast.show({
        type: "success",
        text1: "Verification Sent 📧",
        text2: "Check your email and verify before logging in.",
      });

      return {
        message: "Verification email sent. Please verify before logging in.",
      };
    },
    onSuccess: (data) => {
      console.log("Signup successful:", data);
      queryClient.setQueryData(["user"], null); // Clear user cache until verification
    },
    onError: (error) => {
      console.error("Signup Error:", error.message);
      Toast.show({
        type: "error",
        text1: "Signup Failed ❌",
        text2: error.message,
      });
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ email, password }) => {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // ✅ Check if email is verified
      if (!user.emailVerified) {
        await signOut(auth); // Logout unverified user
        Toast.show({
          type: "error",
          text1: "Login Failed ❌",
          text2: "Please verify your email first.",
        });
        throw new Error("Please verify your email before logging in.");
      }

      return user;
    },
    onSuccess: (user) => {
      console.log("Login successful:", user);
      Toast.show({
        type: "success",
        text1: "Login Successful ✅",
        text2: "Welcome back!",
      });
      // Navigate to home screen here
    },
    onError: (error) => {
      console.error("Login Error:", error.message);
      Toast.show({
        type: "error",
        text1: "Login Failed ❌",
        text2: "please check Your email and Password",
      });
    },
  });
};

export const SendEmailVerify = async (email) => {
  try {
    const lowerCaseEmail = email.trim().toLowerCase(); // Convert email to lowercase
    console.log("Resending email to:", lowerCaseEmail);

    // Check if the email is registered in Firebase
    const signInMethods = await fetchSignInMethodsForEmail(
      auth,
      lowerCaseEmail
    );

    if (signInMethods.length === 0) {
      Toast.show({
        type: "error",
        text1: "Email Not Found ❌",
        text2: "No account exists with this email.",
      });
      return;
    }

    // ✅ Send verification email
    await sendSignInLinkToEmail(auth, lowerCaseEmail, {
      url: "http://localhost:8081", // Change to your actual app URL
      handleCodeInApp: true,
      android: {
        packageName: "com.yourapp.android",
        installApp: true,
        minimumVersion: "12",
      },
      iOS: {
        bundleId: "com.yourapp.ios",
      },
    });

    Toast.show({
      type: "success",
      text1: "Verification Email Sent ✅",
      text2: "Check your inbox and click the link to verify.",
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
    Toast.show({
      type: "error",
      text1: "Error ❌",
      text2: error.message,
    });
  }
};

export const ResetPassword = async (email) => {
  const auth = getAuth();
  try {
    await sendPasswordResetEmail(auth, email);
    console.log(`✅ Password reset email sent to ${email}`);
    Toast.show({
      type: "success",
      text1: "Email Sent ✅",
      text2: "Check your inbox for the reset link.",
    });
  } catch (error) {
    console.error("❌ Error sending reset email:", error.message);
    Toast.show({
      type: "error",
      text1: "Reset Failed ❌",
      text2: error.message,
    });
  }
};
