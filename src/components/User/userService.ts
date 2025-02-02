import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

// CREATE: Add a new user
interface UserData {
  name: string;
  email: string;
  phone: string;
  age?: number;
  createdAt: string;
}

export const createUser = async (userId: string, userData: UserData): Promise<void> => {
  try {
    console.log(userId)
    await setDoc(doc(db, "users", userId), userData);
    console.log("User created successfully!");
  } catch (error) {
    console.error("Error creating user: ", error);
  }
};

// READ: Fetch user profile
export const getUser = async (userId: string): Promise<UserData | null> => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    } else {
      console.log("No such user!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user: ", error);
    return null;
  }
};

// UPDATE: Update user profile
export const updateUser = async (userId: string, userData: Partial<UserData>): Promise<void> => {
  try {
    await setDoc(doc(db, "users", userId), userData);
    console.log("User updated successfully!");
  } catch (error) {
    console.error("Error updating user: ", error);
  }
};

// DELETE: Delete user profile
export const deleteUser = async (userId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "users", userId));
    console.log("User deleted successfully!");
  } catch (error) {
    console.error("Error deleting user: ", error);
  }
};