import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Zap } from 'lucide-react';

interface SupremeAdminLoginProps {
  onSupremeLogin: () => void;
}

export function SupremeAdminLogin({ onSupremeLogin }: SupremeAdminLoginProps) {
  const [isVerifyMode, setIsVerifyMode] = useState(false);
  const [password, setPassword] = useState('');

  const handleSupremeChallenge = () => {
    // Supreme challenge - this would verify against Firebase Auth
    if (password === 'LIBERTAD1') {
      console.log('🔱 SUPREME ADMIN VERIFIED');
      onSupremeLogin();
    } else {
      alert('❌ Invalid supreme credentials. For demo: use "LIBERTAD1"');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen bg-gradient-to-br from-purple-900/20 via-black to-red-900/20 flex items-center justify-center p-4"
    >
      <div className="w-full max-w-md">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="bg-gradient-to-br from-purple-900/30 to-red-900/30 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
              className="w-20 h-20 bg-gradient-to-br from-purple-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Shield className="w-10 h-10 text-white" />
            </motion.div>
            
            <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-red-400 bg-clip-text mb-2">
              SUPREME ADMIN
            </h1>
            <p className="text-gray-400">
              The highest authority in the digital realm
            </p>
          </div>

          {/* Warning */}
          <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-500/30 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h3 className="text-red-400 font-bold">SECURITY BREACH DETECTED</h3>
            </div>
            <p className="text-red-300 text-sm">
              Unauthorized access to supreme admin panel will be logged and publicly visible.
              This is a transparent system - all actions are recorded.
            </p>
          </div>

          {!isVerifyMode ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-200 mb-4">
                  Supreme Verification Challenge
                </h2>
                <p className="text-gray-400 text-sm mb-6">
                  Only the Supreme Administrator may proceed. 
                  This is the highest level of authorization.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsVerifyMode(true)}
                className="w-full bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3"
              >
                <Zap className="w-6 h-6" />
                PROCEED TO SUPREME verification
                <Shield className="w-6 h-6" />
              </motion.button>

              <button
                onClick={() => window.history.back()}
                className="w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors"
              >
                Return to Normal Login
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-200 mb-2">
                  Supreme Challenge
                </h2>
                <p className="text-gray-400 text-sm mb-4">
                  Enter the supreme authorization key.
                </p>
                <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-3">
                  <p className="text-purple-300 text-xs">
                    💡 Demo: Use password "LIBERTAD1"
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Supreme Authorization Key:
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter supreme key..."
                  className="w-full bg-black/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  autoFocus
                />
              </div>

              <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  <span className="font-bold text-yellow-400 text-sm">FINAL WARNING</span>
                </div>
                <p className="text-yellow-300 text-xs">
                  This will grant unrestricted access to Hubbax systems. 
                  All actions will be logged and made public.
                </p>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSupremeChallenge}
                  className="flex-1 bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <Shield className="w-5 h-5" />
                  ACTIVATE SUPREME MODE
                </motion.button>
                
                <button
                  onClick={() => { setIsVerifyMode(false); setPassword(''); }}
                  className="px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
                >
                  Back
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-6 text-gray-500 text-sm">
          <p>Hubbax Supreme Administration • Transparency Above All</p>
          <p className="text-xs mt-1">All access attempts are logged and publicly visible</p>
        </div>
      </div>
    </motion.div>
  );
}