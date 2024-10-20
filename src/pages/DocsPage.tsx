import React from 'react';

const ProjectDocumentation: React.FC = () => {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Project Documentation</h1>

      <h2 className="text-xl font-semibold mb-2">Libraries Used</h2>

      <h3 className="font-semibold">1. <span className="text-blue-600">Supabase</span>:</h3>
      <p>
        Supabase is a backend as a service (BaaS) that provides authentication, database storage, and more.
      </p>
      <p>
        - Documentation: <a href="https://supabase.com/docs" target="_blank" rel="noopener noreferrer" className="text-blue-500">Supabase Docs</a>
      </p>

      <h3 className="font-semibold">2. <span className="text-blue-600">React</span>:</h3>
      <p>
        React is a JavaScript library for building user interfaces, enabling the creation of reusable components.
      </p>
      <p>
        - Documentation: <a href="https://reactjs.org/docs/getting-started.html" target="_blank" rel="noopener noreferrer" className="text-blue-500">React Docs</a>
      </p>

      <h3 className="font-semibold">3. <span className="text-blue-600">Next.js</span>:</h3>
      <p>
        Next.js is a React framework for server-side rendering and static site generation.
      </p>
      <p>
        - Documentation: <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer" className="text-blue-500">Next.js Docs</a>
      </p>

      <h3 className="font-semibold">4. <span className="text-blue-600">ShadCN UI Components</span>:</h3>
      <p>
        This project utilizes ShadCN components like <strong>Button</strong>, <strong>Theme Toggle</strong>, and <strong>Toast Notifications</strong> to manage the user interface.
      </p>
      <ul>
        <li><strong>Button</strong>: Provides interactive clickable components.</li>
        <li><strong>Toast</strong>: For displaying temporary alert messages.</li>
        <li><strong>Theme Toggle</strong>: Allows switching between light and dark themes.</li>
      </ul>
      <p>
        - Documentation: <a href="https://shadcn.dev/docs/toast" target="_blank" rel="noopener noreferrer" className="text-blue-500">ShadCN Toast Docs</a>
      </p>

      <h3 className="font-semibold">5. <span className="text-blue-600">TypeScript</span>:</h3>
      <p>
        TypeScript is a superset of JavaScript with static types, enabling better development tooling.
      </p>
      <p>
        - Documentation: <a href="https://www.typescriptlang.org/docs/" target="_blank" rel="noopener noreferrer" className="text-blue-500">TypeScript Docs</a>
      </p>

      <h3 className="font-semibold">6. <span className="text-blue-600">Lucide Icons</span>:</h3>
      <p>
        Lucide provides icons like <code>ThumbsUp</code> and <code>Repeat</code> used for post interactions in the app.
      </p>
      <p>
        - Documentation: <a href="https://lucide.dev/" target="_blank" rel="noopener noreferrer" className="text-blue-500">Lucide Icons</a>
      </p>

      <h2 className="text-xl font-semibold mt-4">Features</h2>
      <ol className="list-decimal ml-5">
        <li><strong>Post Creation</strong>: Users can create new posts with titles, content, and optional images.</li>
        <li><strong>Like and Repost Functionality</strong>: Users can like or repost any posts. The like and repost counts are updated in real-time.</li>
        <li><strong>Toast Notifications</strong>: Toasts appear for actions like liking or reposting a post.</li>
        <li><strong>Dark Mode/Theme Toggle</strong>: Users can toggle between light and dark modes.</li>
      </ol>

      <h2 className="text-xl font-semibold mt-4">Code Reference</h2>

      <h3 className="font-semibold">Components Used:</h3>
      <ul className="list-disc ml-5">
        <li><strong>Button</strong>: From ShadCN, used for creating and interacting with posts.</li>
        <li><strong>Card</strong>: Displays each post with its content, image, likes, and reposts.</li>
        <li><strong>Toast</strong>: Displays notifications to the user on successful or failed actions.</li>
        <li><strong>ModeToggle</strong>: Provides dark/light mode switching.</li>
      </ul>

      <h3 className="font-semibold">Important Hooks:</h3>
      <ul className="list-disc ml-5">
        <li><strong>useToast</strong>: Custom hook to show toast notifications for interactions.</li>
        <li><strong>useState</strong>: For managing states like <code>likedPosts</code>, <code>repostedPosts</code>, and <code>items</code>.</li>
        <li><strong>useEffect</strong>: To fetch initial data from Supabase and manage local storage for likes and reposts.</li>
      </ul>

      <h3 className="font-semibold">Supabase Integration:</h3>
      <p>Supabase is used to fetch posts and handle like/repost updates in the database.</p>
    </div>
  );
};

export default ProjectDocumentation;

