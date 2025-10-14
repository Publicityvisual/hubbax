import { useState } from 'react'
import './App.css'

function App() {
  // Estado para controlar si estamos en login o register
  const [currentView, setCurrentView] = useState<'login' | 'register'>('login')
  
  // Estados para el formulario de login
  const [loginState, setLoginState] = useState<any>(null)
  const [isLoginPending, setIsLoginPending] = useState(false)
  
  // Estados para el formulario de registro
  const [registerState, setRegisterState] = useState<any>(null)
  const [isRegisterPending, setIsRegisterPending] = useState(false)
  
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
    } catch (error) {
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
    } catch (error) {
      setRegisterState({ error: 'Error de conexión' })
    } finally {
      setIsRegisterPending(false)
    }
  }

  const handleCreateAccount = async () => {
    setCurrentView('register')
  }

  const handleBackToLogin = () => {
    setCurrentView('login')
  }

  const handleForgotPassword = async () => {
    console.log('Recuperar contraseña')
    // Aquí iría la lógica para recuperar contraseña
  }

  const isPending = currentView === 'login' ? isLoginPending : isRegisterPending

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
              <div className="feature-item">
                <span className="feature-icon">🔒</span>
                <span>100% Privacidad Real - Sin vender tus datos</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🇲🇽</span>
                <span>Comunidades Locales - Contenido mexicano</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✨</span>
                <span>Sin Algoritmos Tóxicos - Tu timeline real</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🎯</span>
                <span>Contenido Auténtico - Sin fake news</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🚀</span>
                <span>Nueva Generación - Hecho para Gen Z y Millennials</span>
              </div>
            </div>
            
            {/* Selector de idioma como Facebook */}
            <div className="language-selector desktop-only">
              <button className="lang-btn active">Español</button>
              <button className="lang-btn">English</button>
              <button className="lang-btn">Français</button>
              <button className="lang-btn">Português</button>
              <button className="lang-btn">Italiano</button>
              <button className="lang-btn">العربية</button>
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
                
                <div className="input-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico o número de celular"
                    className="login-input"
                    aria-label="Correo electrónico o número de celular"
                    required
                    disabled={isPending}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="login-input"
                    aria-label="Contraseña"
                    required
                    disabled={isPending}
                  />
                </div>
                
                <button type="submit" className="login-button primary-action" disabled={isPending}>
                  {isPending ? '🔄 Iniciando sesión...' : 'Iniciar sesión'}
                </button>
                
                {/* Mostrar estado del login */}
                {loginState?.error && (
                  <div className="error-message" role="alert">
                    ❌ {loginState.error}
                  </div>
                )}
                {loginState?.success && (
                  <div className="success-message" role="alert">
                    ✅ {loginState.message}
                  </div>
                )}
                
                <button 
                  type="button" 
                  className="forgot-password"
                  onClick={handleForgotPassword}
                  disabled={isPending}
                >
                  ¿Olvidaste tu contraseña?
                </button>
                
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
                
                <div className="name-inputs">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Nombre"
                    className="login-input name-input"
                    aria-label="Nombre"
                    required
                    disabled={isPending}
                  />
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
                
                <input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  className="login-input"
                  aria-label="Correo electrónico"
                  required
                  disabled={isPending}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Contraseña nueva"
                  className="login-input"
                  aria-label="Contraseña nueva"
                  required
                  disabled={isPending}
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmar contraseña"
                  className="login-input"
                  aria-label="Confirmar contraseña"
                  required
                  disabled={isPending}
                />
                
                <button type="submit" className="login-button register-button" disabled={isPending}>
                  {isPending ? 'Creando cuenta...' : 'Registrarse'}
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
              <button className="footer-link">Español</button>
              <button className="footer-link">English</button>
              <button className="footer-link">Português (Brasil)</button>
              <button className="footer-link">Français (France)</button>
              <button className="footer-link">Italiano</button>
              <button className="footer-link">Deutsch</button>
              <button className="footer-link">العربية</button>
              <button className="footer-link">हिन्दी</button>
              <button className="footer-link">中文(简体)</button>
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
