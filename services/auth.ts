import { auth, db } from 'config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';

interface RegisterUserData {
  username: string;
  email: string;
  password: string;
}

export const checkUsernameAvailability = async (username: string): Promise<boolean> => {
  const usernameDoc = await getDoc(doc(db, 'usernames', username.toLowerCase()));
  return !usernameDoc.exists();
};

export const registerUser = async ({ username, email, password }: RegisterUserData) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(db, 'users', user.uid), {
    username,
    email,
    profilePic: '',
    createdAt: serverTimestamp(),
  });

  await setDoc(doc(db, 'usernames', username.toLowerCase()), {
    uid: user.uid,
  });

  return user;
};