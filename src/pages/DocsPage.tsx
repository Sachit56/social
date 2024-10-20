import { useEffect, useState } from "react";

const Docs = () => {
  const [readmeContent, setReadmeContent] = useState("");

  useEffect(() => {
    fetch('/README.md')
      .then((response) => response.text())
      .then((data) => setReadmeContent(data))
      .catch((error) => console.error('Error fetching README.md:', error));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Project Documentation</h1>
      <pre className="whitespace-pre-wrap">{readmeContent}</pre>
    </div>
  );
};

export default Docs;
