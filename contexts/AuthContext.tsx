import React, { createContext, useState, useEffect, ReactNode } from "react";
import { auth } from "../config/firebase";
import { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  refreshProfile: () => void;
  profileRefreshKey: number;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  refreshProfile: () => {},
  profileRefreshKey: 0,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [profileRefreshKey, setProfileRefreshKey] = useState(0);

  const refreshProfile = () => {
    setProfileRefreshKey((prev) => prev + 1);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(
        "Auth state changed:",
        currentUser ? currentUser.email : "No user"
      );
      setUser(currentUser);
      setLoading(false);
      refreshProfile();
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, refreshProfile, profileRefreshKey }}
    >
      {children}
    </AuthContext.Provider>
  );
};
