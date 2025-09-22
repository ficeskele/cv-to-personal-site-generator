import React from 'react';
import { useAppContext } from '../context/AppContext';
import { formatUrl } from '../utils/url';

const Hero: React.FC = () => {
    const { profileData } = useAppContext();

    if (!profileData) return null;

    const linkedinLink = profileData.links.find(l => l.name === 'linkedin');
    const emailLink = profileData.links.find(l => l.name === 'email');

    let contactUrl: string | undefined;
    let contactText: string = 'Get In Touch';

    if (linkedinLink) {
        contactUrl = linkedinLink.url;
        contactText = 'Connect on LinkedIn';
    } else if (emailLink) {
        contactUrl = `mailto:${emailLink.url}`;
    }

    return (
        <section className="container mx-auto px-4 py-20 md:py-32 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-gray-900 dark:text-white">
                {profileData.name}
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-medium">
                {profileData.role}
            </p>
            {contactUrl && (
                <div className="mt-8">
                     <a 
                        href={formatUrl(contactUrl)}
                        target={contactUrl.startsWith('mailto:') ? '_self' : '_blank'}
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                    >
                        {contactText}
                    </a>
                </div>
            )}
        </section>
    );
};

export default Hero;