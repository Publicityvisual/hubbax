import { useActionState, useState } from 'react'
import './App.css'

function App() {
  // Estado para controlar si estamos en login o register
  const [currentView, setCurrentView] = useState<'login' | 'register'>('login')
  
  // Usando las nuevas APIs de React 19 para Login
  const [loginState, loginAction, isLoginPending] = useActionState(
    async (_previousState: any, formData: FormData) => {
      const email = formData.get('email') as string
      const password = formData.get('password') as string
      
      console.log('Login con React 19 Actions:', { email, password })
      
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simular validación
      if (!email || !password) {
        return { error: 'Email y contraseña son requeridos' }
      }
      
      if (email === 'test@hubbax.com' && password === 'demo') {
        return { success: true, message: '¡Bienvenido a HubbaX! 🚀' }
      }
      
      return { error: 'Credenciales incorrectas' }
    },
    null
  )

  // Usando las nuevas APIs de React 19 para Register
  const [registerState, registerAction, isRegisterPending] = useActionState(
    async (_previousState: any, formData: FormData) => {
      const firstName = formData.get('firstName') as string
      const lastName = formData.get('lastName') as string
      const email = formData.get('email') as string
      const password = formData.get('password') as string
      const confirmPassword = formData.get('confirmPassword') as string
      
      console.log('Registro con React 19 Actions:', { firstName, lastName, email })
      
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Validación básica
      if (!firstName || !lastName || !email || !password) {
        return { error: 'Todos los campos son requeridos' }
      }
      
      if (password !== confirmPassword) {
        return { error: 'Las contraseñas no coinciden' }
      }
      
      if (password.length < 6) {
        return { error: 'La contraseña debe tener al menos 6 caracteres' }
      }
      
      // Simular registro exitoso
      return { 
        success: true, 
        message: `¡Bienvenido ${firstName}! Tu cuenta ha sido creada exitosamente 🎉`,
        user: { firstName, lastName, email }
      }
    },
    null
  )

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
                ? 'La red social auténtica para México.' 
                : 'Únete a la revolución social mexicana.'}
            </p>
            <div className="features-preview">
              <div className="feature-item">
                <span className="feature-icon">🔒</span>
                <span>100% Privacidad Real</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🇲🇽</span>
                <span>Comunidades Locales</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✨</span>
                <span>Sin Algoritmos Tóxicos</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🎯</span>
                <span>Contenido Auténtico</span>
              </div>
            </div>
          </div>
        </div>
        
        {currentView === 'login' ? (
          // PÁGINA DE LOGIN
          <div className="login-right">
            <div className="login-form-container">
              <form className="login-form" action={loginAction} aria-label="Formulario de inicio de sesión">
                <div className="form-header">
                  <h2>Inicia sesión en HubbaX</h2>
                  <p>Es rápido y fácil.</p>
                </div>
                
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
                <button type="submit" className="login-button" disabled={isPending}>
                  {isPending ? 'Iniciando sesión...' : 'Iniciar sesión'}
                </button>
                
                {/* Mostrar estado del login */}
                {loginState?.error && (
                  <div className="error-message" role="alert">
                    {loginState.error}
                  </div>
                )}
                {loginState?.success && (
                  <div className="success-message" role="alert">
                    {loginState.message}
                  </div>
                )}
                
                <button 
                  type="button" 
                  className="forgot-password"
                  onClick={handleForgotPassword}
                  disabled={isPending}
                >
                  ¿Olvidaste la contraseña?
                </button>
                <div className="divider" role="separator"></div>
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
                <button 
                  type="button"
                  className="create-page-link"
                  onClick={() => console.log('Crear página para empresa')}
                >
                  <strong>Crear una página</strong>
                </button> para una celebridad, marca o empresa.
              </p>
            </div>
          </div>
        ) : (
          // PÁGINA DE REGISTRO
          <div className="login-right">
            <div className="login-form-container">
              <form className="login-form register-form" action={registerAction} aria-label="Formulario de registro">
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
      
      {/* Footer moderno con propuesta de valor */}
      <footer className="modern-footer">
        <div className="footer-content">
          <div className="value-props">
            <div className="value-prop">
              <h3>🚀 Nueva Generación</h3>
              <p>Sin algoritmos manipuladores. Tu timeline, tu control.</p>
            </div>
            <div className="value-prop">
              <h3>🇲🇽 Hecho para México</h3>
              <p>Comunidades locales, cultura mexicana, contenido relevante.</p>
            </div>
            <div className="value-prop">
              <h3>🔒 Privacidad Real</h3>
              <p>Tus datos son tuyos. No los vendemos, no los compartimos.</p>
            </div>
          </div>
          <div className="demo-access">
            <h4>🎯 Acceso Demo</h4>
            <p><strong>Email:</strong> test@hubbax.com</p>
            <p><strong>Password:</strong> demo</p>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 HubbaX México. El futuro de las redes sociales.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
