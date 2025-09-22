'use client';

import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Footer: React.FC = () => {
    const { profileData } = useAppContext();
    const { pathname } = useLocation();
    const currentYear = new Date().getFullYear();

    if (!profileData || pathname === '/') {
        return null;
    }

    return (
        <footer className="border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                <p>&copy; {currentYear} {profileData?.name}. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;