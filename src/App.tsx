
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { FirebaseProvider } from './contexts/FirebaseContext';
import LoginPage from './pages/auth/LoginPage';
import { SupremeAdminLogin } from './pages/auth/SupremeAdminLogin';
import HomePage from './pages/home/HomePage';
import ProfilePage from './pages/profile/ProfilePage';
import FriendsPage from './pages/social/FriendsPage';
import NotificationsPage from './pages/social/NotificationsPage';
import SettingsPage from './pages/settings/SettingsPage';
import AboutPage from './pages/about/AboutPage';

import { VersionManager } from './components/VersionManager';

import RecoveryPage from './pages/auth/RecoveryPage';

function App() {
  return (
    <ThemeProvider>
      <FirebaseProvider>
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
            <Route path="/about" element={<AboutPage />} />
            
            {/* Auth Pages */}
            <Route path="/supreme-admin" element={<SupremeAdminLogin onSupremeLogin={() => console.log('Supreme admin login attempted')} />} />
            <Route path="/recovery" element={<RecoveryPage />} />
            <Route path="/legal/*" element={<LoginPage />} />
            <Route path="/help/*" element={<LoginPage />} />
          </Routes>
        </Router>
      </FirebaseProvider>
    </ThemeProvider>
  );
}

export default App;
