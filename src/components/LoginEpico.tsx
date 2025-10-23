import { useState, useEffect } from 'react'

interface AuthState {
  success?: boolean
  error?: string
  message?: string
  user?: {
    firstName: string
    lastName: string
    email: string
  }
}

export function LoginEpico() {
  // Estados principales
  const [currentView, setCurrentView] = useState<'login' | 'register' | 'forgot-password'>('login')
  const [loginState, setLoginState] = useState<AuthState | null>(null)
  const [registerState, setRegisterState] = useState<AuthState | null>(null)
  const [forgotPasswordState, setForgotPasswordState] = useState<AuthState | null>(null)
  
  // Estados de carga
  const [isLoginPending, setIsLoginPending] = useState(false)
  const [isRegisterPending, setIsRegisterPending] = useState(false)
  const [isForgotPasswordPending, setIsForgotPasswordPending] = useState(false)
  
  // Estados para login
  const [showPassword, setShowPassword] = useState(false)
  const [passwordValue, setPasswordValue] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  
  // Estados para registro
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  // Modal y recovery
  const [showForgotModal, setShowForgotModal] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  
  // Estados avanzados para experiencia Facebook-level
  const [emailOrPhone, setEmailOrPhone] = useState('')
  const [isValidInput, setIsValidInput] = useState(true)
  const [inputType, setInputType] = useState<'email' | 'phone' | 'unknown'>('unknown')
  const [showLoginHelp, setShowLoginHelp] = useState(false)
  const [attemptCount, setAttemptCount] = useState(0)
  const [showCaptcha, setShowCaptcha] = useState(false)
  const [isBlocked, setIsBlocked] = useState(false)
  
  // Validación inteligente de entrada flexible (email o teléfono)
  useEffect(() => {
    if (!emailOrPhone) {
      setInputType('unknown')
      setIsValidInput(true)
      return
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^(\+52|52)?[\s-]?[0-9]{10}$/
    
    if (emailRegex.test(emailOrPhone)) {
      setInputType('email')
      setIsValidInput(true)
    } else if (phoneRegex.test(emailOrPhone)) {
      setInputType('phone')
      setIsValidInput(true)
    } else if (emailOrPhone.length > 3) {
      setIsValidInput(false)
    } else {
      setInputType('unknown')
      setIsValidInput(true)
    }
  }, [emailOrPhone])
  
  // Función de login épica con validación inteligente
  const handleEpicLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoginPending(true)
    setLoginState(null)
    
    // Validaciones previas
    if (!emailOrPhone || !passwordValue) {
      setLoginState({ error: '¡Compa! Necesitas llenar todos los campos 📝' })
      setIsLoginPending(false)
      return
    }
    
    if (!isValidInput) {
      setLoginState({ error: '🤔 Ese email o número no se ve bien. ¿Puedes revisarlo?' })
      setIsLoginPending(false)
      return
    }
    
    // Simulación de protección anti-brute force
    if (attemptCount >= 3 && !showCaptcha) {
      setShowCaptcha(true)
      setLoginState({ error: '🛡️ Por seguridad, verifica que eres humano' })
      setIsLoginPending(false)
      return
    }
    
    if (attemptCount >= 5) {
      setIsBlocked(true)
      setLoginState({ error: '🚫 Demasiados intentos. Intenta en 15 minutos o recupera tu contraseña.' })
      setIsLoginPending(false)
      return
    }
    
    try {
      // Simulación realista de API
      await new Promise(resolve => setTimeout(resolve, 1200))
      
      // Credenciales de prueba expandidas
      const validCredentials = [
        { email: 'test@hubbax.com', phone: '5551234567', password: 'demo' },
        { email: 'demo@mexico.com', phone: '5559876543', password: 'mexico123' },
        { email: 'admin@hubbax.mx', phone: '5555555555', password: 'admin' }
      ]
      
      const isValid = validCredentials.some(cred => 
        (cred.email === emailOrPhone || cred.phone === emailOrPhone || `+52${cred.phone}` === emailOrPhone) 
        && cred.password === passwordValue
      )
      
      if (isValid) {
        setLoginState({ 
          success: true, 
          message: inputType === 'phone' 
            ? '🎉 ¡Órale! Bienvenido de vuelta, compa' 
            : '🚀 ¡Perfecto! Sesión iniciada con éxito',
          user: { firstName: 'Demo', lastName: 'User', email: emailOrPhone }
        })
        setAttemptCount(0)
        
        // Guardar en localStorage si "recordarme" está marcado
        if (rememberMe) {
          localStorage.setItem('hubbax_remember', JSON.stringify({
            email: emailOrPhone,
            timestamp: Date.now()
          }))
        }
      } else {
        setAttemptCount(prev => prev + 1)
        const mexicanErrors = [
          '🤨 Esas credenciales no están bien, compa. ¿Seguro que son correctas?',
          '😅 No hay match, jefe. Revisa tu email/teléfono y contraseña.',
          '🔍 Hmm, no encontramos esos datos. ¿Quizás te registraste con otro email?',
          '🤔 Algo no cuadra. ¿Seguro que esa es tu contraseña?'
        ]
        setLoginState({ 
          error: mexicanErrors[attemptCount % mexicanErrors.length] || '❌ Error de login'
        })
      }
    } catch {
      setLoginState({ error: '📡 ¡Ups! Problemas de conexión. Revisa tu internet.' })
    } finally {
      setIsLoginPending(false)
    }
  }
  
  // Función de registro épica
  const handleEpicRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsRegisterPending(true)
    setRegisterState(null)
    
    // Validaciones mexicanas amigables
    if (!firstName.trim()) {
      setRegisterState({ error: '🙋‍♂️ ¿Cómo te llamas, compa? El nombre es obligatorio.' })
      setIsRegisterPending(false)
      return
    }
    
    if (!lastName.trim()) {
      setRegisterState({ error: '👨‍👩‍👧‍👦 ¡Y los apellidos también! Es importante para identificarte.' })
      setIsRegisterPending(false)
      return
    }
    
    if (!registerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerEmail)) {
      setRegisterState({ error: '📧 Necesitamos un email válido para contactarte, jefe.' })
      setIsRegisterPending(false)
      return
    }
    
    if (registerPassword.length < 6) {
      setRegisterState({ error: '🔐 La contraseña debe tener mínimo 6 caracteres. ¡Ponle más seguridad!' })
      setIsRegisterPending(false)
      return
    }
    
    if (registerPassword !== confirmPassword) {
      setRegisterState({ error: '🤦‍♂️ Las contraseñas no coinciden. Revisa que sean iguales.' })
      setIsRegisterPending(false)
      return
    }
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulación de registro exitoso
      setRegisterState({
        success: true,
        message: `🎉 ¡Órale, ${firstName}! Tu cuenta está lista. ¡Bienvenido a la revolución social mexicana!`,
        user: { firstName, lastName, email: registerEmail }
      })
    } catch {
      setRegisterState({ error: '📡 Error de conexión. Inténtalo de nuevo, compa.' })
    } finally {
      setIsRegisterPending(false)
    }
  }
  
  // Función para recuperar contraseña
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsForgotPasswordPending(true)
    setForgotPasswordState(null)
    
    if (!forgotEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail)) {
      setForgotPasswordState({ error: '📧 Necesitamos un email válido para enviarte las instrucciones.' })
      setIsForgotPasswordPending(false)
      return
    }
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setForgotPasswordState({
        success: true,
        message: '📬 ¡Listo! Te enviamos un email con las instrucciones. Revisa tu bandeja de entrada.'
      })
      
      // Cerrar modal después de 3 segundos
      setTimeout(() => {
        setShowForgotModal(false)
        setForgotPasswordState(null)
        setForgotEmail('')
      }, 3000)
      
    } catch {
      setForgotPasswordState({ error: '📡 Error de conexión. Inténtalo de nuevo.' })
    } finally {
      setIsForgotPasswordPending(false)
    }
  }
  
  // Login con Google (simulado)
  const handleGoogleLogin = () => {
    console.log('🔍 Login con Google iniciado...')
    setLoginState({ success: true, message: '🎯 Conectado con Google exitosamente' })
  }
  
  // Login con Facebook (simulado)
  const handleFacebookLogin = () => {
    console.log('📘 Login con Facebook iniciado...')
    setLoginState({ success: true, message: '📱 Conectado con Facebook exitosamente' })
  }
  
  // Login rápido con datos demo
  const handleQuickDemo = () => {
    setEmailOrPhone('test@hubbax.com')
    setPasswordValue('demo')
    setLoginState({ message: '🚀 Datos de prueba cargados. ¡Haz clic en "Iniciar sesión"!' })
  }
  
  // Función para cargar datos recordados
  useEffect(() => {
    const remembered = localStorage.getItem('hubbax_remember')
    if (remembered) {
      try {
        const data = JSON.parse(remembered)
        const daysSince = (Date.now() - data.timestamp) / (1000 * 60 * 60 * 24)
        if (daysSince < 30) { // Recordar por 30 días
          setEmailOrPhone(data.email)
          setRememberMe(true)
        }
      } catch {
        localStorage.removeItem('hubbax_remember')
      }
    }
  }, [])
  
  return (
    <div className="login-epic-container">
      {/* Header épico */}
      <div className="login-epic-header">
        <h1 className="hubbax-logo">
          🇲🇽 <span>HubbaX</span>
        </h1>
        <p className="epic-tagline">
          La red social que México necesitaba. Sin algoritmos tóxicos, sin vender tus datos.
        </p>
      </div>
      
      {currentView === 'login' && (
        <div className="epic-login-form">
          <div className="form-container">
            <h2>Iniciar sesión</h2>
            <p className="form-subtitle">¡Qué bueno tenerte de vuelta, compa! 👋</p>
            
            <form onSubmit={handleEpicLogin} className="login-form">
              {/* Input flexible para email o teléfono */}
              <div className="input-group">
                <div className={`input-wrapper ${!isValidInput ? 'error' : ''}`}>
                  <input
                    type="text"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="Email o número de celular"
                    className="epic-input"
                    disabled={isLoginPending}
                  />
                  {inputType === 'email' && <span className="input-icon">📧</span>}
                  {inputType === 'phone' && <span className="input-icon">📱</span>}
                  {!isValidInput && (
                    <span className="input-error">
                      🤔 Formato no válido. Usa ejemplo@gmail.com o 5551234567
                    </span>
                  )}
                </div>
                
                <div className="input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}
                    placeholder="Contraseña"
                    className="epic-input"
                    disabled={isLoginPending}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoginPending}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>
              
              {/* Captcha simulado */}
              {showCaptcha && (
                <div className="captcha-container">
                  <div className="captcha-box">
                    <input type="checkbox" id="captcha" />
                    <label htmlFor="captcha">
                      ✅ No soy un robot (simulado para demo)
                    </label>
                  </div>
                </div>
              )}
              
              {/* Remember me */}
              <div className="remember-me">
                <label>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Recordarme por 30 días</span>
                </label>
              </div>
              
              {/* Botón principal */}
              <button
                type="submit"
                className="epic-login-btn"
                disabled={isLoginPending || !emailOrPhone || !passwordValue || isBlocked}
              >
                {isLoginPending ? (
                  <span className="loading">
                    <span className="spinner"></span>
                    Iniciando sesión...
                  </span>
                ) : (
                  '🚀 Iniciar sesión'
                )}
              </button>
              
              {/* Estados y mensajes */}
              {loginState?.error && (
                <div className="error-message">
                  <span>{loginState.error}</span>
                  {attemptCount > 1 && (
                    <button 
                      type="button"
                      className="help-btn"
                      onClick={() => setShowLoginHelp(!showLoginHelp)}
                    >
                      💡 ¿Necesitas ayuda?
                    </button>
                  )}
                </div>
              )}
              
              {loginState?.success && (
                <div className="success-message">
                  {loginState.message}
                </div>
              )}
              
              {loginState?.message && !loginState.success && !loginState.error && (
                <div className="info-message">
                  {loginState.message}
                </div>
              )}
            </form>
            
            {/* Ayuda contextual */}
            {showLoginHelp && (
              <div className="login-help-panel">
                <h4>💡 Tips para iniciar sesión</h4>
                <ul>
                  <li>✅ Usa el email con el que te registraste</li>
                  <li>📱 También puedes usar tu número: 5551234567</li>
                  <li>🔍 Revisa si Caps Lock está activado</li>
                  <li>🔄 ¿Problemas? Recupera tu contraseña</li>
                </ul>
                <div className="demo-credentials">
                  <strong>🎯 Credenciales de prueba:</strong>
                  <p>Email: test@hubbax.com</p>
                  <p>Password: demo</p>
                  <button onClick={handleQuickDemo} className="quick-demo-btn">
                    ⚡ Cargar datos de prueba
                  </button>
                </div>
              </div>
            )}
            
            {/* Opciones de login */}
            <div className="login-options">
              <button
                type="button"
                className="forgot-password-btn"
                onClick={() => setShowForgotModal(true)}
              >
                🔓 ¿Olvidaste tu contraseña?
              </button>
              
              <div className="divider">
                <span>o continúa con</span>
              </div>
              
              {/* SSO Buttons */}
              <div className="sso-buttons">
                <button onClick={handleGoogleLogin} className="google-btn">
                  <span className="sso-icon">🔍</span>
                  Google
                </button>
                <button onClick={handleFacebookLogin} className="facebook-btn">
                  <span className="sso-icon">📘</span>
                  Facebook
                </button>
              </div>
              
              <div className="divider">
                <span>¿No tienes cuenta?</span>
              </div>
              
              <button
                type="button"
                className="register-btn"
                onClick={() => setCurrentView('register')}
              >
                🎯 Crear cuenta nueva
              </button>
            </div>
          </div>
        </div>
      )}
      
      {currentView === 'register' && (
        <div className="epic-register-form">
          <div className="form-container">
            <h2>Crear cuenta nueva</h2>
            <p className="form-subtitle">¡Únete a la revolución social mexicana! 🇲🇽</p>
            
            <form onSubmit={handleEpicRegister} className="register-form">
              <div className="name-row">
                <div className="input-wrapper">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Nombre"
                    className="epic-input"
                    disabled={isRegisterPending}
                  />
                </div>
                <div className="input-wrapper">
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Apellidos"
                    className="epic-input"
                    disabled={isRegisterPending}
                  />
                </div>
              </div>
              
              <div className="input-wrapper">
                <input
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="Email"
                  className="epic-input"
                  disabled={isRegisterPending}
                />
              </div>
              
              <div className="input-wrapper">
                <input
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  placeholder="Contraseña (mínimo 6 caracteres)"
                  className="epic-input"
                  disabled={isRegisterPending}
                />
              </div>
              
              <div className="input-wrapper">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirmar contraseña"
                  className="epic-input"
                  disabled={isRegisterPending}
                />
              </div>
              
              <button
                type="submit"
                className="epic-register-btn"
                disabled={isRegisterPending}
              >
                {isRegisterPending ? (
                  <span className="loading">
                    <span className="spinner"></span>
                    Creando cuenta...
                  </span>
                ) : (
                  '🎉 Crear cuenta'
                )}
              </button>
              
              {registerState?.error && (
                <div className="error-message">
                  {registerState.error}
                </div>
              )}
              
              {registerState?.success && (
                <div className="success-message">
                  {registerState.message}
                </div>
              )}
            </form>
            
            <button
              type="button"
              className="back-to-login"
              onClick={() => setCurrentView('login')}
            >
              ← Volver al login
            </button>
          </div>
        </div>
      )}
      
      {/* Modal de recuperar contraseña */}
      {showForgotModal && (
        <div className="modal-overlay" onClick={() => setShowForgotModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Recuperar contraseña</h3>
              <button 
                className="modal-close"
                onClick={() => setShowForgotModal(false)}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleForgotPassword}>
              <p>Ingresa tu email y te enviaremos las instrucciones:</p>
              
              <div className="input-wrapper">
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="Tu email"
                  className="epic-input"
                  disabled={isForgotPasswordPending}
                />
              </div>
              
              <button
                type="submit"
                className="epic-forgot-btn"
                disabled={isForgotPasswordPending}
              >
                {isForgotPasswordPending ? (
                  <span className="loading">
                    <span className="spinner"></span>
                    Enviando...
                  </span>
                ) : (
                  '📧 Enviar instrucciones'
                )}
              </button>
              
              {forgotPasswordState?.error && (
                <div className="error-message">
                  {forgotPasswordState.error}
                </div>
              )}
              
              {forgotPasswordState?.success && (
                <div className="success-message">
                  {forgotPasswordState.message}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
      
      {/* Stats mexicanos */}
      <div className="mexican-stats">
        <div className="stat-item">
          <strong>+100,000</strong>
          <span>mexicanos conectados</span>
        </div>
        <div className="stat-item">
          <strong>4.9★</strong>
          <span>calificación</span>
        </div>
        <div className="stat-item">
          <strong>100%</strong>
          <span>datos protegidos</span>
        </div>
      </div>
    </div>
  )
}