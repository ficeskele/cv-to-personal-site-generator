
import React, { ReactNode } from 'react';

interface BadgeProps {
    children: ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ children }) => {
    return (
        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">
            {children}
        </span>
    );
};

export default Badge;
