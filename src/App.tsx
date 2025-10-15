import { useState } from 'react'
import './App.css'

type AuthView = 'login' | 'register'

type LoginState = {
  success?: boolean
  message?: string
  error?: string
}

type RegisterState = {
  success?: boolean
  message?: string
  error?: string
  user?: {
    firstName: string
    lastName: string
    email: string
  }
}

const featureHighlights = [
  { icon: '🔒', label: '100% Privacidad Real - Sin vender tus datos' },
  { icon: '🇲🇽', label: 'Comunidades Locales - Contenido mexicano auténtico' },
  { icon: '✨', label: 'Sin Algoritmos Tóxicos - Tu timeline real y transparente' },
  { icon: '🎯', label: 'Contenido Auténtico - Moderación humana en tiempo real' },
  { icon: '🚀', label: 'Nueva Generación - Hecho para Gen Z y Millennials' }
]

const languageOptions = ['Español', 'English', 'Français', 'Português', 'Italiano', 'العربية', 'Deutsch', 'हिन्दी', '中文(简体)']

const communityStats = [
  { value: '+50K', label: 'Usuarios en lista de espera' },
  { value: '94%', label: 'Satisfacción de comunidad' },
  { value: '<2s', label: 'Tiempo promedio de carga' }
]

const badgeHighlights = [
  { title: 'Privacidad blindada', description: 'Cifrado de extremo a extremo y control granular de tus datos.' },
  { title: 'Social feed auténtico', description: 'Prioriza amigos y comunidades reales, no anuncios invasivos.' },
  { title: 'Moderación activa', description: 'IA + expertos mexicanos cuidando tus conversaciones.' }
]

const socialProviders = [
  { label: 'Continuar con Google', emoji: '🟢' },
  { label: 'Continuar con Apple', emoji: '⚪' },
  { label: 'Continuar con TikTok', emoji: '🎵' }
]

const onboardingSteps = [
  { step: '01', title: 'Personaliza tu perfil', detail: 'Elige intereses, suma a tus amigos y crea tu identidad HubbaX.' },
  { step: '02', title: 'Explora comunidades', detail: 'Descubre eventos, hubs locales y contenido curado para ti.' },
  { step: '03', title: 'Conecta en tiempo real', detail: 'Chat seguro, salas en vivo y experiencias inmersivas.' }
]

const trustSignals = [
  { badge: 'ISO 27001', caption: 'Infraestructura certificada y segura.' },
  { badge: 'SOC 2', caption: 'Procesos auditados para proteger tus datos.' },
  { badge: 'Hecho en México', caption: 'Equipo local comprometido con nuestra comunidad.' }
]

function App() {
  // Estado para controlar si estamos en login o register
  const [currentView, setCurrentView] = useState<AuthView>('login')
  
  // Estados para el formulario de login
  const [loginState, setLoginState] = useState<LoginState | null>(null)
  const [isLoginPending, setIsLoginPending] = useState(false)
  
  // Estados para el formulario de registro
  const [registerState, setRegisterState] = useState<RegisterState | null>(null)
  const [isRegisterPending, setIsRegisterPending] = useState(false)
  
  // Estados para mejorar UX
  const [showPassword, setShowPassword] = useState(false)
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  
  // Validación en tiempo real
  const isEmailValid = emailValue ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue) : true
  const isPasswordValid = passwordValue ? passwordValue.length >= 6 : true
  
  // Función para manejar login
  const handleLogin = async (formData: FormData) => {
    setIsLoginPending(true)
    setLoginState(null)
    
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    
    console.log('Login:', { email, password })
    
    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simular validación
      if (!email || !password) {
        setLoginState({ error: 'Email y contraseña son requeridos' })
        return
      }
      
      if (email === 'test@hubbax.com' && password === 'demo') {
        setLoginState({ success: true, message: '¡Bienvenido a HubbaX! 🚀' })
      } else {
        setLoginState({ error: 'Credenciales incorrectas' })
      }
    } catch (error: unknown) {
      console.error(error)
      setLoginState({ error: 'Error de conexión' })
    } finally {
      setIsLoginPending(false)
    }
  }
  
  // Función para manejar registro
  const handleRegister = async (formData: FormData) => {
    setIsRegisterPending(true)
    setRegisterState(null)
    
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string
    
    console.log('Registro:', { firstName, lastName, email })
    
    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Validación básica
      if (!firstName || !lastName || !email || !password) {
        setRegisterState({ error: 'Todos los campos son requeridos' })
        return
      }
      
      if (password !== confirmPassword) {
        setRegisterState({ error: 'Las contraseñas no coinciden' })
        return
      }
      
      if (password.length < 6) {
        setRegisterState({ error: 'La contraseña debe tener al menos 6 caracteres' })
        return
      }
      
      // Simular registro exitoso
      setRegisterState({ 
        success: true, 
        message: `¡Bienvenido ${firstName}! Tu cuenta ha sido creada exitosamente 🎉`,
        user: { firstName, lastName, email }
      })
    } catch (error: unknown) {
      console.error(error)
      setRegisterState({ error: 'Error de conexión' })
    } finally {
      setIsRegisterPending(false)
    }
  }

  const handleCreateAccount = () => {
    console.log('Cambiando a registro...')
    setCurrentView('register')
  }

  const handleBackToLogin = () => {
    setCurrentView('login')
  }

  const handleForgotPassword = async () => {
    console.log('Recuperar contraseña')
    // Aquí iría la lógica para recuperar contraseña
  }

  // Función para login demo rápido
  const handleDemoLogin = () => {
    setEmailValue('test@hubbax.com')
    setPasswordValue('demo')
  }

  const isPending = currentView === 'login' ? isLoginPending : isRegisterPending

  // Debug: ver qué vista está activa
  console.log('Vista actual:', currentView)

  return (
    <div className="page-container">
      <div className="login-container">
        <div className="login-left">
          <div className="login-content">
            <h1 className="logo">HubbaX</h1>
            <p className="tagline">
              {currentView === 'login' 
                ? 'Conecta con amigos y comunidades auténticas de México.' 
                : 'Únete a la revolución social mexicana y conecta de verdad.'}
            </p>
            
            {/* Features solo en desktop */}
            <div className="features-preview desktop-only">
              {featureHighlights.map((feature) => (
                <div className="feature-item" key={feature.label}>
                  <span className="feature-icon">{feature.icon}</span>
                  <span>{feature.label}</span>
                </div>
              ))}
            </div>
            
            {/* Selector de idioma como Facebook */}
            <div className="language-selector desktop-only">
              {languageOptions.map((language, index) => (
                <button className={`lang-btn ${index === 0 ? 'active' : ''}`} key={language}>
                  {language}
                </button>
              ))}
            </div>
            <div className="community-stats desktop-only">
              {communityStats.map((stat) => (
                <div className="community-stat-card" key={stat.label}>
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="badge-grid desktop-only">
              {badgeHighlights.map((badge) => (
                <div className="badge-item" key={badge.title}>
                  <h3>{badge.title}</h3>
                  <p>{badge.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {currentView === 'login' ? (
          // PÁGINA DE LOGIN
          <div className="login-right">
            <div className="login-form-container">
              <form className="login-form" onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                handleLogin(formData)
              }} aria-label="Formulario de inicio de sesión">
                <div className="form-header">
                  <h2>Inicia sesión en HubbaX</h2>
                  <p>Es rápido y fácil. ¡Y siempre será gratis!</p>
                </div>
                <div className="social-auth-options">
                  {socialProviders.map((provider) => (
                    <button
                      type="button"
                      className="social-auth-button"
                      key={provider.label}
                      disabled={isPending}
                    >
                      <span className="provider-icon">{provider.emoji}</span>
                      {provider.label}
                    </button>
                  ))}
                </div>
                
                <div className="input-group">
                  <div className="input-wrapper">
                    <input
                      type="email"
                      name="email"
                      value={emailValue}
                      onChange={(e) => setEmailValue(e.target.value)}
                      placeholder="Correo electrónico o número de celular"
                      className={`login-input ${!isEmailValid ? 'error' : ''}`}
                      aria-label="Correo electrónico o número de celular"
                      required
                      disabled={isPending}
                    />
                    {emailValue && !isEmailValid && (
                      <span className="input-error">Ingresa un email válido</span>
                    )}
                  </div>
                  
                  <div className="input-wrapper">
                    <div className="password-input-container">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={passwordValue}
                        onChange={(e) => setPasswordValue(e.target.value)}
                        placeholder="Contraseña"
                        className={`login-input ${!isPasswordValid ? 'error' : ''}`}
                        aria-label="Contraseña"
                        required
                        disabled={isPending}
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isPending}
                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                      >
                        {showPassword ? "🙈" : "👁️"}
                      </button>
                    </div>
                    {passwordValue && !isPasswordValid && (
                      <span className="input-error">La contraseña debe tener al menos 6 caracteres</span>
                    )}
                  </div>
                </div>
                
                {/* Checkbox Remember Me */}
                <div className="remember-me-container">
                  <label className="remember-me-label">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="remember-me-checkbox"
                    />
                    <span className="checkmark"></span>
                    Recordarme
                  </label>
                </div>
                
                <button type="submit" className="login-button primary-action" disabled={isPending || !emailValue || !passwordValue}>
                  {isPending ? (
                    <span className="loading-content">
                      <span className="spinner"></span>
                      Iniciando sesión...
                    </span>
                  ) : (
                    '🚀 Iniciar sesión'
                  )}
                </button>
                
                {/* Mostrar estado del login con mejores mensajes para usuarios */}
                {loginState?.error && (
                  <div className="error-message" role="alert">
                    <span className="error-indicator">❌</span>
                    {loginState.error === 'Credenciales incorrectas' 
                      ? '¡Ups! Revisa tu email y contraseña. ¿Olvidaste algún dato?' 
                      : loginState.error}
                  </div>
                )}
                {loginState?.success && (
                  <div className="success-message" role="alert">
                    <span className="success-indicator">🎉</span>
                    {loginState.message}
                  </div>
                )}
                
                {/* Ayuda rápida para usuarios */}
                {!loginState?.success && (
                  <div className="login-help">
                    <div className="quick-tips">
                      <h4>💡 Tips rápidos:</h4>
                      <ul>
                        <li>✅ Usa tu email completo (ejemplo@gmail.com)</li>
                        <li>🔒 Tu contraseña debe tener mínimo 6 caracteres</li>
                        <li>📱 ¿Problemas? Revisa tu conexión a internet</li>
                      </ul>
                    </div>
                  </div>
                )}
                
                <div className="login-options">
                  <button 
                    type="button" 
                    className="forgot-password"
                    onClick={handleForgotPassword}
                    disabled={isPending}
                  >
                    🔓 ¿Olvidaste tu contraseña?
                  </button>
                  
                  {/* Acceso rápido para pruebas */}
                  <div className="quick-access">
                    <p className="quick-access-title">🚀 Acceso rápido de prueba:</p>
                    <button 
                      type="button" 
                      className="demo-login-btn"
                      onClick={handleDemoLogin}
                      disabled={isPending}
                    >
                      📧 Usar datos de demo
                    </button>
                  </div>
                </div>
                
                <div className="divider">
                  <span>o</span>
                </div>
                
                <button 
                  type="button" 
                  className="create-account-button highlight-action"
                  onClick={handleCreateAccount}
                  disabled={isPending}
                >
                  Crear cuenta nueva
                </button>
              </form>
              
              <div className="additional-options">
                <p className="create-page">
                  <button 
                    type="button"
                    className="create-page-link"
                    onClick={() => console.log('Crear página para empresa')}
                  >
                    <strong>Crear una página</strong>
                  </button> para una celebridad, marca o empresa.
                </p>
                
                <div className="social-proof">
                  <p>📈 <strong>+50,000</strong> mexicanos ya se unieron</p>
                  <p>🌟 <strong>4.8/5</strong> estrellas en satisfacción</p>
                </div>
                <div className="trust-badges">
                  {trustSignals.map((signal) => (
                    <div className="trust-badge" key={signal.badge}>
                      <span className="badge-title">{signal.badge}</span>
                      <span className="badge-caption">{signal.caption}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // PÁGINA DE REGISTRO
          <div className="login-right">
            <div className="login-form-container">
              <form className="login-form register-form" onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                handleRegister(formData)
              }} aria-label="Formulario de registro">
                <div className="form-header">
                  <h2>Crear cuenta nueva</h2>
                  <p>Es gratis y siempre lo será.</p>
                </div>
                <div className="onboarding-steps">
                  {onboardingSteps.map((step) => (
                    <div className="step-item" key={step.step}>
                      <span className="step-indicator">{step.step}</span>
                      <div className="step-details">
                        <h3>{step.title}</h3>
                        <p>{step.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="name-inputs">
                  <div className="input-wrapper">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Nombre"
                      className="login-input name-input"
                      aria-label="Nombre"
                      required
                      disabled={isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Apellidos"
                      className="login-input name-input"
                      aria-label="Apellidos"
                      required
                      disabled={isPending}
                    />
                  </div>
                </div>
                
                <div className="input-wrapper">
                  <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    className="login-input"
                    aria-label="Correo electrónico"
                    required
                    disabled={isPending}
                  />
                </div>
                
                <div className="input-wrapper">
                  <input
                    type="password"
                    name="password"
                    placeholder="Contraseña nueva"
                    className="login-input"
                    aria-label="Contraseña nueva"
                    required
                    disabled={isPending}
                  />
                </div>
                
                <div className="input-wrapper">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmar contraseña"
                    className="login-input"
                    aria-label="Confirmar contraseña"
                    required
                    disabled={isPending}
                  />
                </div>
                
                {/* Tips de registro */}
                {!registerState?.success && (
                  <div className="login-help">
                    <div className="quick-tips">
                      <h4>🛡️ Tips de seguridad:</h4>
                      <ul>
                        <li>🔐 Usa una contraseña fuerte (mínimo 6 caracteres)</li>
                        <li>📧 Verifica que tu email sea correcto</li>
                        <li>✅ Las contraseñas deben coincidir</li>
                        <li>🔒 Tu información está 100% protegida</li>
                      </ul>
                    </div>
                  </div>
                )}
                
                <button type="submit" className="login-button register-button" disabled={isPending}>
                  {isPending ? (
                    <span className="loading-content">
                      <span className="spinner"></span>
                      Creando cuenta...
                    </span>
                  ) : (
                    '🚀 Registrarse'
                  )}
                </button>
                
                {/* Mostrar estado del registro */}
                {registerState?.error && (
                  <div className="error-message" role="alert">
                    {registerState.error}
                  </div>
                )}
                {registerState?.success && (
                  <div className="success-message" role="alert">
                    {registerState.message}
                  </div>
                )}
                <div className="future-features">
                  <div className="future-feature-card">
                    <h3>Cuenta verificada en minutos</h3>
                    <p>No más procesos eternos. Usa tu INE digital o pasaporte y activa beneficios premium.</p>
                  </div>
                  <div className="future-feature-card">
                    <h3>Feed hiperpersonalizado</h3>
                    <p>Recomendaciones con IA ética hecha en México para inspirarte cada día.</p>
                  </div>
                </div>
                
                <div className="divider" role="separator"></div>
                <button 
                  type="button" 
                  className="back-to-login-button"
                  onClick={handleBackToLogin}
                  disabled={isPending}
                >
                  ¿Ya tienes cuenta? Inicia sesión
                </button>
              </form>
              <p className="terms-text">
                Al hacer clic en "Registrarse", aceptas nuestros{' '}
                <button type="button" className="link-button">Términos</button>,{' '}
                <button type="button" className="link-button">Política de privacidad</button> y{' '}
                <button type="button" className="link-button">Política de cookies</button>.
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer estilo Facebook pero para HubbaX */}
      <footer className="modern-footer facebook-style">
        <div className="footer-content">
          {/* Enlaces principales */}
          <div className="footer-links">
            <div className="links-row">
              {languageOptions.map((language) => (
                <button className="footer-link" key={`footer-${language}`}>
                  {language}
                </button>
              ))}
              <button className="footer-link more-languages">+ Más</button>
            </div>
            
            <div className="divider-thin"></div>
            
            <div className="links-row">
              <button className="footer-link">Registrarse</button>
              <button className="footer-link">Iniciar sesión</button>
              <button className="footer-link">HubbaX Messenger</button>
              <button className="footer-link">HubbaX Lite</button>
              <button className="footer-link">Video</button>
              <button className="footer-link">Lugares</button>
              <button className="footer-link">Juegos</button>
              <button className="footer-link">Marketplace</button>
              <button className="footer-link">Meta Pay</button>
              <button className="footer-link">HubbaX Shop</button>
              <button className="footer-link">HubbaX Pro</button>
            </div>
            
            <div className="links-row">
              <button className="footer-link">Crear anuncio</button>
              <button className="footer-link">Crear página</button>
              <button className="footer-link">Desarrolladores</button>
              <button className="footer-link">Empleos</button>
              <button className="footer-link">Privacidad</button>
              <button className="footer-link">Cookies</button>
              <button className="footer-link">Opciones de anuncios</button>
              <button className="footer-link">Condiciones</button>
              <button className="footer-link">Ayuda</button>
              <button className="footer-link">Configuración</button>
              <button className="footer-link">Registro de actividad</button>
            </div>
          </div>
          
          {/* Información de la empresa */}
          <div className="company-info">
            <p>HubbaX México © 2025</p>
          </div>
          
          {/* Demo info destacada */}
          <div className="demo-access-highlight">
            <div className="demo-box">
              <h4>🎯 Prueba HubbaX ahora</h4>
              <div className="demo-credentials">
                <p><strong>Email:</strong> test@hubbax.com</p>
                <p><strong>Password:</strong> demo</p>
              </div>
              <p className="demo-note">¡100% funcional! Explora todas las características.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
