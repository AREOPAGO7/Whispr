import axios from 'axios';

// Define the user data interface to ensure the correct structure is passed
interface UserData {
  uid: string;
  name: string;
  email: string;
  profilePicture?: string; // Optional field
}
interface User {
    uid: string;
    name: string;
    email: string;
    profilePicture?: string;
  }

export const createUser = async (userData: UserData): Promise<any> => {
  try {
    const { uid, name, email, profilePicture } = userData;

    if (!uid || !name || !email) {
      throw new Error('UID, name, and email are required.');
    }

    const existingUserResponse = await axios.post('http://localhost:7000/users', { uid });
    if (existingUserResponse.data && existingUserResponse.data.user) {
      // User already exists, do nothing
      return { message: 'User already exists, no action taken.' };
    }

    const response = await axios.post('http://localhost:7000/createUser', {
      uid,
      name,
      email,
      profilePicture: profilePicture || '',
    });

    return response.data; 
  } catch (error: any) {
    console.error('Error creating user:', error); 

    if (axios.isAxiosError(error)) {
      throw new Error(`Network Error: ${error.message}`); 
    } else {
      throw new Error("An unknown error occurred while creating the user."); 
    }
  }
};
export const getUserById = async (uid: string): Promise<User | null> => {
    try {
      const response = await axios.post('http://localhost:7000/users', {
        uid,
      });
  
      if (response.data && response.data.user) {
        return response.data.user; // Return the user data
      } else {
        console.error('Unexpected response format:', response.data);
        return null;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Server responded with an error:', error.response.data);
        } else if (error.request) {
         
          console.error('No response received from the server:', error.request);
        } else {
          
          console.error('Error setting up the request:', error.message);
        }
      } else {
        
        console.error('An unexpected error occurred:', error);
      }
  
      return null;
    }
  };