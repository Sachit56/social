import React from 'react';
import Auth from './components/Auth';
import Docs from './pages/DocsPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


const App: React.FC = () => {
  return (
    
    <Router>
      <Auth/>
      <Routes>
        <Route path="/docs" element={<Docs/>} />
      </Routes>
    </Router>
  );
};

export default App;



