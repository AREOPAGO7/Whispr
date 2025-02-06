import { auth } from '../firebase/config';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  updateProfile,
  User
} from 'firebase/auth';

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export class AuthService {
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
      const token = await userCredential.user.getIdToken();
      this.setAuthToken(token);
      return userCredential.user;
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
        return 'This email is already registered';
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/operation-not-allowed':
        return 'Email/password accounts are not enabled';
      case 'auth/weak-password':
        return 'Password is too weak. Please use at least 6 characters';
      case 'auth/user-disabled':
        return 'This account has been disabled';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Invalid email or password';
      default:
        return 'An error occurred. Please try again';
    }
  }
}