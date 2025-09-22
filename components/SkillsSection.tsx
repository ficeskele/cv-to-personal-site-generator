
import React from 'react';
import { useAppContext } from '../context/AppContext';
import Section from './Section';
import { Card } from './Card';

const SkillsSection: React.FC = () => {
    const { profileData } = useAppContext();

    if (!profileData || !profileData.skills) return null;

    return (
        <Section id="skills" title="Skills & Expertise">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {profileData.skills.map((skillGroup) => (
                    <Card key={skillGroup.category}>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{skillGroup.category}</h3>
                        <ul className="space-y-2">
                            {skillGroup.technologies.map((tech) => (
                                <li key={tech} className="text-gray-600 dark:text-gray-300">
                                    {tech}
                                </li>
                            ))}
                        </ul>
                    </Card>
                ))}
            </div>
        </Section>
    );
};

export default SkillsSection;
