
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import GeneratorPage from './pages/GeneratorPage';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const AppRoutes: React.FC = () => {
    const { profileData, theme, posts } = useAppContext();

    React.useEffect(() => {
        const root = window.document.documentElement;
        if (theme.darkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme.darkMode]);

    const latestPost = posts.length > 0 ? posts[0] : null;

    return (
        <div className="min-h-screen flex flex-col font-sans bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
            <Navbar />
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<GeneratorPage />} />
                    {profileData && (
                        <>
                            <Route path="/home" element={<HomePage latestPost={latestPost} />} />
                            <Route path="/blog" element={<BlogPage />} />
                            <Route path="/blog/:slug" element={<BlogPostPage />} />
                        </>
                    )}
                     <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
            {profileData && <Footer />}
        </div>
    );
};

const App: React.FC = () => {
    return (
        <AppProvider>
            <HashRouter>
                <AppRoutes />
            </HashRouter>
        </AppProvider>
    );
};

export default App;
