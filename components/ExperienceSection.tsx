
import React from 'react';
import { useAppContext } from '../context/AppContext';
import Section from './Section';
import { Card } from './Card';

const ExperienceSection: React.FC = () => {
    const { profileData } = useAppContext();

    if (!profileData || !profileData.experience) return null;

    return (
        <Section id="experience" title="Work Experience">
            <div className="relative max-w-3xl mx-auto">
                 <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700 hidden md:block" aria-hidden="true"></div>
                
                <div className="space-y-12">
                    {profileData.experience.map((job, index) => (
                        <div key={index} className="md:grid md:grid-cols-2 md:gap-8 relative">
                            <div className={`md:text-right ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                                <p className="font-semibold text-gray-500 dark:text-gray-400">{job.period}</p>
                            </div>
                            <div className={`${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                                <Card className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{job.role}</h3>
                                    <p className="font-semibold text-blue-600 dark:text-blue-400 mt-1">{job.company}</p>
                                    <ul className="mt-4 space-y-2 list-disc list-inside text-gray-600 dark:text-gray-300">
                                        {job.description.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </Card>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default ExperienceSection;
