
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import HomePage from './pages/home/HomePage';
import ProfilePage from './pages/profile/ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        
        <Route path="/feed" element={<HomePage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/me" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
