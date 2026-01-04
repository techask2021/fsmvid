
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define User Type
interface User {
    id: string;
    email: string;
    role: 'user' | 'admin';
    firstName?: string;
    lastName?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email?: string, password?: string) => Promise<{ success: boolean; error?: string }>;
    signUp: (email: string, password?: string, firstName?: string, lastName?: string, phone?: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check local storage for session
        const storedUserStr = localStorage.getItem('fsmvid_user');
        if (storedUserStr) {
            try {
                setUser(JSON.parse(storedUserStr));
            } catch (e) {
                console.error("Auth hydration error", e);
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email?: string, password?: string) => {
        // For local testing/demo, we use an API route that simulates database lookup
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (data.success) {
                setUser(data.user);
                localStorage.setItem('fsmvid_user', JSON.stringify(data.user));
                return { success: true };
            }
            return { success: false, error: data.error };
        } catch (err) {
            return { success: false, error: "Network error" };
        }
    };

    const signUp = async (email: string, password?: string, firstName?: string, lastName?: string, phone?: string) => {
        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, firstName, lastName, phone })
            });
            const data = await res.json();

            if (data.success) {
                setUser(data.user);
                localStorage.setItem('fsmvid_user', JSON.stringify(data.user));
                return { success: true };
            }
            return { success: false, error: data.error };
        } catch (err) {
            return { success: false, error: "Network error" };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('fsmvid_user');
        window.location.href = '/';
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, signUp, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
