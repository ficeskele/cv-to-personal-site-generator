import React from 'react';
import { useAppContext } from '../context/AppContext';
import Section from './Section';
import { formatUrl } from '../utils/url';

const ContactSection: React.FC = () => {
    const { profileData } = useAppContext();

    const linkedinLink = profileData?.links?.find(l => l.name === 'linkedin');
    const emailLink = profileData?.links?.find(l => l.name === 'email');

    let contactUrl: string | undefined;
    let contactText: string = 'Say Hello';

    if (linkedinLink) {
        contactUrl = linkedinLink.url;
        contactText = 'Connect on LinkedIn';
    } else if (emailLink) {
        contactUrl = `mailto:${emailLink.url}`;
    }

    if (!contactUrl) return null;

    return (
        <Section id="contact" title="Get In Touch">
            <div className="text-center max-w-2xl mx-auto">
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious vision. Feel free to reach out.
                </p>
                <a
                    href={formatUrl(contactUrl)}
                    target={contactUrl.startsWith('mailto:') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                >
                    {contactText}
                </a>
            </div>
        </Section>
    );
};

export default ContactSection;