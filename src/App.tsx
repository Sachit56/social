import React from 'react';
import Auth from './components/Auth';
import ProjectDocumentation from './pages/DocsPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


const App: React.FC = () => {
  return (
    
    <Router>
      
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/docs" element={<ProjectDocumentation/>} />
      </Routes>
    </Router>
  );
};

export default App;



