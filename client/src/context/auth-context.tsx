import React, { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { User } from "@shared/schema";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  login: (username: string, password: string) => Promise<User>;
  register: (userData: any) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  setUser: () => {},
  login: async () => {
    throw new Error("login function not implemented");
  },
  register: async () => {
    throw new Error("register function not implemented");
  },
  logout: () => {}
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  // Check for stored user info in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("globex-user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("globex-user");
      }
    }
    setInitialCheckDone(true);
  }, []);

  // Login function
  const login = async (username: string, password: string): Promise<User> => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    const userData = await response.json();
    setUser(userData);
    localStorage.setItem("globex-user", JSON.stringify(userData));
    return userData;
  };

  // Register function
  const register = async (userData: any): Promise<User> => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Registration failed");
    }

    const newUser = await response.json();
    setUser(newUser);
    localStorage.setItem("globex-user", JSON.stringify(newUser));
    return newUser;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("globex-user");
    // Invalidate authenticated queries
    queryClient.clear();
  };

  const isLoading = !initialCheckDone;
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        setUser,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
