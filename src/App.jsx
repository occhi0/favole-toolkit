import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/shared/Navigation';
import Home from './pages/Home';
import StoryGenerator from './pages/StoryGenerator';
import CharacterSheet from './pages/CharacterSheet';
import Illustrations from './pages/Illustrations';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/story-generator" element={<StoryGenerator />} />
          <Route path="/character-sheet" element={<CharacterSheet />} />
          <Route path="/illustrations" element={<Illustrations />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;