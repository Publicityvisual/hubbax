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

function App() {
  const [currentView, setCurrentView] = useState<AuthView>('login')
  const [loginState, setLoginState] = useState<LoginState | null>(null)
  const [isLoginPending, setIsLoginPending] = useState(false)
  const [registerState, setRegisterState] = useState<RegisterState | null>(null)
  const [isRegisterPending, setIsRegisterPending] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const isEmailValid = emailValue ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue) : true
  const isPasswordValid = passwordValue ? passwordValue.length >= 6 : true

  const handleLogin = async (formData: FormData) => {
    setIsLoginPending(true)
    setLoginState(null)

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (!email || !password) {
        setLoginState({ error: 'Por favor, ingresa tu email y contraseña.' })
        return
      }

      // Simular login exitoso (reemplazar con API real)
      setLoginState({ success: true, message: 'Inicio de sesión exitoso. ¡Bienvenido!' })
    } catch (error: unknown) {
      console.error(error)
      setLoginState({ error: 'Error al iniciar sesión. Verifica tu conexión e intenta de nuevo.' })
    } finally {
      setIsLoginPending(false)
    }
  }

  const handleRegister = async (formData: FormData) => {
    setIsRegisterPending(true)
    setRegisterState(null)

    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))

      if (!firstName || !lastName || !email || !password) {
        setRegisterState({ error: 'Todos los campos son obligatorios.' })
        return
      }

      if (password !== confirmPassword) {
        setRegisterState({ error: 'Las contraseñas no coinciden.' })
        return
      }

      if (password.length < 6) {
        setRegisterState({ error: 'La contraseña debe tener al menos 6 caracteres.' })
        return
      }

      setRegisterState({
        success: true,
        message: `¡Cuenta creada exitosamente! Bienvenido ${firstName}.`,
        user: { firstName, lastName, email }
      })
    } catch (error: unknown) {
      console.error(error)
      setRegisterState({ error: 'Error al crear la cuenta. Inténtalo de nuevo.' })
    } finally {
      setIsRegisterPending(false)
    }
  }

  const handleCreateAccount = () => setCurrentView('register')
  const handleBackToLogin = () => setCurrentView('login')
  const handleForgotPassword = () => console.log('Recuperar contraseña')

  const isPending = currentView === 'login' ? isLoginPending : isRegisterPending

  return (
    <div className="page-container">
      <div className="login-container">
        <div className="login-left">
          <div className="login-content">
            <h1 className="logo">HubbaX</h1>
            <p className="tagline">
              {currentView === 'login'
                ? 'Conecta con amigos y familiares en HubbaX.'
                : 'Únete a HubbaX y empieza a conectar.'}
            </p>

            <div className="features-preview desktop-only">
              <div className="feature-item">
                <span className="feature-icon">🔒</span>
                <span>Tu privacidad es nuestra prioridad</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🌐</span>
                <span>Conecta con el mundo de forma segura</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📱</span>
                <span>Accede desde cualquier dispositivo</span>
              </div>
            </div>

            <div className="language-selector desktop-only">
              <button className="lang-btn active">Español</button>
              <button className="lang-btn">English (US)</button>
              <button className="lang-btn">Português (Brasil)</button>
              <button className="lang-btn">Français (France)</button>
              <button className="lang-btn">Deutsch</button>
              <button className="lang-btn more-languages">+ Más</button>
            </div>
          </div>
        </div>

        {currentView === 'login' ? (
          <div className="login-right">
            <div className="login-form-container">
              <form className="login-form" onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                handleLogin(formData)
              }}>
                <div className="form-header">
                  <h2>Iniciar sesión</h2>
                </div>

                <div className="input-group">
                  <input
                    type="text"
                    name="email"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    placeholder="Correo electrónico o teléfono"
                    className={`login-input ${!isEmailValid ? 'error' : ''}`}
                    required
                    disabled={isPending}
                  />
                  {emailValue && !isEmailValid && (
                    <span className="input-error">Ingresa un correo electrónico válido</span>
                  )}

                  <div className="password-input-container">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={passwordValue}
                      onChange={(e) => setPasswordValue(e.target.value)}
                      placeholder="Contraseña"
                      className={`login-input ${!isPasswordValid ? 'error' : ''}`}
                      required
                      disabled={isPending}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isPending}
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                  {passwordValue && !isPasswordValid && (
                    <span className="input-error">La contraseña debe tener al menos 6 caracteres</span>
                  )}
                </div>

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

                <button type="submit" className="login-button" disabled={isPending || !emailValue || !passwordValue}>
                  {isPending ? 'Iniciando sesión...' : 'Iniciar sesión'}
                </button>

                {loginState?.error && (
                  <div className="error-message">
                    {loginState.error}
                  </div>
                )}
                {loginState?.success && (
                  <div className="success-message">
                    {loginState.message}
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
                  className="create-account-button"
                  onClick={handleCreateAccount}
                  disabled={isPending}
                >
                  Crear cuenta nueva
                </button>
              </form>

              <p className="create-page">
                <strong>Crear una página</strong> para una celebridad, marca o empresa.
              </p>
            </div>
          </div>
        ) : (
          <div className="login-right">
            <div className="login-form-container">
              <form className="login-form register-form" onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                handleRegister(formData)
              }}>
                <div className="form-header">
                  <h2>Registrarse</h2>
                  <p>Es rápido y fácil.</p>
                </div>

                <div className="name-inputs">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Nombre"
                    className="login-input name-input"
                    required
                    disabled={isPending}
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Apellido"
                    className="login-input name-input"
                    required
                    disabled={isPending}
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  className="login-input"
                  required
                  disabled={isPending}
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Contraseña nueva"
                  className="login-input"
                  required
                  disabled={isPending}
                />

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmar contraseña"
                  className="login-input"
                  required
                  disabled={isPending}
                />

                <button type="submit" className="login-button register-button" disabled={isPending}>
                  {isPending ? 'Registrando...' : 'Registrarse'}
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
                <a href="#" className="link-button">Términos</a>,{' '}
                <a href="#" className="link-button">Política de privacidad</a> y{' '}
                <a href="#" className="link-button">Política de cookies</a>.
              </p>
            </div>
          </div>
        )}
      </div>

      <footer className="modern-footer">
        <div className="footer-content">
          <div className="footer-links">
            <div className="links-row">
              <a href="#" className="footer-link">Español</a>
              <a href="#" className="footer-link">English (US)</a>
              <a href="#" className="footer-link">Português (Brasil)</a>
              <a href="#" className="footer-link">Français (France)</a>
              <a href="#" className="footer-link">Deutsch</a>
              <a href="#" className="footer-link">Italiano</a>
              <a href="#" className="footer-link">العربية</a>
              <a href="#" className="footer-link">हिन्दी</a>
              <a href="#" className="footer-link">中文(简体)</a>
              <button className="footer-link more-languages">+ Más</button>
            </div>

            <div className="divider-thin"></div>

            <div className="links-row">
              <a href="#" className="footer-link">Registrarse</a>
              <a href="#" className="footer-link">Iniciar sesión</a>
              <a href="#" className="footer-link">Messenger</a>
              <a href="#" className="footer-link">Facebook Lite</a>
              <a href="#" className="footer-link">Watch</a>
              <a href="#" className="footer-link">Lugares</a>
              <a href="#" className="footer-link">Juegos</a>
              <a href="#" className="footer-link">Marketplace</a>
              <a href="#" className="footer-link">Meta Pay</a>
              <a href="#" className="footer-link">Oculus</a>
              <a href="#" className="footer-link">Portal</a>
              <a href="#" className="footer-link">Instagram</a>
              <a href="#" className="footer-link">Bulletin</a>
              <a href="#" className="footer-link">Fundraisers</a>
              <a href="#" className="footer-link">Services</a>
            </div>

            <div className="links-row">
              <a href="#" className="footer-link">Crear anuncio</a>
              <a href="#" className="footer-link">Crear página</a>
              <a href="#" className="footer-link">Desarrolladores</a>
              <a href="#" className="footer-link">Empleos</a>
              <a href="#" className="footer-link">Privacidad</a>
              <a href="#" className="footer-link">Cookies</a>
              <a href="#" className="footer-link">Opciones de anuncios</a>
              <a href="#" className="footer-link">Condiciones</a>
              <a href="#" className="footer-link">Ayuda</a>
              <a href="#" className="footer-link">Subir contactos y no usuarios</a>
            </div>
          </div>

          <div className="company-info">
            <p>HubbaX © 2025</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
