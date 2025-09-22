export const content = `---
title: "A Quick Look at React Hooks"
date: "2024-06-15"
summary: "A brief introduction to the power and simplicity of React Hooks, focusing on useState and useEffect."
tags: ["React", "JavaScript", "Frontend", "Web Development"]
---

## The Power of Hooks

React Hooks, introduced in React 16.8, revolutionized how we write components. They let you use state and other React features without writing a class.

### \`useState\`

The \`useState\` hook is the most fundamental. It allows you to add state to your functional components.

\`\`\`javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

### \`useEffect\`

The \`useEffect\` hook lets you perform side effects in function components. It's a close replacement for \`componentDidMount\`, \`componentDidUpdate\`, and \`componentWillUnmount\`.

\`\`\`javascript
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = \`You clicked \${count} times\`;
  });
  // ...
}
\`\`\`
Hooks make component logic more reusable and easier to follow.`;
