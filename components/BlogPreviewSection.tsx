'use client';

import React from 'react';
import { Link } from 'react-router-dom';
import Section from './Section';
import { Card } from './Card';
import Badge from './Badge';
import type { Post } from '../types';

interface BlogPreviewProps {
    latestPost: Post | null;
}

const BlogPreviewSection: React.FC<BlogPreviewProps> = ({ latestPost }) => {
    if (!latestPost) {
        return (
            <Section id="blog" title="From The Blog">
                <div className="text-center max-w-2xl mx-auto">
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                        No blog posts have been added yet.
                    </p>
                </div>
            </Section>
        );
    }

    return (
        <Section id="blog" title="From The Blog">
            <div className="max-w-2xl mx-auto">
                <Link to={`/blog/${latestPost.slug}`} className="block group">
                     <Card className="group-hover:border-blue-500 transition-all duration-300">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{latestPost.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{new Date(latestPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">{latestPost.summary}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                             {latestPost.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
                        </div>
                        <p className="mt-6 font-semibold text-blue-600 dark:text-blue-400 group-hover:underline">Read more &rarr;</p>
                    </Card>
                </Link>
                <div className="text-center mt-8">
                     <Link to="/blog" className="font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        View all posts
                    </Link>
                </div>
            </div>
        </Section>
    );
};

export default BlogPreviewSection;