'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card } from './Card';
import Badge from './Badge';
import type { PostMeta } from '../lib/posts';


const BlogClientPage: React.FC<{posts: PostMeta[]}> = ({ posts }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const allTags = useMemo(() => {
        const tags = new Set<string>();
        posts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
        return Array.from(tags).sort();
    }, [posts]);
    
    const filteredPosts = useMemo(() => {
        return posts
            .filter(post => {
                if (selectedTag && !post.tags.includes(selectedTag)) {
                    return false;
                }
                if (!searchTerm) {
                    return true;
                }
                const lowerSearch = searchTerm.toLowerCase();
                return (
                    post.title.toLowerCase().includes(lowerSearch) ||
                    post.summary.toLowerCase().includes(lowerSearch) ||
                    post.tags.some(tag => tag.toLowerCase().includes(lowerSearch))
                );
            });
    }, [posts, searchTerm, selectedTag]);

    return (
        <div className="container mx-auto px-4 py-12 md:py-16">
            <header className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">Blog</h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Thoughts, stories, and ideas on technology and career.</p>
            </header>

            <div className="mb-8 flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
                    aria-label="Search blog posts"
                />
            </div>
            
            <div className="mb-10 flex flex-wrap gap-2 justify-center">
                 <button
                    onClick={() => setSelectedTag(null)}
                    className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${!selectedTag ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                >
                    All
                </button>
                {allTags.map(tag => (
                    <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${selectedTag === tag ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map(post => (
                        <Link href={`/blog/${post.slug}`} key={post.slug} className="block group">
                            <Card className="h-full flex flex-col group-hover:border-blue-500 transition-all duration-300">
                                <div className="flex-grow">
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{post.title}</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    <p className="mt-3 text-gray-600 dark:text-gray-300">{post.summary}</p>
                                </div>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {post.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
                                </div>
                            </Card>
                        </Link>
                    ))
                ) : (
                    <div className="md:col-span-2 lg:col-span-3 text-center py-16">
                        <p className="text-gray-500 dark:text-gray-400">No posts found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default BlogClientPage;
