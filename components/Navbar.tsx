'use client';

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './icons/SocialIcons';
import { formatUrl } from '../utils/url';

const NavLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    return (
        <Link 
            to={to} 
            className={`text-sm font-medium transition-colors ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}
        >
            {children}
        </Link>
    );
};

const Navbar: React.FC = () => {
    const { profileData } = useAppContext();
    const { pathname } = useLocation();

    if (!profileData || pathname === '/') {
        return null;
    }

    const githubLink = profileData.links.find(l => l.name === 'github');
    const linkedinLink = profileData.links.find(l => l.name === 'linkedin');
    const twitterLink = profileData.links.find(l => l.name === 'twitter');

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/home" className="flex items-center gap-2">
                    <span className="font-bold text-lg text-gray-900 dark:text-white">{profileData.name}</span>
                </Link>
                <nav className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-6">
                       <NavLink to="/home">Home</NavLink>
                       <NavLink to="/blog">Blog</NavLink>
                    </div>
                    <div className="flex items-center gap-4">
                        {githubLink && (
                            <a href={formatUrl(githubLink.url)} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">
                                <GithubIcon className="w-5 h-5" />
                            </a>
                        )}
                        {linkedinLink && (
                            <a href={formatUrl(linkedinLink.url)} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">
                                <LinkedinIcon className="w-5 h-5" />
                            </a>
                        )}
                        {twitterLink && (
                            <a href={formatUrl(twitterLink.url)} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">
                                <TwitterIcon className="w-5 h-5" />
                            </a>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;