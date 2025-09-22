import React from 'react';
import { useAppContext } from '../context/AppContext';
import Section from './Section';
import { Card } from './Card';
import Badge from './Badge';
import { formatUrl } from '../utils/url';

const ProjectsSection: React.FC = () => {
    const { profileData } = useAppContext();

    if (!profileData || !profileData.projects) return null;

    return (
        <Section id="projects" title="Projects">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {profileData.projects.map((project) => (
                    <Card key={project.name} className="flex flex-col">
                        <div className="flex-grow">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.name}</h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">{project.description}</p>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {project.stack.map((tech) => (
                                <Badge key={tech}>{tech}</Badge>
                            ))}
                        </div>
                         {project.url && (
                            <a 
                                href={formatUrl(project.url)} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                View Project &rarr;
                            </a>
                        )}
                    </Card>
                ))}
            </div>
        </Section>
    );
};

export default ProjectsSection;