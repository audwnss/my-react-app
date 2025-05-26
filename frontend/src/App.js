import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MyPage from './pages/MyPage';
import TeamMatching1 from './pages/TeamMatching1';
import TeamMatching2 from './pages/TeamMatching2';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/TeamMatching1" element={<TeamMatching1 />} />
        <Route path="/TeamMatching2" element={<TeamMatching2 />} />
      </Routes>
    </Router>
  );
}

export default App;
