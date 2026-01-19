
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import HomePage from './pages/home/HomePage';
import ProfilePage from './pages/profile/ProfilePage';
import FriendsPage from './pages/social/FriendsPage';
import NotificationsPage from './pages/social/NotificationsPage';
import SettingsPage from './pages/settings/SettingsPage';

import { VersionManager } from './components/VersionManager';

function App() {
  return (
    <Router>
      <VersionManager />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        
        <Route path="/feed" element={<HomePage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/me" element={<ProfilePage />} />
        
        {/* New Pages */}
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
