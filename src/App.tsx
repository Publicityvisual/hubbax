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
import { FanPageManager } from './pages/social/FanPageManager';

import { VersionManager } from './components/VersionManager';
import GlobalErrorBoundary from './components/common/GlobalErrorBoundary';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

import RecoveryPage from './pages/auth/RecoveryPage';

function App() {
  return (
    <GlobalErrorBoundary>
      <ThemeProvider>
        <FirebaseProvider>
          <Router>
            <VersionManager />
            <Routes>
              <Route path="/" element={<LoginPage />} />
              
              {/* Rutas Protegidas - Nadie entra sin login */}
              <Route path="/feed" element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              } />
              <Route path="/profile/:username" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              <Route path="/me" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              
              <Route path="/friends" element={
                <ProtectedRoute>
                  <FriendsPage />
                </ProtectedRoute>
              } />
              <Route path="/notifications" element={
                <ProtectedRoute>
                  <NotificationsPage />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              } />
              <Route path="/about" element={
                <ProtectedRoute>
                  <AboutPage />
                </ProtectedRoute>
              } />
              <Route path="/fanpages" element={
                <ProtectedRoute>
                  <FanPageManager />
                </ProtectedRoute>
              } />
              
              {/* Auth Pages */}
              <Route path="/supreme-admin" element={<SupremeAdminLogin onSupremeLogin={() => console.log('Supreme admin login attempted')} />} />
              <Route path="/recovery" element={<RecoveryPage />} />
              <Route path="/legal/*" element={<LoginPage />} />
              <Route path="/help/*" element={<LoginPage />} />
            </Routes>
          </Router>
        </FirebaseProvider>
      </ThemeProvider>
    </GlobalErrorBoundary>
  );
}

export default App;