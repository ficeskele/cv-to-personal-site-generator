'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { Profile, Theme, Post } from '../types';
import { AppStatus } from '../types';
import { loadPosts } from '../services/postService';

interface AppContextType {
    profileData: Profile | null;
    setProfileData: React.Dispatch<React.SetStateAction<Profile | null>>;
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
    status: AppStatus;
    setStatus: React.Dispatch<React.SetStateAction<AppStatus>>;
    error: string | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    posts: Post[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [profileData, setProfileData] = useState<Profile | null>(null);
    const [theme, setTheme] = useState<Theme>({
        primary: '#3b82f6',
        secondary: '#6366f1',
        accent: '#ec4899',
        neutral: '#4b5563',
        background: '#ffffff',
        foreground: '#111827',
        font: 'system-ui, sans-serif',
        radius: 0.5,
        darkMode: false,
    });
    const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
    const [error, setError] = useState<string | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    
    useEffect(() => {
        setPosts(loadPosts());
    }, []);
    
    useEffect(() => {
        const root = window.document.documentElement;
        if (theme.darkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme.darkMode]);

    const value = {
        profileData,
        setProfileData,
        theme,
        setTheme,
        status,
        setStatus,
        error,
        setError,
        posts,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};