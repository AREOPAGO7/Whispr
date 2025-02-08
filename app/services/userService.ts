import { auth } from '../firebase/config';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  updateProfile,
  User,
  sendPasswordResetEmail
} from 'firebase/auth';

import { GoogleAuthProvider, signInWithPopup ,GithubAuthProvider} from 'firebase/auth';

export class AuthService {
  static getUser(uid: string) {
    throw new Error('Method not implemented.');
  }
  static async googleSignIn() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      this.setAuthToken(token);
      return result.user;
    } catch (error) {
      throw error;
    }
  }
  static async githubSignIn() {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      this.setAuthToken(token);
      return result.user;
    } catch (error) {
      throw error;
    }
  }
  static async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      this.setAuthToken(token);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  static async signup(email: string, password: string, name?: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
      if (name) {
        await updateProfile(userCredential.user, { displayName: name });
      }
  
      const uid = userCredential.user.uid;
  
      // Reload user after signup to ensure we get the updated user data
      await userCredential.user.reload();
  
      const token = await userCredential.user.getIdToken();
      this.setAuthToken(token);
  
      return uid;  // Return the user ID after reload
    } catch (error) {
      throw error;
    }
  }
  

  static async logout() {
    try {
      await signOut(auth);
      this.removeAuthToken();
    } catch (error) {
      throw error;
    }
  }

  static async refreshToken() {
    try {
      const user = auth.currentUser;
      if (user) {
        const newToken = await user.getIdToken(true);
        this.setAuthToken(newToken);
        return newToken;
      }
    } catch (error) {
      throw error;
    }
  }

  static setAuthToken(token: string) {
    document.cookie = `auth-token=${token}; path=/; max-age=3600; SameSite=Strict; Secure`;
  }

  static removeAuthToken() {
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }

  static getErrorMessage(error: any): string {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'This email is already registered. Please use a different email or log in.';
      case 'auth/invalid-email':
        return 'The email address format is invalid. Please enter a valid email.';
      case 'auth/operation-not-allowed':
        return 'This authentication method is not enabled. Please contact support.';
      case 'auth/weak-password':
        return 'The password is too weak. Please use at least 6 characters, including letters and numbers.';
      case 'auth/user-disabled':
        return 'This account has been disabled. Please contact support for assistance.';
      case 'auth/user-not-found':
        return 'No user found with this email address. Please check your input or sign up.';
      case 'auth/wrong-password':
        return 'The password is incorrect. Please try again or reset your password.';
      case 'auth/network-request-failed':
        return 'A network error occurred. Please check your internet connection and try again.';
      case 'auth/too-many-requests':
        return 'Too many login attempts. Please wait a moment before trying again.';
      case 'auth/requires-recent-login':
        return 'Please reauthenticate to complete this action.';
      case 'auth/account-exists-with-different-credential':
        return 'An account already exists with a different sign-in method.';
      case 'auth/invalid-credential':
        return 'invalid email or password.';
      default:
        return `An error occurred: ${error.message || 'Please try again later.'}`;
    }
  }
  

  static async resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw error;
    }
  }
}