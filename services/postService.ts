import { parseMarkdownFile } from './markdownParser';
import type { Post } from '../types';

// Import the raw content from the new TS modules
import { content as welcomePostContent } from '../posts/welcome-to-your-new-blog';
import { content as exploringHooksContent } from '../posts/exploring-react-hooks';
import { content as cssGridContent } from '../posts/deep-dive-into-css-grid';

// An array representing the "manifest" of posts
const postModules = [
    { content: welcomePostContent, fileName: 'welcome-to-your-new-blog.md' },
    { content: exploringHooksContent, fileName: 'exploring-react-hooks.md' },
    { content: cssGridContent, fileName: 'deep-dive-into-css-grid.md' },
];

/**
 * Parses all statically imported markdown posts.
 * This function is synchronous and executed once at application startup.
 * @returns An array of Post objects.
 */
export const loadPosts = (): Post[] => {
    try {
        const posts = postModules.map(({ content, fileName }) => {
            return parseMarkdownFile(content, fileName);
        });

        // Sort by date descending
        return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    } catch (error) {
        console.error('Failed to load posts:', error);
        return [];
    }
};
