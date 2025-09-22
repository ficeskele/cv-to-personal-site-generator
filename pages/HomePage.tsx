'use client';

import React from 'react';
import { useAppContext } from '../context/AppContext';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import ExperienceSection from '../components/ExperienceSection';
import ProjectsSection from '../components/ProjectsSection';
import BlogPreviewSection from '../components/BlogPreviewSection';
import ContactSection from '../components/ContactSection';
import type { Post } from '../types';

interface HomePageProps {
    latestPost: Post | null;
}

const HomePage: React.FC<HomePageProps> = ({ latestPost }) => {
    const { profileData } = useAppContext();

    if (!profileData) {
        // This can be improved with a redirect or a more specific message in a real app
        return (
            <div className="flex justify-center items-center h-screen">
                <p>No profile data available. Please generate the site first.</p>
            </div>
        );
    }
    
    return (
        <div className="space-y-16 md:space-y-24">
            <Hero />
            <AboutSection />
            <SkillsSection />
            <ExperienceSection />
            <ProjectsSection />
            <BlogPreviewSection latestPost={latestPost} />
            <ContactSection />
        </div>
    );
};

export default HomePage;