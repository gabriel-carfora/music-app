import { useState } from 'react';
import { Alert } from 'react-native';
import { auth, db } from '../../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { RegisterForm, ValidationErrors } from 'types/auth';

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateForm = (form: RegisterForm): boolean => {
    const newErrors: ValidationErrors = {};

    if (!form.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const register = async (form: RegisterForm): Promise<boolean> => {
    if (!validateForm(form)) {
      return false;
    }

    setIsLoading(true);
    try {
      const usernameDoc = await getDoc(doc(db, 'usernames', form.username.toLowerCase()));
      if (usernameDoc.exists()) {
        setErrors({ username: 'Username already taken' });
        return false;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      await Promise.all([
        setDoc(doc(db, 'users', user.uid), {
          username: form.username,
          email: form.email,
          profilePic: '',
          createdAt: serverTimestamp(),
          spotifyConnected: false,
          spotifyProfile: null,
        }),
        setDoc(doc(db, 'usernames', form.username.toLowerCase()), {
          uid: user.uid,
        })
      ]);

      await signInWithEmailAndPassword(auth, form.email, form.password);

      return true;
    } catch (error: any) {
      Alert.alert('Registration Error', error.message || 'An error occurred during registration');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    isLoading,
    errors,
  };
};