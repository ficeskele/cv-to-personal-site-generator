import { load } from 'js-yaml';
import type { Post } from '../types';

const generateSlug = (title: string): string => {
    return title
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9\s-]/g, '') 
        .replace(/\s+/g, '-')          
        .replace(/-+/g, '-')           
        .trim();                       
};

interface Frontmatter {
    title: string;
    date: string;
    tags: string[];
    summary: string;
}

export const parseMarkdownFile = (fileContent: string, fileName: string): Post => {
    const frontmatterRegex = /^---\s*([\s\S]*?)\s*---/;
    const match = frontmatterRegex.exec(fileContent);

    if (!match) {
        throw new Error(`Frontmatter not found in ${fileName}. Make sure it is at the top of the file and enclosed in '---'.`);
    }

    const postBody = fileContent.substring(match[0].length).trim();
    const frontmatterBlock = match[1];
    
    let frontmatter: Partial<Frontmatter>;
    try {
        frontmatter = load(frontmatterBlock) as Partial<Frontmatter>;
    } catch (e) {
        throw new Error(`Error parsing YAML frontmatter in ${fileName}: ${(e as Error).message}`);
    }

    if (!frontmatter.title || typeof frontmatter.title !== 'string') {
        throw new Error(`'title' is missing or not a string in ${fileName} frontmatter.`);
    }
    if (!frontmatter.date || typeof frontmatter.date !== 'string') {
        throw new Error(`'date' is missing or not a string in ${fileName} frontmatter.`);
    }
     if (!frontmatter.summary || typeof frontmatter.summary !== 'string') {
        throw new Error(`'summary' is missing or not a string in ${fileName} frontmatter.`);
    }
    if (!frontmatter.tags || !Array.isArray(frontmatter.tags)) {
        frontmatter.tags = [];
    }

    return {
        slug: generateSlug(frontmatter.title),
        title: frontmatter.title,
        date: new Date(frontmatter.date).toISOString().split('T')[0],
        tags: frontmatter.tags as string[],
        summary: frontmatter.summary,
        content: postBody,
    };
};