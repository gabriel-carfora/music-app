import { useState } from 'react';
import { auth } from 'config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

interface UseLoginForm {
  onSuccess: () => void;
}

interface LoginFormState {
  email: string;
  password: string;
  error: string | null;
  isLoading: boolean;
}

export const useLoginForm = ({ onSuccess }: UseLoginForm) => {
  const [formState, setFormState] = useState<LoginFormState>({
    email: '',
    password: '',
    error: null,
    isLoading: false,
  });

  const handleEmailChange = (text: string) => {
    setFormState(prev => ({ ...prev, email: text, error: null }));
  };

  const handlePasswordChange = (text: string) => {
    setFormState(prev => ({ ...prev, password: text, error: null }));
  };

  const getErrorMessage = (errorCode: string): string => {
    const errorMessages: Record<string, string> = {
      'auth/user-not-found': 'No user found with this email.',
      'auth/wrong-password': 'Incorrect password.',
      'auth/invalid-email': 'Invalid email address.',
      'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
      'auth/network-request-failed': 'Network error. Please check your connection.',
    };

    return errorMessages[errorCode] || 'An error occurred during login.';
  };

  const handleSubmit = async () => {
    if (!formState.email || !formState.password) {
      setFormState(prev => ({ ...prev, error: 'Please enter both email and password.' }));
      return;
    }

    setFormState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formState.email,
        formState.password
      );
      console.log('User logged in with UID:', userCredential.user.uid);
      onSuccess();
    } catch (error: any) {
      console.error('Error logging in:', error);
      setFormState(prev => ({ 
        ...prev, 
        error: getErrorMessage(error.code)
      }));
    } finally {
      setFormState(prev => ({ ...prev, isLoading: false }));
    }
  };

  return {
    ...formState,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  };
};