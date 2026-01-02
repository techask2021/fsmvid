"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define User Type
interface User {
    id: string;
    email: string;
    role: 'user' | 'admin';
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check local storage for mock session
        const storedUser = localStorage.getItem('mock_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = () => {
        // Simulate login
        const mockUser: User = {
            id: 'mock-user-id',
            email: 'demo@fsmvid.com',
            role: 'user'
        };
        setUser(mockUser);
        localStorage.setItem('mock_user', JSON.stringify(mockUser));
        window.location.reload(); // Refresh to update UI
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('mock_user');
        window.location.href = '/';
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
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
