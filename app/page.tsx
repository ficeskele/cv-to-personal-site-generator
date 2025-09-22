'use client';

import React from 'react';
import GeneratorPage from '../pages/GeneratorPage';

// The generator page is highly interactive, so we keep it in a client component.
// This root page just renders it.
export default function Page() {
    return <GeneratorPage />;
}
