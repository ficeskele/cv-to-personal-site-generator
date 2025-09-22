
import React from 'react';
import { useAppContext } from '../context/AppContext';
import Section from './Section';

const AboutSection: React.FC = () => {
    const { profileData } = useAppContext();

    if (!profileData) return null;

    return (
        <Section id="about" title="About Me">
            <div className="max-w-3xl mx-auto">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-center">
                    {profileData.summary}
                </p>
            </div>
        </Section>
    );
};

export default AboutSection;
