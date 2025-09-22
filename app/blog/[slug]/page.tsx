import React from 'react';
import { getPostBySlug, getAllPosts } from '../../../lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import Badge from '../../../components/Badge';

// This function generates the static paths for all blog posts at build time.
export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map(post => ({
        slug: post.slug,
    }));
}

// This is the page component for a single blog post.
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    
    let post;
    try {
        post = await getPostBySlug(slug);
    } catch (error) {
        notFound();
    }

    return (
        <article className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
            <header className="mb-8 md:mb-12 text-center">
                <Link href="/blog" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to blog</Link>
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">{post.meta.title}</h1>
                <p className="mt-4 text-md text-gray-500 dark:text-gray-400">
                    Published on {new Date(post.meta.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    {post.meta.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
                </div>
            </header>

            <div className="prose prose-lg dark:prose-invert max-w-none prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-blue-600 hover:prose-a:text-blue-800 dark:prose-a:text-blue-400 dark:hover:prose-a:text-blue-300 prose-strong:text-gray-800 dark:prose-strong:text-gray-100 prose-code:before:content-none prose-code:after:content-none">
                <ReactMarkdown
                    components={{
                        h1: ({node, ...props}) => <h2 className="text-3xl font-bold mt-12 mb-4" {...props} />,
                        h2: ({node, ...props}) => <h3 className="text-2xl font-bold mt-10 mb-4" {...props} />,
                        h3: ({node, ...props}) => <h4 className="text-xl font-bold mt-8 mb-4" {...props} />,
                        p: ({node, ...props}) => <p className="mb-6 leading-relaxed" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-8 mb-6 space-y-2" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal pl-8 mb-6 space-y-2" {...props} />,
                        blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400 my-6" {...props} />,
                        code: ({node, inline, className, children, ...props}: React.HTMLAttributes<HTMLElement> & {inline?: boolean, node?: any}) => {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline ? (
                                <div className="bg-gray-800 text-white rounded-md my-6">
                                    <div className="flex justify-between items-center px-4 py-2 bg-gray-700 rounded-t-md">
                                        <span className="text-xs font-sans text-gray-300">{match ? match[1] : ''}</span>
                                    </div>
                                    <pre className="p-4 overflow-x-auto"><code className="font-mono text-sm" {...props}>{children}</code></pre>
                                </div>
                            ) : (
                                <code className="bg-gray-200 dark:bg-gray-700 rounded-sm px-1.5 py-0.5 font-mono text-sm text-pink-600 dark:text-pink-400" {...props}>
                                    {children}
                                </code>
                            );
                        }
                    }}
                >
                    {post.content}
                </ReactMarkdown>
            </div>
        </article>
    );
}
