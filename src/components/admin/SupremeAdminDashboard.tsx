import { useState } from 'react';
import { Shield, AlertTriangle, Users, Trash2, Ban, HardDrive, Settings, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface SupremeAdminDashboardProps {
  currentUser: any;
  onClose: () => void;
}

export function SupremeAdminDashboard({ currentUser, onClose }: SupremeAdminDashboardProps) {
  const [activeAction, setActiveAction] = useState<string>('');
  const [target, setTarget] = useState('');
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastOverride, setLastOverride] = useState<any>(null);

  const isSupremeAdmin = currentUser?.username === 'supreme';

  const supremeActions = [
    {
      id: 'delete-user',
      title: 'Delete User',
      icon: <Trash2 className="w-5 h-5" />,
      description: 'Permanently delete a user account',
      danger: 'extreme',
      color: 'red'
    },
    {
      id: 'ban-user',
      title: 'Supreme Ban',
      icon: <Ban className="w-5 h-5" />,
      description: 'Ban user with supreme authority',
      danger: 'high',
      color: 'orange'
    },
    {
      id: 'delete-content',
      title: 'Delete Content',
      icon: <HardDrive className="w-5 h-5" />,
      description: 'Remove any content permanently',
      danger: 'high',
      color: 'yellow'
    },
    {
      id: 'emergency-mode',
      title: 'Emergency Mode',
      icon: <AlertTriangle className="w-5 h-5" />,
      description: 'Activate emergency takeover',
      danger: 'extreme',
      color: 'red'
    }
  ];

  const handleSupremeAction = async () => {
    if (!target || !reason) {
      alert('Both target and reason are required for supreme actions');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate supreme override
      const result = {
        success: true,
        action: activeAction,
        target,
        reason,
        timestamp: new Date().toISOString(),
        supreme: true,
        by: currentUser.username
      };

      console.log('🔱 SUPREME ACTION EXECUTED:', result);
      setLastOverride(result);
      
      alert(`✅ Supreme action completed: ${activeAction} on ${target}\nReason: ${reason}\nAll actions are logged for transparency.`);
      
      // Reset form
      setTarget('');
      setReason('');
      setActiveAction('');
      
    } catch (error) {
      console.error('❌ Supreme action failed:', error);
      alert('❌ Supreme action failed. Check console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isSupremeAdmin) {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-red-900/80 to-black/80 backdrop-blur-xl border border-red-500/30 rounded-2xl p-8 max-w-md text-center"
        >
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-400 mb-2">ACCESS DENIED</h2>
          <p className="text-gray-300 mb-4">
            Supreme Admin access requires the highest authority level.
          </p>
          <div className="bg-red-900/30 border border-red-500/20 rounded-lg p-3 mb-4">
            <p className="text-red-300 text-sm">
              🔐 This area is only accessible to the Supreme Administrator
            </p>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Return
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen p-4"
      >
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-900/20 via-black/80 to-red-900/20 backdrop-blur-xl border border-purple-500/30 rounded-3xl mt-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600/20 to-red-600/20 rounded-t-3xl p-6 border-b border-purple-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Shield className="w-10 h-10 text-purple-400" />
                <div>
                  <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-red-400 bg-clip-text">
                    SUPREME ADMIN DASHBOARD
                  </h1>
                  <p className="text-gray-400 text-sm mt-1">
                    Unlimited Power. Absolute Transparency.
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-purple-400 font-mono text-sm">
                  USER: {currentUser.username}
                </div>
                <div className="text-red-400 text-xs">
                  LEVEL: SUPREME (99)
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Warning Notice */}
            <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-500/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-400 mt-0.5" />
                <div>
                  <h3 className="text-red-400 font-bold mb-2">⚠️ SUPREME AUTHORITY ACTIVE</h3>
                  <p className="text-red-300 text-sm">
                    All actions taken here are logged and visible to the entire community. 
                    Abuse of power will result in immediate transparency alerts.
                  </p>
                </div>
              </div>
            </div>

            {/* Status Panel */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 border border-green-500/30 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-green-400" />
                  <div>
                    <div className="text-green-400 font-bold">SYSTEM STATUS</div>
                    <div className="text-green-300 text-sm">Online & Monitorizado</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <Settings className="w-6 h-6 text-blue-400" />
                  <div>
                    <div className="text-blue-400 font-bold">ÚLTIMA ACCIÓN</div>
                    <div className="text-blue-300 text-sm">
                      {lastOverride ? `${lastOverride.action} (${lastOverride.target})` : 'Ninguna registrada'}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-500/30 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <Zap className="w-6 h-6 text-purple-400" />
                  <div>
                    <div className="text-purple-400 font-bold">PODER ACTIVO</div>
                    <div className="text-purple-300 text-sm">Supremo Ilimitado</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Panel */}
            <div>
              <h3 className="text-xl font-bold text-gray-200 mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-purple-400" />
                Supreme Actions
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {supremeActions.map((action) => (
                  <motion.div
                    key={action.id}
                    whileHover={{ scale: 1.02 }}
                    className={`bg-gradient-to-br from-gray-900/50 to-gray-800/40 border border-gray-600/30 rounded-xl p-4 cursor-pointer transition-all hover:border-${action.color}-500/50 ${
                      activeAction === action.id ? `border-${action.color}-500 ring-2 ring-${action.color}-500/50` : ''
                    }`}
                    onClick={() => setActiveAction(activeAction === action.id ? '' : action.id)}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`text-${action.color}-400`}>{action.icon}</div>
                      <h4 className="text-lg font-bold text-gray-200">{action.title}</h4>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{action.description}</p>
                    <div className={`text-xs text-${action.color}-400 capitalize`}>
                      Danger: {action.danger}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Action Form */}
            {activeAction && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-xl p-6"
              >
                <h4 className="text-xl font-bold text-red-400 mb-4">
                  Ejecutar: {supremeActions.find(a => a.id === activeAction)?.title}
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      ID del Objetivo:
                    </label>
                    <input
                      type="text"
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      placeholder="Ej: user123, post456, etc."
                      className="w-full bg-black/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Razón Detallada (públicamente visible):
                    </label>
                    <textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Explica completamente por qué se toma esta acción suprema..."
                      rows={3}
                      className="w-full bg-black/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none resize-none"
                    />
                  </div>
                  
                  <div className="bg-red-900/30 border border-red-500/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-red-400 mb-1">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="font-bold text-sm">ACCIÓN IRREVERSIBLE</span>
                    </div>
                    <p className="text-red-300 text-xs">
                      Esta acción será registrada públicamente y no podrá deshacerse. 
                      Se notificará a toda la comunidad.
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={handleSupremeAction}
                      disabled={isLoading || !target || !reason}
                      className="flex-1 bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                      {isLoading ? 'EJECUTANDO...' : 'EJECUTAR ACCIÓN SUPREMA'}
                      <Shield className="w-5 h-5" />
                    </button>
                    
                    <button
                      onClick={() => {setActiveAction(''); setTarget(''); setReason('');}}
                      className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Control Panel */}
            <div className="flex justify-between items-center pt-4">
              <div className="text-green-400 text-sm">
                ✨ Supreme Admin Online
              </div>
              
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Cerrar Panel
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}