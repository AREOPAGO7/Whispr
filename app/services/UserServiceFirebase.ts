import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

// User type definition
interface UserData {
  username: string;
  email: string;
  profilePictureUrl: string;
  bio: string;
  followers: string[];
  following: string[];
  createdAt: any; // Firestore timestamp
  lastOnlineAt: any;
  status: string;
  notificationsEnabled: boolean;
}

/**
 * Creates a user in Firestore with optional default values.
 */
export async function createUserInFirestore(
  userId: string,
  username: string = "Anonymous",
  email: string = "unknown@example.com",
  profilePictureUrl: string = "https://example.com/default-profile.jpg",
  bio: string = "No bio available"
): Promise<void> {
  try {
    const userRef = doc(db, "users", userId);

    const userData: UserData = {
      username,
      email,
      profilePictureUrl,
      bio,
      followers: [],
      following: [],
      createdAt: serverTimestamp(),
      lastOnlineAt: serverTimestamp(),
      status: "offline",
      notificationsEnabled: true,
    };

    await setDoc(userRef, userData);
    console.log("User created successfully!");
  } catch (error) {
    console.error("Error creating user:", error);
  }
}
