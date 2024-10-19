// src/pages/Docs.tsx

const Docs = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Project Documentation</h1>

      <h2 className="text-xl font-semibold">Libraries Used</h2>

      <ul className="list-disc ml-6">
        <li>
          <strong>Supabase:</strong> A backend as a service (BaaS) that provides an easy way to handle authentication, database storage, and more. Documentation: <a href="https://supabase.com/docs" target="_blank" rel="noopener noreferrer" className="text-blue-500">Supabase Docs</a>
        </li>
        <li>
          <strong>React:</strong> A JavaScript library for building user interfaces, allowing for the creation of reusable UI components. Documentation: <a href="https://reactjs.org/docs/getting-started.html" target="_blank" rel="noopener noreferrer" className="text-blue-500">React Docs</a>
        </li>
        <li>
          <strong>Next.js:</strong> A React framework that enables server-side rendering and static site generation for React applications. Documentation: <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer" className="text-blue-500">Next.js Docs</a>
        </li>
        <li>
          <strong>Radix UI:</strong> A set of low-level, accessible UI components for building React applications. Documentation: <a href="https://www.radix-ui.com/docs" target="_blank" rel="noopener noreferrer" className="text-blue-500">Radix UI Docs</a>
        </li>
        <li>
          <strong>ShadCN Toast:</strong> A simple toast notification component for React applications, providing a clean way to display temporary messages. Documentation: <a href="https://shadcn.dev/docs/toast" target="_blank" rel="noopener noreferrer" className="text-blue-500">ShadCN Toast Docs</a>
        </li>
        <li>
          <strong>TypeScript:</strong> A superset of JavaScript that adds static types, enabling better tooling and error checking during development. Documentation: <a href="https://www.typescriptlang.org/docs/" target="_blank" rel="noopener noreferrer" className="text-blue-500">TypeScript Docs</a>
        </li>
      </ul>

    </div>
  );
};

export default Docs;
