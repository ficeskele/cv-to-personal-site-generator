export const content = `---
title: "Deep Dive into CSS Grid Layout"
date: "2024-05-20"
summary: "Unlocking complex and responsive layouts with the power of CSS Grid. A practical overview of its core concepts."
tags: ["CSS", "Web Design", "Frontend", "Layout"]
---

## Mastering Layouts with Grid

CSS Grid Layout is a two-dimensional layout system for the web. It lets you lay content out in rows and columns, and has many features that make building complex layouts straightforward.

### Basic Grid

To get started, you create a grid container:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* Three equal columns */
  gap: 10px;
}
\`\`\`

Any direct child of \`.container\` will become a grid item.

### Key Properties

- \`grid-template-columns\` / \`grid-template-rows\`: Defines the columns and rows of the grid.
- \`gap\`: The space between grid items.
- \`grid-column\` / \`grid-row\`: Used on grid items to specify their size and location within the grid.

With Grid, layouts that were once complex to achieve with floats or flexbox become simple and maintainable.`;
