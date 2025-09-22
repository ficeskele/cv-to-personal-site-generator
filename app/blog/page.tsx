import React from 'react';
import { getAllPosts } from '../../lib/posts';
import BlogClientPage from '../../components/BlogClientPage';

// This is a Server Component, it runs on the server at build time.
export default async function BlogPage() {
    const posts = await getAllPosts();

    return <BlogClientPage posts={posts} />;
};
