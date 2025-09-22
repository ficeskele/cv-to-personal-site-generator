import React from 'react';
import HomePage from '../../pages/HomePage';
import { getAllPosts, getPostBySlug } from '../../lib/posts';
import type { Post } from '../../types';


export default async function Page() {
    const posts = await getAllPosts();
    // Fix: Fetch the full post content for the latest post to match the 'Post' type required by HomePage.
    let latestPost: Post | null = null;

    if (posts.length > 0) {
        const postData = await getPostBySlug(posts[0].slug);
        latestPost = {
            ...postData.meta,
            content: postData.content,
        };
    }

    return <HomePage latestPost={latestPost} />;
}