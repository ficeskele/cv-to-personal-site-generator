
export interface Link {
    name: 'linkedin' | 'github' | 'twitter' | 'website' | 'email';
    url: string;
}

export interface Skill {
    category: string;
    technologies: string[];
}

export interface Experience {
    role: string;
    company: string;
    period: string;
    description: string[];
}

export interface Project {
    name: string;
    description: string;
    stack: string[];
    url?: string;
}

export interface Profile {
    name: string;
    role: string;
    summary: string;
    links: Link[];
    skills: Skill[];
    experience: Experience[];
    projects: Project[];
}

// FIX: Define the Post interface to be used for blog posts throughout the application.
export interface Post {
    slug: string;
    title: string;
    date: string;
    tags: string[];
    summary: string;
    content: string;
}

export interface Theme {
    primary: string;
    secondary: string;
    accent: string;
    neutral: string;
    background: string;
    foreground: string;
    font: string;
    radius: number;
    darkMode: boolean;
}

export enum AppStatus {
    IDLE = 'IDLE',
    GENERATING = 'GENERATING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}