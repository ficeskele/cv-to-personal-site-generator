import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Define the shape of the post metadata (frontmatter)
export interface PostMeta {
    slug: string;
    title: string;
    date: string;
    tags: string[];
    summary: string;
}

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

// Helper to generate a slug from a title
const generateSlug = (title: string): string => {
    return title
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
};

export async function getAllPosts(): Promise<PostMeta[]> {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
        .map((fileName) => {
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data } = matter(fileContents);

            if (!data.title || !data.date || !data.summary || !data.tags) {
                console.warn(`Post "${fileName}" is missing required frontmatter.`);
                return null;
            }

            return {
                slug: generateSlug(data.title),
                ...data,
            } as PostMeta;
        })
        .filter((post): post is PostMeta => post !== null);

    return allPostsData.sort((a, b) => {
        if (new Date(a.date) < new Date(b.date)) {
            return 1;
        } else {
            return -1;
        }
    });
}

export async function getPostBySlug(slug: string): Promise<{ meta: PostMeta, content: string }> {
    const fileNames = fs.readdirSync(postsDirectory);
    const fileName = fileNames.find(name => {
         const fullPath = path.join(postsDirectory, name);
         const fileContents = fs.readFileSync(fullPath, 'utf8');
         const { data } = matter(fileContents);
         return generateSlug(data.title) === slug;
    });

    if (!fileName) {
        throw new Error(`Post with slug "${slug}" not found.`);
    }

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const meta = {
        slug,
        ...data,
    } as PostMeta;

    return { meta, content };
}
